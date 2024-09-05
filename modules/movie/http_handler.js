const router = require('express').Router()
const queries = require('./queries')
const jwtHelper = require('../../middleware/jwt')

router.get('/movies', [jwtHelper.verifyToken], (req, res) => {
    queries.movies(req, res)
})

module.exports = router