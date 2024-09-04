CREATE EXTENSION IF NOT EXISTS pgcrypto ;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE "admin" (
  "ad_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "ad_name" varchar NOT NULL,
  "ad_email" varchar UNIQUE NOT NULL,
  "ad_password" varchar NOT NULL,
  "created_at" timestamp
);

CREATE TABLE "teacher" (
  "te_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "te_name" varchar NOT NULL,
  "te_surname" varchar NOT NULL,
  "te_email" varchar UNIQUE NOT NULL,
  "te_password" varchar NOT NULL,
  "te_status" bool NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "course" (
  "co_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "te_id" UUID NOT NULL,
  "co_name" varchar NOT NULL,
  "co_status" bool NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "student" (
  "st_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "st_name" varchar NOT NULL,
  "st_surname" varchar NOT NULL,
  "st_status" bool NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "course_student" (
  "cost_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "co_id" UUID NOT NULL,
  "st_id" UUID NOT NULL
);

CREATE TABLE "attendance" (
  "at_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "co_id" UUID NOT NULL,
  "at_description" varchar,
  "at_date" timestamp NOT NULL
);

CREATE TABLE "attendance_student" (
  "at_st_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "at_id" UUID NOT NULL,
  "st_id" UUID NOT NULL,
  "at_st_is_present" bool NOT NULL
);

CREATE TABLE "materia" (
  "ma_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "co_id" UUID NOT NULL,
  "ma_name" varchar NOT NULL
);

CREATE TABLE "materia_student" (
  "mast_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "ma_id" UUID NOT NULL,
  "st_id" UUID NOT NULL
);

CREATE TABLE "assignment" (
  "as_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "ma_id" UUID NOT NULL,
  "as_description" varchar NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "grade" (
  "gr_id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "as_id" UUID NOT NULL,
  "st_id" UUID NOT NULL,
  "gr_quantity" float NOT NULL
);

ALTER TABLE "course"
  ADD FOREIGN KEY ("te_id") REFERENCES "teacher" ("te_id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE "course_student"
  ADD FOREIGN KEY ("co_id") REFERENCES "course" ("co_id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE "course_student"
  ADD FOREIGN KEY ("st_id") REFERENCES "student" ("st_id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE "attendance"
  ADD FOREIGN KEY ("co_id") REFERENCES "course" ("co_id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE "attendance_student"
  ADD FOREIGN KEY ("at_id") REFERENCES "attendance" ("at_id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE "attendance_student"
  ADD FOREIGN KEY ("st_id") REFERENCES "student" ("st_id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE "materia"
  ADD FOREIGN KEY ("co_id") REFERENCES "course" ("co_id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE "materia_student"
  ADD FOREIGN KEY ("ma_id") REFERENCES "materia" ("ma_id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE "materia_student"
  ADD FOREIGN KEY ("st_id") REFERENCES "student" ("st_id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE "assignment"
  ADD FOREIGN KEY ("ma_id") REFERENCES "materia" ("ma_id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE "grade"
  ADD FOREIGN KEY ("as_id") REFERENCES "assignment" ("as_id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE "grade"
  ADD FOREIGN KEY ("st_id") REFERENCES "student" ("st_id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;
