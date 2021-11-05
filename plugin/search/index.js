const g = require('../../utils/globel')
const service = require('./service')
const KEY_WORDS = g.getKeyWords()
module.exports = options => {
  return async ({ data, ws, http }) => {
    // TODO:
    console.info(data)
    if (!data.data.messageChain) {
      return
    }
    
    //console.info(data.data)
    const message = data?.data?.messageChain[1]?.text?.toUpperCase().trim()
    if (KEY_WORDS.includes(message)) {
      console.info(message +'is in KEY_WORDS list')
      return
    }
    console.info('common word :'+message)
    if (data.data.type === 'GroupMessage') {
      // if(data?.data?.messageChain[1]?.type ==='At'){
      //   let sendMsgData = 
      //             {
      //       "syncId": 111,                   
      //       "command": "sendGroupMessage",  
      //       "subCommand": null,             
      //       "content":  {
      //                   "sessionKey":g.getSession,
      //                   "target":513299206,
      //                   "quote":data?.data?.messageChain[0]?.id,
      //                   "messageChain":[
      //                     { "type":"Plain", "text": '喵喵酱被@了···'},
      //                   ]
      //                 }
      //     }
      //     if(data?.data?.messageChain[1]?.target === 2329692460 ){
      //       ws.send(sendMsgData)
      //       return
      //     }
        
      // }
      let hl =   await service.getAIReply();
      
      // if(data?.data?.messageChain[1]?.type === 'Image'){
      //   let imgResult = await service.getImageCheckResult(data.data.messageChain[1].url);
      //   if(imgResult !== "合规"){
      //     let recallData = {
      //       "syncId": 111,                   
      //       "command": "recall",  
      //       "subCommand": null,             
      //       "content":  {
      //                   "sessionKey":g.getSession,
      //                   "target":data.data.messageChain[0].id,
      //                 }
      //     }
      //     ws.send(recallData)
      //   }
        
      //   let sendMsgData = 
      //       {
      //       "syncId": 111,                   
      //       "command": "sendGroupMessage",  
      //       "subCommand": null,             
      //       "content":  {
      //                   "sessionKey":g.getSession,
      //                   "target":513299206,
      //                   "messageChain":[
      //                     { "type":"Plain", "text": "图片色情程度："+imgResult},
      //                   ]
      //                 }
      //     }
      //   ws.send(sendMsgData)
      //   return
      // }
      let sendMsgData = 
                  {
            "syncId": 111,                   
            "command": "sendGroupMessage",  
            "subCommand": null,             
            "content":  {
                        "sessionKey":g.getSession,
                        "target":513299206,
                        "messageChain":[
                          { "type":"Plain", "text": hl},
                        ]
                      }
          }
       // ws.send(sendMsgData)
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
        //ws.send(sendMsgData)
        return
    }
  }
}