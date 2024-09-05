const pool = require("../../config/db");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'e23b8e3a19b1e4b2a7d96f77646a3dbb8b19e9a72eafbd5a5f12b5b1e7fbd41e'
const JWT_EXPIRES_IN = '3h'

class Users {
    constructor(id, name, username, email, password, role, address, phonenumber) {
        this.id = id
        this.name = name
        this.username = username
        this.email = email
        this.password = password
        this.role = role
        this.address = address
        this.phonenumber = phonenumber
    }

    static async create({ name, username, email, password, role, address, phonenumber }) {
        const query = `
            INSERT INTO "users" 
                ("name", "username", "email", "password", "role", "address", "phonenumber")
            VALUES
                ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            `;
    
        const { rows } = await pool.query(query, [
            name, username, email, bcrypt.hashSync(password, 8), role, address, phonenumber
        ])
        const newData = rows[0]
        return new Users(
            newData.id,
            newData.name,
            newData.username,
            newData.email,
            newData.password,
            newData.role,
            newData.address,
            newData.phonenumber
        );
    }

    static async checkUser({ email, password }) {
        const userQuery = `
            SELECT * FROM "users"
            WHERE "email" = $1
        `
    
        const { rows } = await pool.query(userQuery, [email])
        if (rows.length === 0) {
            throw new Error('User not found')
        }
        const user = rows[0]

        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) {
            throw new Error('Invalid username/password')
        }

        const accessToken = jwt.sign(
            { id: user.id, name: user.name, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return {
            accessToken: accessToken,
            id: user.id,
            role: user.role,
            name: user.name
        };
    }

    static async verifyToken({ email, password }) {
        let tokenHeader = req.headers['x-access-token']

		if (tokenHeader.split(' ')[0] !== 'Bearer') {
			return res.status(500).send({
				auth: false,
				message: "Error",
				errors: "Incorrect token format"
			});
		}

		let token = tokenHeader.split(' ')[1];

		if (!token) {
			return res.status(403).send({
				auth: false,
				message: "Error",
				errors: "No token provided"
			});
		}

		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				return res.status(500).send({
					auth: false,
					message: "Error",
					errors: err
				});
			}
			req.userId = decoded.id
			next()
		});
    }
}

module.exports = Users