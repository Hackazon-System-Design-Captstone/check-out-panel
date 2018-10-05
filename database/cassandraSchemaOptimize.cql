DROP KEYSPACE hackazon1;

CREATE KEYSPACE hackazon1
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

USE hackazon1;

CREATE TABLE products (
 product_id INT,
 name VARCHAR,
 image VARCHAR,
 link VARCHAR,
 shares INT,
 price DECIMAL,
 is_prime BOOLEAN,
 in_stock BOOLEAN,
 giftwrap_available BOOLEAN,
 quantity_max INT,
 seller VARCHAR,
 protect_id INT,
 protect_available BOOLEAN,
 protect_name VARCHAR,
 protect_price DECIMAL,
 protect_years INT,
 protect_provider VARCHAR,
 protect_rating INT,
 protect_description VARCHAR,
 PRIMARY KEY(product_id, protect_id)
);
