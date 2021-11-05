const WebSocket = require('ws')
const config = require('../config')

const ws = new WebSocket(config.bot.ws)

module.exports = {
  send(action, params) {
    ws.send(JSON.stringify({ action, params }))
  },
  send(all) {
    ws.send(JSON.stringify(all))
  },
  listen(callback) {
    ws.on('message', data => {
      try {
        callback(JSON.parse(data))
      } catch (e) {
        console.error(e)
      }
    })
    const interval = setInterval(() => {
      console.info('try ping')
      ws.ping((err) => {
          if (err) {
              try {
                  console.log(`ws ping error\n${JSON.stringify(err)}`);
              } catch (error) { }// eslint-disable-line no-empty
          }
      });
  }, 60000);
  }
}