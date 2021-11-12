const config = require('../../config')
const g = require('../../utils/globel')
const service = require('./service')
const KEY_WORDS = g.getKeyWords()
const ACTION = g.getAction()
const {msgBuilder,msgParamBuilder,sendGroupMessage} = require('../../core/sendService')
module.exports = options => {
  return async ({ data, ws, http }) => {
    // TODO:
    // console.info(data)
    if (!data) {
      return
    }
    if (data.message_type === 'group') {
      let groupId = data.group_id
      if(data.message.indexOf("[CQ:at,qq="+config.bot_qq+']') !== -1){
        let msg = msgBuilder.setAction(ACTION.SEND_GROUP_MSG).setParam(msgParamBuilder.setGroupId(groupId).setMessage('喵喵酱被@了')).getMsg()
        ws.send(msg)
        return
      }else if(data.message.search("喵喵酱咬他") !==-1 && data.message.indexOf("[CQ:at,qq=") !== -1){
       // let mp =msgParamBuilder.setGroupId(data.group_id).setMessage('本条信息使用Builder构建')
       // 这里可能存在一点问题
       let random = Math.random()
       let msg = data.message
       var p1 = /[CQ:at,qq=[0-9]*]/
       let qq = data.message.replace(msg.replace(p1,""),"")
       console.info(qq)
       
       let m = msgBuilder.setAction(ACTION.SEND_GROUP_MSG).setParam(msgParamBuilder.setGroupId(data.group_id).setMessage(qq+' 的味道还真是······（'+random))
        // console.info(JSON.stringify(m.getMsg()))
        ws.send(m.getMsg())
        return
      }
      }
  }
}