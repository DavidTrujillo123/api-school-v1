const { db } = require("../../config/connection");

const attendanceReadDates = async (req, res) => {
  const { co_id } = req.params;

  try {
    const years = await db.any(
      `SELECT DISTINCT
        EXTRACT(YEAR FROM a.at_date) AS year
      FROM
        attendance a
      WHERE
        a.co_id = $1
      ORDER BY year;
      `,[co_id]
    );
    
    const response = [];
    
    for (const year of years) {
      const monthsDays = [];
      
      const months = await db.any(`
        SELECT DISTINCT
          EXTRACT(MONTH FROM a.at_date) AS month
        FROM
            attendance a
        WHERE
            a.co_id = $1
        AND 
          EXTRACT(YEAR FROM a.at_date) = $2
        ORDER BY month;
      `, [co_id, year.year]); 

      for (const month of months) {
        const days = await db.any(`
          SELECT DISTINCT
            a.at_id,
            EXTRACT(DAY FROM a.at_date) AS day
          FROM
            attendance a
          WHERE
            a.co_id = $3
          AND 
            EXTRACT(YEAR FROM a.at_date) = $1
          AND
            EXTRACT(MONTH FROM a.at_date) = $2
          ORDER BY day;
        `, [year.year, month.month, co_id])
      
        monthsDays.push({
          month:month.month ,
          days
        });
      }

      response.push({
        year: year.year, 
        months: monthsDays
      });
    };
    
    res.json(response);
  } catch (error) {
    res.json({
      message: "Error al leer asistencias",
      error: {
        error_code: "404",
        details: error.message,
      },
    });
  }
};

const attendanceReadStudents = async (req, res) => {
  const { at_id } = req.params;

  try {
    const response = await db.any(`
      SELECT 
        a.at_date, 
        a.at_description, 
        c.co_name, st.st_name, 
        st.st_surname, 
        att."at_st_isPresent"
      FROM attendance a
        JOIN attendance_student att on att.at_id = a.at_id
        JOIN student st on st.st_id = att.st_id
        JOIN course c on c.co_id = a.co_id
      WHERE a.at_id = ${at_id}
    `);

    res.json(response);
  } catch (error) {
    res.json({
      message: "Error al leer asistencias",
      error: {
        error_code: "404",
        details: error.message,
      },
    });
  }
};

const attendanceCreate = async (req, res) => {
  const { co_id, at_description } = req.body;

  try {
    const response = await db.one(
      `
      INSERT INTO public.attendance(
        co_id, at_description, at_date)
      VALUES ($1, $2, NOW() )
      RETURNING at_description, at_date;
    `,
      [co_id, at_description]
    );

    res.json(response);
  } catch (error) {
    res.json({
      message: "Error al crear asistencia",
      error: {
        error_code: "404",
        details: error.message,
      },
    });
  }
};

const attendanceUpdate = async (req, res) => {
  const { at_id, at_description } = req.body;

  try {
    const response = await db.one(
      `
      UPDATE attendance
      SET at_description = $1
      WHERE at_id = $2
      RETURNING at_id, at_description;
    `,
      [at_description, at_id]
    );

    res.json(response);
  } catch (error) {
    res.json({
      message: "Error al actualizar asistencia",
      error: {
        error_code: "404",
        details: error.message,
      },
    });
  }
};

const attendanceIsPresent = async (req, res) => {
  // st_data is an array of object that contais:
  // st_id and at_st_isPresent
  // st_data = [ {st_id: , at_st_isPresent} ]
  const { at_id, st_data } = req.body;

  try {
    st_data.forEach(async (element) => {
      await db.none(
        `
        INSERT INTO attendace_studet 
          (at_id, st_id,at_st_isPresent)
        VALUES ($1, $2, $3);
      `,
        [at_id, element.st_id, element.at_st_isPresent]
      );
    });

    res.json({ message: "Asistencia Registrada" });
  } catch (error) {
    res.json({
      message: "Error al registrar asistencia",
      error: {
        error_code: "404",
        details: error.message,
      },
    });
  }
};

module.exports = {
  attendanceCreate,
  attendanceUpdate,
  attendanceIsPresent,
  attendanceReadStudents,
  attendanceReadDates,
};
