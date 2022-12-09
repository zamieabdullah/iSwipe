SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';
SET default_table_access_method = heap;

SET search_path = public, pg_catalog;

-- 
-- Extensions
-- 

CREATE EXTENSION pgcrypto;

-- 
-- Tables
-- 

CREATE TABLE account (
    id integer GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email_address text NOT NULL,
    password text NOT NULL,
    last_update timestamptz DEFAULT now() NOT NULL 
);

-- ALTER TABLE public.account OWNER TO postgres;

-- 
-- Functions
-- 

CREATE FUNCTION last_updated() RETURNS trigger
    AS $$
    BEGIN
        NEW.last_update = now();
        RETURN NEW;
    END; 
    $$ LANGUAGE plpgsql;

-- ALTER FUNCTION public.last_updated OWNER TO postgres;

-- 
-- Triggers
-- 

CREATE TRIGGER last_updated
    BEFORE UPDATE ON account
    FOR EACH ROW
    EXECUTE PROCEDURE last_updated();
