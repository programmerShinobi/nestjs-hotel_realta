----------------------- Function and Stored Procedure -----------------------
-----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION payment.getEntityId()
RETURNS int
AS $$

BEGIN
	RETURN (
		SELECT setval('payment."entities_entity_id_seq"',
					  (SELECT COALESCE(MAX(entity_id), 0) FROM payment.entities) + 1
		)
	);

END; $$
LANGUAGE plpgsql;

----

CREATE OR REPLACE FUNCTION payment.getTransactionNumber(transactionID int, transactionType text, transactionDate text DEFAULT NOW())
RETURNS text
AS $$
BEGIN
	RETURN CONCAT(TransactionType, '#', TO_CHAR(transactionDate::date, 'YYYYMMDD'), '-', TO_CHAR(TransactionID, 'FM0000'));
END; $$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------

CREATE OR REPLACE PROCEDURE payment.InsertPaymentGateaway (
	Code	text,
	Name	text
)
AS $$

DECLARE
	ID int;
	
BEGIN
	ID := payment.getEntityId();
	INSERT INTO payment.entities(entity_id)
		VALUES (ID);
	INSERT INTO payment.payment_gateaway(paga_entity_id, paga_code, paga_name)
		VALUES (ID, Code, Name);
	
END; $$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------

CREATE OR REPLACE PROCEDURE payment.InsertBank(
	Code	text,
	Name	text
)
AS $$

DECLARE
	ID int;
	
BEGIN
	ID := payment.getEntityId();
	INSERT INTO payment.entities(entity_id)
		VALUES (ID);
	INSERT INTO payment.bank(bank_entity_id, bank_code, bank_name)
		VALUES (ID, Code, Name);

END; $$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------

CREATE OR REPLACE PROCEDURE payment.InsertUserAccounts(
	EntityID		int,
	UserID			int,
	AccountType		text,
	Balance			int,
	ExpMonth		int DEFAULT 0,
	ExpYear			int DEFAULT 0
)
AS $$

BEGIN
	INSERT INTO payment.user_accounts(
		usac_entity_id,
		usac_user_id,
		usac_account_number,
		usac_type,
		usac_saldo,
		usac_expmonth,
		usac_expyear
	)
		VALUES (
			(CASE 
				WHEN AccountType = 'Payment'
					THEN (
						SELECT paga_entity_id 
						FROM payment.payment_gateaway
						WHERE paga_entity_id = EntityID
					)
				ELSE (
					SELECT bank_entity_id 
					FROM payment.bank 
					WHERE bank_entity_id = EntityID)
			END),
			UserID,
			FLOOR(RANDOM() * POWER(CAST(10 as BIGINT), 9))::numeric::text,
			AccountType,
			Balance,
			(CASE WHEN AccountType = 'Payment' THEN 0 ELSE ExpMonth END),
			(CASE WHEN AccountType = 'Payment' THEN 0 ELSE ExpYear END)
		);
END; $$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------

CREATE OR REPLACE PROCEDURE payment.InsertBookingPaymentTransaction (
	OrderNumber		text,
	Amount			int
)
AS $$

DECLARE
	TransactionID int;
	OrderType text = SUBSTRING(OrderNumber, '(.*)#');
	TransactionDate text;
	TransactionType text;
	TransactionNumber text;
	TransactionNumberRef text;
	Debit int;
	Credit int;
	Note text;
	SourceID int;
	TargetID int;
	UserID int;

BEGIN
	TransactionID := (SELECT COALESCE(MAX(patr_id) + 1, 1) FROM payment.payment_transaction);
	CASE
		WHEN OrderType = 'MENUS'
			THEN
				TransactionType := 'ORM';
				UserID := (SELECT orme_user_id FROM resto.order_menus WHERE orme_order_number = OrderNumber);
				SourceID := (SELECT orme_cardnumber FROM resto.order_menus WHERE orme_order_number = OrderNumber)::int;
				TargetID := 326625809; -- VA Hotel Realta
				Credit := Amount;
				Debit := 0;
				Note := CONCAT('Resto payment ', OrderNumber);
		WHEN OrderType = 'BO'
			THEN
				TransactionType := 'TRB';
				UserID := (SELECT boor_user_id FROM booking.booking_orders WHERE boor_order_number = OrderNumber);
				SourceID := (SELECT boor_cardnumber FROM booking.booking_orders WHERE boor_order_number = OrderNumber)::int;
				TargetID := 326625809; -- VA Hotel Realta
				Credit := Amount;
				Debit := 0;
				Note := CONCAT('Hotel payment ', OrderNumber);
	END CASE;
	TransactionDate := (SELECT SUBSTRING(OrderNumber, '#(.*)-'))::date; -- Extract order date from order number 'MENUS#..' or 'BO#..'
	TransactionNumber := payment.getTransactionNumber(TransactionID, TransactionType, TransactionDate);
	TransactionNumberRef := FLOOR(RANDOM() * POWER(CAST(10 as BIGINT), 15))::text;
	
	INSERT INTO payment.payment_transaction (
		patr_user_id,
		patr_id,
		patr_trx_number,
		patr_type,
		patr_note,
		patr_order_number,
		patr_source_id,
		patr_target_id,
		patr_trx_number_ref,
		patr_debet,
		patr_credit
	) VALUES (
		UserID,
		TransactionID,
		TransactionNumber,
		TransactionType,
		Note,
		OrderNumber,
		SourceID,
		TargetID,
		TransactionNumberRef,
		Debit,
		Credit
	);
