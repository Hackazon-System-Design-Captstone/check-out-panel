\c - power_user

\c hackazon

-- CREATE TABLE product_table (product_id SERIAL PRIMARY KEY, name VARCHAR(100), image VARCHAR(255), link VARCHAR(255), shares INT, price NUMERIC, is_prime BOOLEAN, in_stock BOOLEAN, giftwrap_available BOOLEAN, quantity_max INT, seller VARCHAR(255));
--
-- CREATE TABLE protection_table (protection_id SERIAL PRIMARY KEY, product_id SERIAL, available BOOLEAN, protection_name VARCHAR(255), protection_price NUMERIC, years INT, provider VARCHAR(255), rating INT, description VARCHAR(255), FOREIGN KEY (product_id) REFERENCES product_table (product_id));

-- \COPY product_table (name, image, link, shares, price, is_prime, in_stock, giftwrap_available, quantity_max, seller) FROM '/Users/andrew/Documents/productDataPost.csv' DELIMITER '|' CSV;
-- \COPY protection_table (available, protection_name, protection_price, years, provider, rating, description) FROM '/Users/andrew/Documents/protectionDataPost.csv' DELIMITER '|' CSV
--
CREATE INDEX product_idx ON protection_table USING btree(product_id);
-- '/Users/andrew/Documents/protectionDataPost.csv'

-- psql -U postgres -h 'ec2-18-144-17-138.us-west-1.compute.amazonaws.com' -f 'schema.sql'
