const { verify } = require('jsonwebtoken');
const {generateToken} = require('../jwt/token');
const { db } = require("../../config/connection");

const adminLogin = async (req, res) => {
  const { ad_email, ad_password} = req.body;
  try {
    const idAdmin = await db.one(`
      SELECT ad_id 
      FROM admin
      WHERE ad_email like '${ad_email}'
    `);
    
    
    const admin = await db.one(`
      SELECT ad_name, ad_email 
      FROM admin
      WHERE ad_id = ${idAdmin.ad_id}
      AND ad_password like '${ad_password}'
    `);

    const response = generateToken(admin);

    res.setHeader("Set-cookie", response);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.json({
      message: "Error en el usuario o contraseña",
      error: {
        error_code: "404",
      },
    });
  }
};

const teacherLogin = async (req, res) => {
  const { te_email, te_password } = req.body;
  console.log(te_email);
  
  try {
    const idTeacher = await db.one(`
      SELECT te_id 
      FROM teacher
      WHERE te_email like '${te_email}'
    `);

    if (!idTeacher){
      throw new Error;
    }

    const teacher = await db.one(`
      SELECT te_id, te_name, te_surname, te_email 
      FROM teacher
      WHERE te_email like '${te_email}'
      AND te_password like crypt('${te_password}', te_password);
    `);

    const response = generateToken(teacher);

    res.setHeader("Set-cookie", response);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    
    res.status(401).json({
      response: "Error en el usuario o contraseña",
      success: false,
    });
  }
};

const verifyToken = async (req, res) => {  
  try {
    const tokenFromCookie = req.cookies.token; 
    verify(tokenFromCookie, "secret");
  
    return res.status(200).json({success: true})
  } catch (error) {
    return res.status(404).json({success: false});
  }
}

module.exports = {
  teacherLogin,
  adminLogin,
  verifyToken
}