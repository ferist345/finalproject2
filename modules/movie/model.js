const pool = require("../../config/db");

class Movie {
    constructor(id, synopsis, trailerurl, imgurl, rating, status, createdat, updatedat) {
        this.id = id
        this.synopsis = synopsis
        this.trailerurl = trailerurl
        this.imgurl = imgurl
        this.rating = rating
        this.status = status
        this.createdat = createdat
        this.updatedat = updatedat
    }

    static async findAll() {
        const { rows } = await pool.query(`SELECT * FROM "movies"`)
        const data = rows.map((dt) => {
            const { id, synopsis, trailerurl, imgurl, rating, status, createdat, updatedat } = dt
            return new Movie(id, synopsis, trailerurl, imgurl, rating, status, createdat, updatedat)
        });
        return data
    }

    static async findExist(id) {
        const { rows } = await pool.query(`SELECT title FROM "movies" WHERE id = $1 LIMIT 1`,[id])
        if(rows.length > 0){
            return {
                title:rows[0].title,
                found:true
            }
        } else {
            return {
                title:null,
                found:false
            }
        }
    }
}

module.exports = Movie