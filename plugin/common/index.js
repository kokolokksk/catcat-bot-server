const config = require('../../config')
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
    if (data.message_type === 'group') {
      let groupId = data.group_id
      let sendMsgData = {
        "action":"send_group_msg",
        "params":{
         "group_id":0,
        "message":''
        }
      }
      sendMsgData.params.group_id = groupId
      if(data.message.indexOf("[CQ:at,qq="+config.bot_qq+']') !== -1){
        sendMsgData.params.message = '喵喵酱被@了'
      }
      if(sendMsgData.params.message !== ''){
        ws.send(sendMsgData)
      }
      return
      }
  }
}