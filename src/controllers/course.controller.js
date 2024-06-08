const { db } = require("../../config/connection");

const courseReadById = async (req, res) => {
  const { co_id } = req.params;
  try {
    const course = await db.one(`
      SELECT co_id, co_name, co_status, created_at 
      FROM course
      WHERE co_id = ${co_id};
    `);

    const students = await db.any(`
      SELECT s.st_id, s.st_name,s.st_surname, s.st_status, created_at
      FROM student s, course_student cs
      WHERE cs.co_id = ${co_id}
      AND cs.st_id = s.st_id;
    `);

    const response = {
      co_id: course.co_id,
      co_name: course.co_name,
      co_status: course.co_status,
      created_at: course.created_at,
      students: students,
    }

    res.json(response);
  } catch (error) {
    res.json({
      message: "Error al leer el curso",
      error: {
        error_code: '404',
        details: error.message,
      },
    });
  }
};

const courseAddStudents = async (req, res) => {
  const {co_id, st_ids} = req.body;
  
  try {
    st_ids.forEach(async element => {
      await db.none(`
        INSERT INTO course_student (
          co_id, st_id)
        VALUES (
          ${co_id}, ${element});
      `);
    });

    res.json({response: "Estudiantes ingresados correctamente"});
  } catch (error) {
    res.json({
      message: "Error al agregar estudiante al curso",
      error: {
        error_code: '404',
        details: error.message,
      },
    });
  }
}

const courseCreate = async (req, res) => {
  const { te_id, co_name } = req.body;

  try {
    const response = await db.one(`
      INSERT INTO course (
        te_id, co_name, co_status, created_at)
      VALUES (
        ${te_id}, '${co_name}', true, NOW())
      RETURNING co_name, co_status, created_at;
    `);

    res.json(response);
  } catch (error) {
    res.json({
      message: "Error al crear el curso",
      error: {
        error_code: '404',
        details: error.message,
      },
    });
  }
};

const courseUpdate = async (req, res) => {
  const { co_id, co_name, co_status } = req.body;

  try {
    const response = await db.one(`
      UPDATE course
      SET 
        co_name = $1, 
        co_status = $2
      WHERE co_id = $3
      RETURNING co_name, co_status;
    `, [co_name, co_status, co_id]);

    res.json(response);
  } catch (error) {
    res.json({
      message: "Error al actualizar el curso",
      error: {
        error_code: '404',
        details: error.message,
      },
    });
  }
};

const courseDelete = async (req, res) => {
  const { co_id } = req.params;

  try {
    const response = await db.one(`
      UPDATE course
      SET co_status= false
      WHERE co_id = $1
      RETURNING co_name, created_at;
    `, [co_id]);

    res.json({
      message: "Curso eliminado exitosamente",
      course: response
    });
  } catch (error) {
    res.json({
      message: "Error al actualizar el estado del curso",
      error: {
        error_code: '404',
        details: error.message,
      },
    });
  }
};



module.exports = {
  courseCreate,
  courseReadById,
  courseUpdate,
  courseDelete,
  courseAddStudents,
};