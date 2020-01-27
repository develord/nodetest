// Middlewares
const bodyParser = require('body-parser')
const { getPlayers, getPlayer } = require('./controllers/players')

module.exports = (app) => {
  // Body Parser middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Players
  app.get('/players', getPlayers)
  app.get('/player/:playerId', getPlayer)
}
