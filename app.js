/* eslint-disable new-cap */
const express = require('express')
const cors = require('cors')
const mountRoutes = require('./routes')
const app = express()

// Allow CORS
app.use(cors())

// Router logic, see './routes/index.js'
mountRoutes(app)

// 404 Not Found handler
app.use((req, res) => {
  res.status(404).json({ errCode: 4404, errMsg: 'Not Found' })
})
// Set port
app.set('port', '3000')

// Listen for requestss
const server = app.listen(app.get('port'), () => {
  const serverPort = server.address().port
  console.log(`Server running on port ${serverPort}`)
})

module.exports = server
