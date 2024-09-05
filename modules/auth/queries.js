const Users = require("./model")

exports.register = async (req, res, body) => {
    try {
        const { name,username,email,password,role,address,phonenumber} = body

        const data = await Users.create({name,username,email,password,role,address,phonenumber})
        res.status(200).json(data)
    } catch (err) {
        res.status(500).send({
            message: err.message,
            status: 'failed'
        })
    }
}

exports.login = async (req, res, body) => {
    try {
        const { email,password} = body

        const data = await Users.checkUser({email,password})
        res.status(200).json(data)
    } catch (err) {
        res.status(500).send({
            message: err.message,
            error: 'Unauthorized'
        })
    }
}