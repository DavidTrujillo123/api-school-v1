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
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30, // 30 days in seconds,
    
  });

  return serialized;
}

const verificationToken = async (req, res, next) => {
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
};

module.exports = {
  generateToken,
  verificationToken,
}