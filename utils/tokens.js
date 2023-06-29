const secret = "fideos";
const jwt = require("jsonwebtoken");

function generateToken(payload) {
  const token = jwt.sign({ payload }, secret, {
    expiresIn: "2h",
  });

  return token;
}

function validateToken(token) {
  if (!token) {
    throw new Error("No token provided");
  }
  try {
    const decoded = jwt.verify(token, secret);
    return { payload: decoded };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to validate token");
  }
}

module.exports = { generateToken, validateToken };
