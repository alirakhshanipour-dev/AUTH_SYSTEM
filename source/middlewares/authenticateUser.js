import { StatusCodes as STATUS } from 'http-status-codes';
import passport from 'passport';

const authenticateJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(STATUS.UNAUTHORIZED).json({ message: "please login to your account" });
        }
        req.user = user;
        next();
    })(req, res, next);
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(STATUS.FORBIDDEN).json({ message: "you don't have access to this route" });
        }
        next();
    };
};
export { authenticateJWT, authorizeRoles };
