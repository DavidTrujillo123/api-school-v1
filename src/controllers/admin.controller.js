const { db } = require("../../config/connection");

//----------------CREATE ADMIN
const adminCreate = async (req, res) => {
  const ad_name = req.body.ad_name;
  const ad_email = req.body.ad_email;
  const ad_password = req.body.ad_password;

  try {
    const response = await db.one(`
      INSERT INTO admin_school (ad_name, ad_email, ad_password, created_at)
      VALUES ('${ad_name}', '${ad_email}', '${ad_password}', NOW())
      RETURNING ad_name, ad_email
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



module.exports = {
  adminCreate
};