END; $$
LANGUAGE plpgsql;

--------------------------------------

CREATE OR REPLACE PROCEDURE payment.InsertPaymentTransaction (
	TransactionType			text,
	Amount					int,
	AccountNumber			text
)
AS $$

DECLARE
	TransactionID int;
	TransactionNumber text;
	TransactionNumberRef text;
	Debit int;
	Credit int;
	SourceID int;
	TargetID int;
	Note text;
	UserID int;

BEGIN
	TransactionID := (SELECT COALESCE(MAX(patr_id) + 1, 1) FROM payment.payment_transaction);
	TransactionNumber := payment.getTransactionNumber(TransactionID, TransactionType);
	TransactionNumberRef := FLOOR(RANDOM() * POWER(CAST(10 as BIGINT), 15))::text;
	UserID := (SELECT usac_user_id FROM payment.user_accounts WHERE usac_account_number = AccountNumber);
	CASE
		-- Top Up
		WHEN TransactionType = 'TP' 
			THEN
				SourceID := (SELECT usac_entity_id FROM payment.user_accounts WHERE usac_account_number = AccountNumber);
				TargetID := (SELECT usac_account_number FROM payment.user_accounts WHERE usac_account_number = AccountNumber);
				Credit := 0;
				Debit := Amount;
				Note := CONCAT('Top up ', Amount, ' to', TargetID);
		-- Refund
		WHEN TransactionType = 'RF'
			THEN
				SourceID := 326625809; -- VA Hotel Realta
				TargetID := (SELECT usac_account_number FROM payment.user_accounts WHERE usac_account_number = AccountNumber);
				Credit := 0;
				Debit := Amount;
				Note := CONCAT('Refund ', Amount, ' to', TargetID);
		WHEN TransactionType IN ('RPY')
			THEN
				SourceID := (SELECT usac_account_number FROM payment.user_accounts WHERE usac_account_number = AccountNumber)::int;
				TargetID := 326625809; -- VA Hotel Realta
				Credit := Amount;
				Debit := 0;
				Note := CONCAT('Repayment ', Amount, ' to', TargetID);
	END CASE;		
				
	INSERT INTO payment.payment_transaction (
		patr_user_id,
		patr_id,
		patr_trx_number,
		patr_type,
		patr_note,
		patr_source_id,
		patr_target_id,
		patr_trx_number_ref,
		patr_debet,
		patr_credit
	) VALUES (
		UserID,
		TransactionID,
		TransactionNumber,
		TransactionType,
		Note,
		SourceID,
		TargetID,
		TransactionNumberRef,
		Debit,
		Credit
	);
END; $$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------

----------------------- Insert Bank -----------------------
CALL payment.InsertBank('002', 'BRI');
CALL payment.InsertBank('014', 'BCA');
CALL payment.InsertBank('008', 'Mandiri');
CALL payment.InsertBank('009', 'BNI');
CALL payment.InsertBank('022', 'CIMB Niaga');
CALL payment.InsertBank('200', 'BTN');
CALL payment.InsertBank('213', 'BTPN');
CALL payment.InsertBank('013', 'Permata');
CALL payment.InsertBank('147', 'Muamalat');
CALL payment.InsertBank('016', 'Maybank Indonesia');
CALL payment.InsertBank('153', 'Sinarmas');
CALL payment.InsertBank('547', 'BTPN Syariah');
CALL payment.InsertBank('011', 'Danamon');
CALL payment.InsertBank('950', 'Commonwealth');
CALL payment.InsertBank('019', 'Panin Bank');
CALL payment.InsertBank('023', 'UOB Indonesia');
CALL payment.InsertBank('046', 'DBS Indonesia');
CALL payment.InsertBank('490', 'Bank Neo Commerce');
CALL payment.InsertBank('542', 'Bank Jago');
CALL payment.InsertBank('212', 'Bank Woori Saudara Indonesia 1906');

-- select * from payment.bank
----------------------- Insert Payment Gateaway -----------------------

CALL payment.InsertPaymentGateaway('39358', 'OVO');
CALL payment.InsertPaymentGateaway('70001', 'GOPAY');
CALL payment.InsertPaymentGateaway('3901', 'DANA');
CALL payment.InsertPaymentGateaway('09110', 'LinkAja');
CALL payment.InsertPaymentGateaway('122', 'ShopeePay');

