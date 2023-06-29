const { validateToken } = require("../utils/tokens");

function validateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    try {
      const { payload } = validateToken(token);
      req.user = payload;

      if (payload) return next();
    } catch (error) {
      console.error(error);
      return res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
}
module.exports = validateUser;
