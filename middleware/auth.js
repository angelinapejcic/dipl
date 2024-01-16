const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    const baseUrl = req.baseUrl.split('/')[1];
    if (authHeader) {

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (user.role === baseUrl) {
                req.user = user;
                next();
            }
            else {
                res.sendStatus(401);
            }

        });
    } else {
        res.sendStatus(401);
    }
};


module.exports = authenticateJWT