const { verify } = require('jsonwebtoken');
const {generateToken} = require('../jwt/token');
const { db } = require("../../config/connection");

//----------------LOGIN

const teacherVerificacionToken = async (req, res) => {
  try {
    const accesToken = req.cookies.token;

    verify(accesToken, "secret")
    
    res.status(200).json({success: true})
  } catch (error) {
    res.status(401).json({
      response: "Error en el token",
      success: false,
    });
  }
  
}

const teacherReadCookie = async (req, res) => {
  try {
    const tokenFromCookie = req.cookies.token; 
    const data = verify(tokenFromCookie, "secret");
  
    return res.json(data)
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
}

const teacherLogin = async (req, res) => {
  const { te_email, te_password } = req.body;
  try {
    const idTeacher = await db.one(`
      SELECT te_id 
      FROM teacher
      WHERE te_email like '${te_email}'
    `);

    const teacher = await db.one(`
      SELECT te_id, te_name, te_surname, te_email 
      FROM teacher
      WHERE te_id = ${idTeacher.te_id}
      AND te_password like '${te_password}';
    `);

    const response = generateToken(teacher);

    res.setHeader("Set-cookie", response);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      response: "Error en el usuario o contraseña",
      success: false,
    });
  }
};
//----------------SELECT
const teacherStudents = async (req, res) => {
  const { te_id } = req.params;

  try {
    const response = await db.any(`
      SELECT s.st_id, s.st_name, s.st_surname, s.st_status
      FROM student s, teacher t
      WHERE t.te_id = s.te_id
      AND t.te_id = ${te_id};
    `);
 
    res.status(200).json(response);

  } catch (error) {
    res.status(404).json({
      message: "Error al leer el estudiante",
      error: {
        error_code: "404",
        details: error.message,
      },
    });
  }
};

const teacherStudentsCourses = async (req, res) => {
  const { te_id } = req.params;
  try {
    const students = await db.any(`
      SELECT st_id, st_name, st_surname, st_status
      FROM student
      WHERE te_id = ${te_id};
    `);

    const studentsWithCourses = [];

    for (const student of students) {
      const courses = await db.any(`
        SELECT c.co_id, c.co_name, c.co_status
        FROM course c, course_student cs
        WHERE cs.st_id = ${student.st_id}
        AND cs.co_id = c.co_id;
      `);

      studentsWithCourses.push({
        st_id: student.st_id,
        st_name: student.st_name,
        st_surname: student.st_surname,
        st_status: student.st_status,
        courses: courses,
      });
    }

    res.json(studentsWithCourses);
  } catch (error) {
    res.json({
      message: "Error al leer los estudiantes",
      error: {
        error_code: "404",
        details: error.message,
      },
    });
  }
};

const teacherCourses = async (req, res) => {
  const { te_id } = req.params;

  try {
    const response = await db.any(`
      SELECT c.co_id, c.co_name, c.co_status, c.created_at
      FROM course c, teacher t
      WHERE t.te_id = c.te_id
      AND t.te_id = ${te_id}; 
    `);

    res.json(response);
  } catch (error) {
    res.json({
      message: "Error al leer el estudiante",
      error: {
        error_code: "404",
        details: error.message,
      },
    });
  }
};

const teacherCoursesStudents = async (req, res) => {
  const { te_id } = req.params;
  try {
    const courses = await db.any(`
      SELECT co_id, co_name, co_status
      FROM course
      WHERE te_id = ${te_id};
    `);

    const coursesWithStudents = [];

    for (const course of courses) {
      const student = await db.any(`
        SELECT s.st_id, s.st_name, s.st_status
        FROM student s, course_student cs
        WHERE cs.co_id = ${course.co_id}
        AND cs.st_id = s.st_id;
      `);

      coursesWithStudents.push({
        co_id: course.co_id,
        co_name: course.co_name,
        co_surname: course.co_surname,
        co_status: course.st_status,
        students: student,
      });
    }

    res.json(coursesWithStudents);
  } catch (error) {
    res.json({
      message: "Error al leer los estudiantes",
      error: {
        error_code: "404",
        details: error.message,
      },
    });
  }
};

//----------------CREATE TEACHER ----------------
const teacherCreate = async (req, res) => {
  const te_name = req.body.te_name;
  const te_surname = req.body.te_surname;
  const te_email = req.body.te_email;
  const te_password = req.body.te_password;

  try {
    const response = await db.one(`
      INSERT INTO teacher (
        te_name, te_surname, 
        te_email, te_password, 
        te_status, created_at)
      VALUES (
        '${te_name}', '${te_surname}',
        '${te_email}','${te_password}', 
        1, NOW() )
      RETURNING te_name, te_surname, te_email;
    `);

    res.json(response);
  } catch (error) {
    res.json({
      message: "Error al crear el usuario",
      error: {
        error_code: "404",
      },
    });
  }
};

const teacherUpdate = async (req, res) => {
  const { te_id, te_name, te_surname, te_password } = req.body;

  try {
    const response = await db.one(
      `
      UPDATE public.teacher
      SET 
        te_name=$1, 
        te_surname=$2,  
        te_password=$3 
      WHERE te_id=$4
      RETURNING te_name, te_surname, te_email;
    `,
      [te_name, te_surname, te_password, te_id]
    );

    res.json(response);
  } catch (error) {
    res.json({
      message: "Error al actualizar el usuario",
      error: {
        error_code: error,
      },
    });
  }
};

const teacherDelete = async (req, res) => {
  const { te_id } = req.params;

  try {
    const response = await db.one(
      `
      UPDATE public.teacher
      SET 
        te_status=false
      WHERE te_id=$1
      RETURNING te_name, te_surname, te_email, te_status;
    `,
      [te_id]
    );

    res.json(response);
  } catch (error) {
    res.json({
      message: "Error al actualizar el usuario",
      error: {
        error_code: error,
      },
    });
  }
};

module.exports = {
  teacherLogin,
  teacherCreate,
  teacherUpdate,
  teacherCourses,
  teacherCoursesStudents,
  teacherStudents,
  teacherStudentsCourses,
  teacherDelete,
  teacherReadCookie,
  teacherVerificacionToken,
};
