module.exports = {
  bot: {
    http: 'http://ip:port',
    ws: 'ws://ip:port/?access_token=1'
  },
  refresh_token:'1',
  defualt_admin_qq:'1',
  plugin: {
    // './plugin/almanac':{},
    './plugin/common':{},
    './plugin/pixiv':{}
    }
}
