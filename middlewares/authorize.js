const { verifyJwtToken } = require("../utils/jwtHelpers");

const Errors = {
  noToken: {
    status: 403,
    message: "Please login",
  },
  invalidToken: {
    status: 403,
    message: "Invalid User, Please Login Again",
  },
  unAuthorizedUser: {
    status: 402,
    message: "You are not authorized to access this resource",
  },
};



/**
 * Middleware to validate logged in user
 * @type {import('express').RequestHandler}
 */
const authorizeUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw Errors.noToken;
    }

    let decoded;
    try {
      decoded = verifyJwtToken(token);
    } catch (error) {
      console.log(error);

      throw Errors.invalidToken;
    }


    req.user = decoded;
console.log(decoded);
    next();
  } catch (error) {
    res.status(error.status || 403).json({
      message: error.message,
    });
  }
};

module.exports = {
    authorizeUser
    
}
