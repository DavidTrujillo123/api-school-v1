const { db } = require("../../config/connection");

const studentReadById = async (req, res) => {
  const { st_id } = req.params;

  try {
    const student = await db.one(`
      SELECT st_id, st_name, st_surname, st_status
      FROM student
      WHERE st_id = ${st_id};
    `);

    const courses = await db.any(`
      SELECT c.co_id, c.co_name, c.co_status
      FROM course c, course_student cs
      WHERE cs.st_id = ${st_id}
      AND cs.co_id = c.co_id;
    `);

    const response = {
      st_id: student.st_id,
      st_name: student.st_name,
      st_surname: student.st_surname,
      st_status: student.st_status,
      courses: courses,
    };

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

const studentCreate = async (req, res) => {
  const { st_name, st_surname, co_id } = req.body;

  try {
    const response = await db.one(
      `
      INSERT INTO public.student(
        st_name, st_surname, st_status, created_at)
      VALUES 
        ($1, $2,TRUE, NOW())
      RETURNING st_id, st_name, st_surname;
    `,
      [st_name, st_surname]
    );

    if (co_id != undefined || co_id != null) {
      await db.none(
        `
        INSERT INTO public.course_student(
          co_id, st_id)
        VALUES 
          ($1, $2)
      `,
        [co_id, response.st_id]
      );
    }

    res.json({ success: true, response });
  } catch (error) {
    res.json({
      success: false,
      response: "Error al crear el estudiante",
      error: {
        error_code: "404",
        details: error.message,
      },
    });
  }
};

const studentUpdate = async (req, res) => {
  const { st_id, st_name, st_surname, st_status } = req.body;

  try {
    const response = await db.one(
      `
      UPDATE student
      SET 
        st_name = $2, 
        st_surname = $3,
        st_status = $4
      WHERE st_id = $1
      RETURNING st_id, st_name, st_surname;
    `,
      [st_id, st_name, st_surname, st_status]
    );

    //TODO: Change course
    //Add req.body co_id, co_id_old like this
    // const { st_id, st_name,
    //   st_surname, co_id, co_id_old } = req.body;

    // if(co_id != undefined || co_id != null) {
    //   await db.none(`
    //     UPDATE public.course_student
    //     SET co_id=${co_id}
    //     WHERE st_id = ${st_id}
    //     AND co_id = ${co_id_old};
    //   `);
    // }

    res.status(200).json({ success: true, response });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error al actualizar el estudiante",
      error: {
        error_code: "404",
        details: error.message,
      },
    });
  }
};

const studentChangeState = async (req, res) => {
  const { st_id } = req.params;

  try {
    await db.one(`
      UPDATE student
      SET 
        st_status = false, 
      WHERE st_id = ${st_id};
      RETURNING st_id, st_name, st_surname;
    `);

    res.json({
      message: "Estudiante eliminado exitosamente",
    });
  } catch (error) {
    res.json({
      message: "Error al eliminar el estudiante",
      error: {
        error_code: "404",
        details: error.message,
      },
    });
  }
};

const studentDelete = async (req, res) => {
  const { st_id } = req.params;

  try {
    await db.none(`
      DELETE FROM student WHERE st_id = ${st_id};
    `);

    res.status(200).json({
      success: true,
      message: "Estudiante eliminado exitosamente",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error al eliminar el estudiante",
      error: {
        error_code: "404",
        details: error.message,
      },
    });
  }
};

module.exports = {
  studentReadById,
  studentCreate,
  studentUpdate,
  studentChangeState,
  studentDelete,
};
