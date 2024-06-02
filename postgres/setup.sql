-- Sequence: public.Users_id_seq
CREATE SEQUENCE IF NOT EXISTS public."Users_id_seq";

-- Sequence: public.Data_id_seq
CREATE SEQUENCE IF NOT EXISTS public."Data_id_seq";

-- Table: public.Users

-- DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id),
    CONSTRAINT "Users_email_key" UNIQUE (email)
);

-- Table: public.Data

-- DROP TABLE IF EXISTS public."Data";

CREATE TABLE IF NOT EXISTS public."Data"
(
    id integer NOT NULL DEFAULT nextval('"Data_id_seq"'::regclass),
    "DATA_MC" character varying(255) NOT NULL,
    "KOD_WOJ" character varying(255) NOT NULL,
    "WOJEWODZTWO" character varying(255) NOT NULL,
    "PLEC" character varying(255) NOT NULL,
    "WIEK" integer NOT NULL,
    "LICZBA" integer NOT NULL,
    CONSTRAINT "Data_pkey" PRIMARY KEY (id)
);

-- Import data into tables
COPY public."Users"("firstName", "lastName", email, password, "createdAt", "updatedAt") 
FROM '/docker-entrypoint-initdb.d/exportedUsers' 
DELIMITER '|' 
CSV HEADER 
ENCODING 'WIN1250';

COPY public."Data"("DATA_MC", "KOD_WOJ", "WOJEWODZTWO", "PLEC", "WIEK", "LICZBA") 
FROM '/docker-entrypoint-initdb.d/exportedData' 
DELIMITER '|' 
CSV HEADER 
ENCODING 'WIN1250';
