const passport = require('passport');

const authenticate = passport.authenticate('jwt', { session: false });

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    authenticate,
    (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.redirect('/admin/login.html');
      }

      if (!roles.length) {
        return next();
      }
      
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ 
          message: 'Forbidden: You do not have permission to perform this action' 
        });
      }
      
      next();
    }
  ];
};

module.exports = {
  authenticate,
  authorize
}; 