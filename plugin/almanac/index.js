const service = require('./service')
const g = require('../../utils/globel')
const WHITE_LIST = ['HL', '黄历']

module.exports = options => {
  return async ({ data, ws, http }) => {
    console.info(data.data.messageChain)
    if (!data.data.messageChain) {
      return
    }
    
    console.info(data.data)
    const message = data?.data?.messageChain[1]?.text.toUpperCase().trim()
    if (!WHITE_LIST.includes(message)) {
        return
    }
  
    if (data.data.type === 'GroupMessage') {
      let hl =   await service.getDetail();
      let sendMsgData = 
                  {
            "syncId": 111,                   
            "command": "sendGroupMessage",  
            "subCommand": null,             
            "content":  {
                        "sessionKey":g.getSession,
                        "target":513299206,
                        "messageChain":[
                          { "type":"Plain", "text": hl[0]?.data?.text},
                        ]
                      }
          }
        ws.send(sendMsgData)
        return
    }
  
    if (data.data.type === 'FriendMessage') {
        console.info("come in fmg")
        let hl =   await service.getDetail();
        console.info(hl)
        let sendMsgData = 
                  {
            "syncId": 111,                   
            "command": "sendFriendMessage",  
            "subCommand": null,             
            "content":  {
                        "sessionKey":g.getSession,
                        "target":data.data.sender.id,
                        "messageChain":[
                          { 
                            "type":"Plain", 
                            "text":hl[0]?.data?.text,
                          },
                        ]
                      }
          }

          // ws.send('send_private_msg', {
          //   user_id: data.user_id,
          //   message: await service.getDetail(),
          // })
        ws.send(sendMsgData)
        return
    }
  }
}