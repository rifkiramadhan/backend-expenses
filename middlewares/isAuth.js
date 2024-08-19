const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(' ')[1];

  //! Verify the token
  const verifyToken = jwt.verify(token, 'masyntechKey', (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });

  if (verifyToken) {
    //! Save the user req obj
    req.user = verifyToken.id;
    next();
  } else {
    const err = new Error('Token expired, login again!');
    next(err);
  }
};

module.exports = isAuthenticated;
