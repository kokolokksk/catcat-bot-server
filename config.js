module.exports = {
  bot: {
    http: 'http://loveloliii.monster:8080',
    ws: 'ws://loveloliii.monster:8080/message?verifyKey=1&qq=1'
  },
  refresh_token:'1',
  defualt_admin_qq:'1',
  plugin: {
    // './plugin/almanac':{},
    './plugin/common':{},
    './plugin/pixiv':{}
    }
}