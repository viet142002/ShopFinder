const jwt = require('jsonwebtoken');

const authMiddlewares = {
    authorization: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        const token = req.headers.authorization.split(' ')[1];

        try {
            // check if token is valid
            const user = jwt.verify(token, process.env.JWT_SECRET);

            if (!user) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({
                message: error.message,
            });
        }
    },
    authentication: role => (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        const token = req.headers.authorization.split(' ')[1];

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            if (!user) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }
            if (user.role !== role) {
                return res.status(403).json({
                    message: 'Forbidden',
                });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({
                message: error.message,
            });
        }
    },
};

module.exports = authMiddlewares;
