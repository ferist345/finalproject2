const express = require('express')
const app = express()

function getRoute(){
    const routerMovie = require('./modules/movie/http_handler')    
    const routerAuth = require('./modules/auth/http_handler')    
    const routerBookmark = require('./modules/bookmark/http_handler')    

    app.use(routerMovie)
    app.use(routerAuth)
    app.use(routerBookmark)

    return app
}

module.exports = getRoute