const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

// Routes
const getRoute = require('./router')
const routerMovie = getRoute() 
app.use(routerMovie)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})