const pool = require("../../config/db");

class Bookmark {
    constructor(id, movieid, userid, createdat, updatedat, movie) {
        this.id = id
        this.movieid = movieid
        this.userid = userid
        this.createdat = createdat
        this.updatedat = updatedat
        this.movie = movie
    }

    static async findMine(userid) {
        const { rows } = await pool.query(`
            SELECT 
                m.id as movie_id, m.synopsis as movie_synopsis, m.trailerurl as movie_trailerurl, m.imgurl as movie_imgurl, m.rating as movie_rating, m.status as movie_status, m.updatedat as movie_updatedat, m.createdat as movie_createdat, m.title as movie_title,
                b.id as bookmark_id, b.createdat as bookmark_createdat, b.updatedat as bookmark_updatedat
            FROM bookmarks b 
            JOIN movies m on m.id  = b.movieid 
            WHERE b.userid = $1`, [userid])
        const data = rows.map((dt) => {
            const movie = {
                id: dt.movie_id,
                title: dt.movie_title,
                synopsis: dt.movie_synopsis,
                trailerUrl: dt.movie_trailerurl,
                imgUrl: dt.movie_imgurl,
                rating: dt.movie_rating,
                status: dt.movie_status,
                createdat: dt.movie_createdat,
                updatedat: dt.movie_updatedat,
            };

            return new Bookmark(dt.bookmark_id, dt.movie_id, userid, dt.bookmark_createdat, dt.bookmark_updatedat, movie)
        });
        return data
    }

    static async findAvaiability({userid,movieid}) {
        const { rows } = await pool.query(`SELECT 1 FROM "bookmarks" WHERE userid = $1 AND movieid = $2`, [userid,movieid])
        return rows.length > 0 ? false : true
    }

    static async create({ movieid, userid }) {
        const query = `
            INSERT INTO "bookmarks" 
                ("movieid", "userid", "createdat")
            VALUES
                ($1, $2, NOW())
            RETURNING *
            `;
    
        const { rows } = await pool.query(query, [
            movieid, userid])
        const newData = rows[0]
        return new Bookmark(
            newData.id,
            newData.movieid,
            newData.userid,
        );
    }
}

module.exports = Bookmark