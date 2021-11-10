let Datastore = require('nedb')
db = {}
// async function init(){
//     console.info('MsgDao init')
//     db.msg =  new Datastore('msg.db')
//     await db.msg.loadDatabase()
//   }

// {
//   "action":"send_group_msg",
//   "params":{
//   "group_id":groupId,
//   "message":"未找到"
//   }
//  }
class MsgParamBuilder{
  mp = {}
  constructor(){
    let mp = {
      "group_id":0,
      "message":""
    }
    this.mp = mp
  }
  
  setGroupId(groupId){
    this.mp.group_id = groupId
    return this  
  }
  setMessage(msg){
    this.mp.message = msg
    return this
  }
  getMp(){
    return this.mp
  }
}
class MessageBuilder{
  mb = {}
  msg = {}
  constructor(){
   let msg=
      {
        "action":"",
        "params":{
        "group_id":0,
        "message":""
        }
      }
      this.msg = msg
  }
  
      getMsg (){
        return this.msg
      }
  setAction(action){
    this.msg.action = action
    return this
    } 

  setParam(param){
    this.msg.params=param.getMp()
    return this
  }

}
 function sendGroupMessage(ws,msg){
   ws.send(msg)
  return
}
msgBuilder = new MessageBuilder()
msgParamBuilder = new MsgParamBuilder()
module.exports = {
 msgBuilder,msgParamBuilder,sendGroupMessage
}