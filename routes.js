// Middlewares
const bodyParser = require('body-parser')
const { getPlayers, getPlayer } = require('./controllers/players')
const { getListName, mostCommonFirstName, mostCommonLastName, topUnique, generateUnique } = require('./controllers/names')

module.exports = (app) => {
  // Body Parser middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Players
  app.get('/players', getPlayers)
  app.get('/player/:playerId', getPlayer)
  // Name
  app.get('/name-list', getListName)
  app.get('/most-common-first-name', mostCommonFirstName)
  app.get('/most-common-last-name', mostCommonLastName)
  app.get('/top-25-unique', topUnique)
  app.get('/generate-25-unique', generateUnique)
}
