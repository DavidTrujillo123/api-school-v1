INSERT INTO public.admin(
	ad_name, ad_email, ad_password, created_at)
VALUES ('David Trujillo', 'davo@gmail.com', '12345', NOW());


INSERT INTO public.teacher(
	te_name, te_surname, te_email, te_password, te_status, created_at)
VALUES 
('Alice', 'Smith', 'alice.smith@example.com', 'password123', true, NOW()),
('Bob', 'Johnson', 'bob.johnson@example.com', 'password123', true, NOW()),
('Carol', 'Williams', 'carol.williams@example.com', 'password123', false, NOW()),
('David', 'Brown', 'david.brown@example.com', 'password123', true, NOW()),
('Betsy', 'Montenegro', 'betsy@gmail.com', '12345', true, NOW());


INSERT INTO public.student(
	te_id, st_name, st_surname, st_status, created_at)
VALUES 
(1, 'Michael', 'Anderson', TRUE, NOW()),
(2, 'Emily', 'Clark', FALSE, NOW()),
(3, 'Chris', 'Martinez', TRUE, NOW()),
(4, 'Sophia', 'Lee', TRUE, NOW()),
(5, 'Daniel', 'Hernandez', TRUE, NOW()),
(5, 'Anita', 'Huerfanita', TRUE, NOW());


INSERT INTO public.course(
	te_id, co_name, co_status, created_at)
VALUES 
(1, '8vo A', TRUE, NOW()),
(2, '1ero C', TRUE, NOW()),
(3, '1er A', TRUE, NOW()),
(4, '5to A', TRUE, NOW()),
(5, '1ero A', TRUE, NOW()),
(5, '1ero B', TRUE, NOW());



-- select t.te_id, t.te_email, s.st_id, s.st_name
-- from teacher t, student s
-- where t.te_id = s.te_id
-- and t.te_id = 5


-- select t.te_id, t.te_email, c.co_id, c.co_name
-- from teacher t, course c
-- where t.te_id = c.te_id
-- and t.te_id = 5

-- teacher => 5
-- course => 16 - 17
-- student => 5 - 6

INSERT INTO course_student (co_id, st_id) 
VALUES (16, 5)

INSERT INTO course_student (co_id, st_id) 
VALUES (16, 6)

INSERT INTO public.attendance(
	co_id, at_description, at_date)
VALUES (16, 'Asistencia 2', NOW());


-- select c.co_id, c.co_name, t.te_id, t.te_name, a.at_description, a.at_date, s.st_name, ats."at_st_isPresent"
-- from course c, teacher t, attendance a, attendance_student ats, student s
-- where t.te_id = c.te_id
-- and a.co_id = c.co_id
-- and ats.st_id = s.st_id
-- and ats.at_id = a.at_id
	
INSERT INTO public.attendance_student(
	at_id, st_id, "at_st_isPresent")
	VALUES (1, 6, true);

-- SELECT t.te_name, c.co_name,c.co_id, st.st_name
-- FROM teacher t, course c, course_student ct, student st
-- where t.te_id = c.te_id
-- and ct.co_id = c.co_id
-- and ct.st_id = st.st_id
-- and t.te_id = 5
-- and c.co_id = 16;


SELECT
      EXTRACT(YEAR FROM a.at_date) AS year,
      EXTRACT(MONTH FROM a.at_date) AS month,
	  EXTRACT(DAY FROM a.at_date) AS day,
	  c.co_id,
      c.co_name,
	  s.st_id,
      s.st_name,
	  s.st_surname,
      ast."at_st_isPresent" AS at_st_isPresent
  FROM
      attendance a
      JOIN course c ON a.co_id = c.co_id
      JOIN attendance_student ast ON a.at_id = ast.at_id
      JOIN student s ON ast.st_id = s.st_id
  WHERE
      c.co_id = 16
  AND EXTRACT(YEAR FROM a.at_date) = 2024
ORDER BY year, month, day;









SELECT
      EXTRACT(YEAR FROM a.at_date) AS year,
      EXTRACT(MONTH FROM a.at_date) AS month,
	  EXTRACT(DAY FROM a.at_date) AS day,
	  c.co_id,
      c.co_name,
	  s.st_id,
      s.st_name,
	  s.st_surname,
      ast."at_st_isPresent" AS at_st_isPresent
  FROM
      attendance a
      JOIN course c ON a.co_id = c.co_id
      JOIN attendance_student ast ON a.at_id = ast.at_id
      JOIN student s ON ast.st_id = s.st_id
  WHERE
      c.co_id = 16
  AND EXTRACT(YEAR FROM a.at_date) = 2024
ORDER BY year, month, day;


SELECT
      EXTRACT(YEAR FROM a.at_date) AS year,
      EXTRACT(MONTH FROM a.at_date) AS month,
	  EXTRACT(DAY FROM a.at_date) AS day
  FROM
      attendance a
      JOIN course c ON a.co_id = c.co_id
      JOIN attendance_student ast ON a.at_id = ast.at_id
      JOIN student s ON ast.st_id = s.st_id
  WHERE
      c.co_id = 16
  AND EXTRACT(YEAR FROM a.at_date) = 2024
ORDER BY year, month;



select * from attendance

SELECT
	  a.at_id,
      EXTRACT(YEAR FROM a.at_date) AS year,
      EXTRACT(MONTH FROM a.at_date) AS month,
	  EXTRACT(DAY FROM a.at_date) AS day
  FROM
      attendance a
  WHERE
      a.co_id = 16
  AND EXTRACT(YEAR FROM a.at_date) = 2024
ORDER BY year, month;


SELECT DISTINCT
    EXTRACT(YEAR FROM a.at_date) AS year
FROM
    attendance a
WHERE
    a.co_id = 16
ORDER BY year;
