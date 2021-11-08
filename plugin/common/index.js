const g = require('../../utils/globel')
const service = require('./service')
const KEY_WORDS = g.getKeyWords()
module.exports = options => {
  return async ({ data, ws, http }) => {
    // TODO:
    console.info(data)
    if (!data) {
      return
    }
  }
}