const { wrapper } = require('../tools/funcWrapper')
const axios = require('axios')
const options = {
  method: 'GET',
  url: `https://alivebyacadomia.github.io/headtohead.json`
}

module.exports.getPlayers = async (req, res) => {
  const ret = await wrapper(axios(options))
  if (ret.error) {
    return res.status(405).json(ret.error.response.data)
  }
  let listPlayers = ret.data.data.players
  listPlayers = listPlayers.sort((pla, plb) => {
    if (pla.id > plb.id) {
      return 1
    } else if (plb.id > pla.id) {
      return -1
    }
    return 0
  })
  res.send(listPlayers)
}

module.exports.getPlayer = async (req, res) => {
  const playerId = parseInt(req.params.playerId)
  if (!playerId) return res.status(405).json('no id was found')
  const ret = await wrapper(axios(options))
  if (ret.error) {
    return res.status(405).json(ret.error.response.data)
  }
  let Player = ret.data.data.players.find(player => player.id === playerId)
  console.log(Player)
  if (Player) res.send(Player)
  else res.send('no player found')
}