-- select * from payment.payment_gateaway
----------------------- Insert User Accounts --------------------------
-- 	EntityID		int,
-- 	UserID			int,
-- 	AccountType		text,
-- 	Balance			int,
-- 	ExpMonth		int,
-- 	ExpYear			int

-- select *from payment.user_accounts
CALL payment.InsertUserAccounts(1, 1, 'Debit Card', 1000000, 4, 25);
CALL payment.InsertUserAccounts(3, 2, 'Debit Card', 3456, 8, 27);
CALL payment.InsertUserAccounts(3, 3, 'Debit Card', 12425678, 3, 23);
CALL payment.InsertUserAccounts(25, 4, 'Payment', 31245);
CALL payment.InsertUserAccounts(21, 5, 'Payment', 875434);
CALL payment.InsertUserAccounts(22, 6, 'Payment', 42363);
CALL payment.InsertUserAccounts(21, 7, 'Payment', 9871324);
CALL payment.InsertUserAccounts(23, 8, 'Payment', 432789);
CALL payment.InsertUserAccounts(24, 9, 'Payment', 8430300);
CALL payment.InsertUserAccounts(11, 10, 'Debit Card', 1500200, 8, 25);
CALL payment.InsertUserAccounts(13, 11, 'Debit Card', 3456, 7, 26);
CALL payment.InsertUserAccounts(13, 12, 'Debit Card', 12425678, 2, 22);
CALL payment.InsertUserAccounts(15, 13, 'Debit Card', 1000000, 8, 25);
CALL payment.InsertUserAccounts(20, 14, 'Debit Card', 3456, 5, 25);
CALL payment.InsertUserAccounts(19, 15, 'Debit Card', 12425678, 11, 24);
CALL payment.InsertUserAccounts(18, 16, 'Debit Card', 1000000, 6, 25);
CALL payment.InsertUserAccounts(17, 17, 'Debit Card', 3456, 11, 23);
CALL payment.InsertUserAccounts(16, 18, 'Debit Card', 12425678, 9, 21);
CALL payment.InsertUserAccounts(15, 19, 'Debit Card', 3456, 12, 26);
CALL payment.InsertUserAccounts(14, 20, 'Debit Card', 12425678, 1, 22);
CALL payment.InsertUserAccounts(25, 21, 'Payment', 31245);
CALL payment.InsertUserAccounts(24, 22, 'Payment', 875434);
CALL payment.InsertUserAccounts(23, 23, 'Payment', 42363);
CALL payment.InsertUserAccounts(22, 24, 'Payment', 9871324);
CALL payment.InsertUserAccounts(21, 2, 'Payment', 432789);
CALL payment.InsertUserAccounts(23, 10, 'Payment', 8430300);

----------------------- Insert Payment Transaction -----------------------
-- VA HOTEL: 326625809

-- select * from payment.payment_transaction
-- select * from resto.order_menus
-- select * from payment.user_accounts

--  Payment Transaction: Order Menu at Restaurant
CALL payment.InsertBookingPaymentTransaction('MENUS#20221127-0001', 23000);
CALL payment.InsertBookingPaymentTransaction('MENUS#20221127-0002', 100293);
CALL payment.InsertBookingPaymentTransaction('MENUS#20221127-0003', 593029);
CALL payment.InsertBookingPaymentTransaction('MENUS#20221127-0004', 34500);
CALL payment.InsertBookingPaymentTransaction('MENUS#20221127-0005', 122200);
CALL payment.InsertBookingPaymentTransaction('MENUS#20221127-0006', 350994);
CALL payment.InsertBookingPaymentTransaction('MENUS#20221127-0007', 1285600);
CALL payment.InsertBookingPaymentTransaction('MENUS#20221127-0008', 359282);
CALL payment.InsertBookingPaymentTransaction('MENUS#20221127-0009', 46000);
CALL payment.InsertBookingPaymentTransaction('MENUS#20221127-0010', 76864);

-- Payment Transaction: Room Booking at Hotel
CALL payment.InsertBookingPaymentTransaction(TBA, 76864);
CALL payment.InsertBookingPaymentTransaction(TBA, 76864);
CALL payment.InsertBookingPaymentTransaction(TBA, 76864);
CALL payment.InsertBookingPaymentTransaction(TBA, 76864);
CALL payment.InsertBookingPaymentTransaction(TBA, 76864);
CALL payment.InsertBookingPaymentTransaction(TBA, 76864);
CALL payment.InsertBookingPaymentTransaction(TBA, 76864);
CALL payment.InsertBookingPaymentTransaction(TBA, 76864);
CALL payment.InsertBookingPaymentTransaction(TBA, 76864);
CALL payment.InsertBookingPaymentTransaction(TBA, 76864);

-- Payment Transaction: Top Up
CALL payment.InsertPaymentTransaction('TP', 300000, '751527261');

-- Payment Transaction: Refund
CALL payment.InsertPaymentTransaction('RF', 250000, '383667679');

-- Payment Transaction: Repayment
CALL payment.InsertPaymentTransaction('RPY', 50000, '264253607');