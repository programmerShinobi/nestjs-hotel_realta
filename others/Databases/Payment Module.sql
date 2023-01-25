CREATE SCHEMA payment;

CREATE TABLE payment.entity (
	entity_id			      serial		  PRIMARY KEY
);

CREATE TABLE payment.bank (
	bank_entity_id		  int 		    PRIMARY KEY,
	bank_code			      varchar(10) UNIQUE,
	bank_name			      varchar(55) UNIQUE,
	bank_modified_date	timestamp,
	CONSTRAINT bank_entity_id_fk
		FOREIGN KEY (bank_entity_id) REFERENCES payment.entity(entity_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE payment.payment_gateaway (
	paga_entity_id		  int 		      PRIMARY KEY,
	paga_code			      varchar(10)   UNIQUE,
	paga_name			      varchar(55)   UNIQUE,
	paga_modified_date	timestamp,
	CONSTRAINT paga_entity_id
		FOREIGN KEY (paga_entity_id) REFERENCES payment.entity(entity_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE payment.user_accounts (
	usac_entity_id		    int,
	usac_user_id		      int,
	usac_account_number	  varchar(25) UNIQUE,
	usac_saldo			      numeric,
	usac_type			        varchar(15), -- debet | cc | payment
	usac_expmonth		      smallint,
	usac_expyear		      smallint,
	usac_modified_date	  timestamp,
	CONSTRAINT user_accounts_pk
		PRIMARY KEY (usac_entity_id, usac_user_id),
	CONSTRAINT usac_entity_id_fk
		FOREIGN KEY (usac_entity_id) REFERENCES payment.entity(entity_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT usac_user_id_fk
		FOREIGN KEY (usac_user_id) REFERENCES users.users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE payment.payment_transaction (
	patr_id				      serial		  PRIMARY KEY,
	patr_trx_number		  varchar(55)	UNIQUE,
	patr_debet			    numeric,
	patr_credit		    	numeric,
	patr_type			      char(3),
	patr_note			      varchar(255),
	patr_modified_date	timestamp,
	patr_order_number	  varchar(55), 
	patr_trx_number_ref	varchar(55) UNIQUE,
	patr_source_id		  int,
	patr_target_id		  int,
	patr_user_id		    int,
  CONSTRAINT patr_user_id_fk
		FOREIGN KEY (patr_user_id) REFERENCES users.users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
