const Bookmark = require("./model")
const Movie = require("../movie/model")

exports.get_bookmark = async (req, res, next) => {
    try {
        const userid = req.user.id         
        const data = await Bookmark.findMine(userid)

        res.status(data.length == 0 ? 404 : 200).json(data.length == 0 ? {message:"Movie not found"} : data)
    } catch (err) {
        res.status(500).send({
            error: 'Failed',
            message: 'Internal Server Error'+err
        })
    }
}

exports.add_bookmark = async (req, res, movieid) => {
    try {
        const userid = req.user.id   
        const is_movie_exist = await Movie.findExist(movieid)
        if(is_movie_exist.found){
            const is_avaiability = await Bookmark.findAvaiability({userid,movieid})
   
            if(is_avaiability){
                const data = await Bookmark.create({movieid,userid})
                res.status(200).json({
                    ...data,                   
                    movieId: movieid,
                    movieTitle: is_movie_exist.title
                })
            } else {
                res.status(422).json({message:"Already in bookmark"})
            }
        } else {
            res.status(404).json({message:"Movie not found"})
        }
    } catch (err) {
        res.status(500).send({
            error: 'Failed',
            message: 'Internal Server Error'
        })
    }
}