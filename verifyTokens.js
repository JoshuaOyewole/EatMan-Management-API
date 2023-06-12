const jwt = require("jsonwebtoken");
const createError = require("./util/error");

const verifyToken = (req, res, next) => {
  //get the token from the req

  const token = req.cookies;
  //check if the user even have a token. If not throw an error
  if (!token)
    return next(createError(401, "Access denied, No Authorization code"));

  //verify if a token is valid. If not valid throw an error
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    //if valid access the data in the token in a req variable
    if (err)
      return next(
        createError(403, "Access denied, Incorrect Authorization Code")
      );

    req.user = data;
    next();
  });
};

const verifyStaff = (req, res, next) => {
  const token = req.cookies;
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {

    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports = { verifyAdmin, verifyToken, verifyStaff };
