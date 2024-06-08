const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");

function generateToken(obj) {
  const token = jwt.sign(
    {
      obj,
      exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 30),//30 days
    },
    "secret"
  );

  const serialized = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 60 * 60 * 24 * 30, // 30 days in seconds,
    
  });

  return serialized;
}

const tokenRequiered = async (req, res, next) => {
  try {
    const accesToken = req.cookies.token;
     
    if (!accesToken) {
      res.status(401).json({
        success: false, 
        message: "Access denied"
      });
    }
  
    jwt.verify(accesToken, "secret", (err) =>{
      if (err) {
        res.status(404).json({
          success: false, 
          message: "Access denied, token is invalid or expired"
        });
      } else {
        next();
      }
    })
  } catch (error) {
    res.status(404).json({
      success: false, 
      message: "Something went wrong"
    });
  }

};

const verificationToken = async (req, res) => {
  try {
    const accesToken = req.cookies.token;

    jwt.verify(accesToken, "secret");

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(401).json({
      response: "Invalid Token",
      success: false,
    });
  }

  
}

module.exports = {
  generateToken,
  tokenRequiered,
  verificationToken,
}