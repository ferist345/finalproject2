const router = require('express').Router()
const queries = require('./queries')

router.post('/register', (req, res) => {
    const data = req.body
    queries.register(req, res, data)
})


router.post('/login', (req, res) => {
    const data = req.body
    queries.login(req, res, data)
})

module.exports = router