const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (!token) {
        return res.status(401).json({ message : 'Failed to authenticate' })
    } else {
        jwt.verify(token, process.env.JWT_PRIVATE, (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to authenticate' });
            }
            req.user = data.user;
            next();
        });
    }
}

module.exports = { verifyAuth };