const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'e23b8e3a19b1e4b2a7d96f77646a3dbb8b19e9a72eafbd5a5f12b5b1e7fbd41e'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).send({
        error: 'Unauthorized',
        message: 'No token provided'
    })

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(500).send({
            error: 'Unauthorized',
            message: 'Invalid username/password'
        })

        req.user = user
        next()
    });
};

module.exports = {
    verifyToken
};
