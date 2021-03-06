const jwt = require('express-jwt');
const { secret } = require('../helpers/config.js');
const db = require('../helpers/db');

module.exports = authorise;

function authorise(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret, algorithms: ['HS256'] }),

    // authorize based on user role
    async (req, res, next) => {
      const user = await db.User.findByPk(req.user.id);

      if (
        !user ||
        (roles.length && !roles.includes(user.role)) ||
        !user.active
      ) {
        // user no longer exists or role not authorised or user is deactivated
        return res.status(401).json({ message: 'Unauthorised' });
      }

      // authentication and authorisation successful
      req.user.role = user.role;
      const refreshTokens = await user.getRefreshTokens();
      req.user.ownsToken = (token) =>
        !!refreshTokens.find((x) => x.token === token);
      next();
    },
  ];
}
