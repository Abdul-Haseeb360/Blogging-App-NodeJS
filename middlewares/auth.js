const { validateToken } = require("../utiles/auth");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}

    return next();
  };
}

// Middleware to pass user data to all views
function setUserLocals(req, res, next) {
  res.locals.user = req.user || null;
  next();
}

module.exports = {
  checkForAuthenticationCookie,
  setUserLocals
};
