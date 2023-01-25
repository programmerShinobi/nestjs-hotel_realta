-- REGIONS TABLE
CREATE TABLE master.regions(
	region_code SERIAL,
	region_name VARCHAR(35) UNIQUE,
	CONSTRAINT region_code_pk PRIMARY KEY (region_code)
);

-- country table
CREATE table master.country(
	country_id SERIAL,
	country_name VARCHAR(55) UNIQUE,
	country_region_id int,
	CONSTRAINT country_id_pk PRIMARY KEY (country_id),
	CONSTRAINT country_region_id_fk FOREIGN KEY (country_region_id) REFERENCES master.regions (region_code)
);

-- provinces table
CREATE TABLE master.provinces(
	prov_id SERIAL,
	prov_name VARCHAR(90),
	prov_country_id INT,
	CONSTRAINT prov_id_pk PRIMARY KEY (prov_id),
	CONSTRAINT prov_country_id_fk FOREIGN KEY (prov_country_id) REFERENCES master.country (country_id)
);

-- address table 
CREATE TABLE master.address(
	addr_id SERIAL,
	addr_line1 VARCHAR(255),
	addr_line2 VARCHAR(255),
	addr_postal_code VARCHAR(5),
	addr_spatial_location JSON,
	addr_prov_id INT,
	CONSTRAINT addr_id PRIMARY KEY(addr_id),
	CONSTRAINT addr_prov_id_fk FOREIGN KEY (addr_prov_id) REFERENCES master.provinces (prov_id)
);

-- category_grup table
CREATE TABLE master.category_grup(
	cargo_id SERIAL,
	cargo_name VARCHAR(25) UNIQUE,
	cargo_description VARCHAR(255),
	cargo_type VARCHAR(25),
	cargo_icon VARCHAR(255),
	cargo_icon_url VARCHAR(255),
	CONSTRAINT cargo_id_pk PRIMARY KEY(cargo_id)
);


-- policy table
CREATE TABLE master.policy(
	poli_id SERIAL,
	poli_name VARCHAR(55),
	poli_description VARCHAR(255),
	CONSTRAINT poli_id_pk PRIMARY KEY (poli_id)
);

-- policy_category_group
CREATE TABLE master.policy_category_group(
	poca_poli_id serial,
	poca_cargo_id int,
	CONSTRAINT poca_poli_id_pk PRIMARY KEY (poca_poli_id,poca_cargo_id),
	CONSTRAINT poca_poli_id_fk FOREIGN KEY (poca_poli_id) REFERENCES master.policy (poli_id),
	CONSTRAINT poca_cargo_id_fk FOREIGN KEY (poca_cargo_id) REFERENCES master.category_grup (cargo_id)
);


-- price_items
CREATE TABLE master.price_items(
	prit_id serial,
	prit_name varchar(55) UNIQUE,
	prit_description varchar (255),
	prit_price money,
	prit_type varchar(25),
	prit_modified_date timestamp,
	CONSTRAINT prit_id_pk PRIMARY KEY (prit_id)
);

-- members table
CREATE TABLE master.members(
	memb_name varchar(15),
	memb_description varchar(100),
	CONSTRAINT memb_name PRIMARY KEY (memb_name)
);

-- service_task table
CREATE TABLE master.service_task(
	seta_id serial,
	seta_name varchar(85) UNIQUE,
	seta_seq smallint,
	CONSTRAINT seta_id_pk PRIMARY KEY(seta_id)
);

-- masukan data category group
INSERT INTO master.category_grup (cagro_name) VALUES('Room'),
('Restaurant'),('Meeting Room'),('Gym'),('SwimmingPool'),('Balroom');
select *from master.category_grup 