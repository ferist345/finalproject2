const router = require('express').Router()
const queries = require('./queries')
const jwtHelper = require('../../middleware/jwt')

router.post('/bookmark/:movieid', [jwtHelper.verifyToken], (req, res) => {
    const movieid = req.params.movieid
    queries.add_bookmark(req, res, movieid)
})

router.get('/mybookmark', [jwtHelper.verifyToken], (req, res) => {
    queries.get_bookmark(req, res)
})

module.exports = router