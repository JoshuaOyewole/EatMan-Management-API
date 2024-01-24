const jwt = require("jsonwebtoken");
const createError = require("../util/error");

const verifyToken = (req, res, next) => {
  //check if the user even have a token. If not throw an error
  let token;

  if (
    req.headers?.authorization !== undefined &&
    req.headers?.authorization?.startsWith("Bearer")
  ) {
    token = req.headers?.authorization?.split(" ")[1];

    //verify if a token is valid. If not valid throw an error
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      //if valid access the data in the token in a req variable
      if (!err) {
        req.user = data;
        return next();
      } else {
        return createError(403, "Access denied, Incorrect Authorization Code");
      }
    });
  } else {
    return next(createError(401, "Access denied, No Authorization code"));
  }
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.rank === "user" || "admin") {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
const verifyStaff = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.rank === "staff" || "admin") {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.rank === "admin") {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports = { verifyAdmin, verifyToken, verifyStaff, verifyUser };
