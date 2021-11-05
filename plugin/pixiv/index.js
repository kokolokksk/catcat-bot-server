const config = require('../../config')
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
      // handle pixiv words
      let groupId = data.data.sender.group.id
      let url = "https://pixiv.cat/";
      if(message?.search('PIXIV') !== -1 &&message?.charAt(0)==="P"){
        let sendMsgData = {}
        if(message?.search('S') !== -1){
          // https://app-api.pixiv.net/v1/search/illust?word=1
          let key = message?.slice(8,message.length);
          let bearer = g.getBearer()
          let pixivID = await service.getSearch(encodeURI(key),bearer)
          console.info(pixivID)
          if(pixivID == 'undfined' || pixivID ==undefined){
            sendMsgData = 
                      {
                "syncId": 111,                   
                "command": "sendGroupMessage",  
                "subCommand": null,             
                "content":  {
                            "sessionKey":g.getSession,
                            "target":groupId,
                            "messageChain":[
                              { "type":"Plain", "text": '未找到'},
                            ]
                          }
              }
          }else{
            url += pixivID+".jpg"
            sendMsgData = 
                      {
                "syncId": 111,                   
                "command": "sendGroupMessage",  
                "subCommand": null,             
                "content":  {
                            "sessionKey":g.getSession,
                            "target":groupId,
                            "messageChain":[
                              { "type":"Image", "url": url},
                            ]
                          }
              }
          }
          
        }else{
          let pid = message.slice(6,message.length)
           
            url += pid+".jpg"
            sendMsgData = 
                      {
                "syncId": 111,                   
                "command": "sendGroupMessage",  
                "subCommand": null,             
                "content":  {
                            "sessionKey":g.getSession,
                            "target":groupId,
                            "messageChain":[
                              { "type":"Image", "url": url},
                            ]
                          }
              }
           
          }
        ws.send(sendMsgData)  
        return
      }
      if(message?.search('GETTOKEN') !==-1 &&message?.charAt(0)==="G" && data?.data?.sender.id == config.defualt_admin_qq){
        let bearer = await service.getBearer(config.refresh_token)
        g.setBearer(bearer)
        console.info(bearer)
        let sendMsgData = {}
        sendMsgData = 
                    {
              "syncId": 111,                   
              "command": "sendGroupMessage",  
              "subCommand": null,             
              "content":  {
                          "sessionKey":g.getSession,
                          "target":groupId,
                          "messageChain":[
                            { "type":"Plain", "text": 'token已刷新'},
                          ]
                        }
            }
        ws.send(sendMsgData)
        return
      } 
      let hl =   {};
       
      let sendMsgData = 
                  {
            "syncId": 111,                   
            "command": "sendGroupMessage",  
            "subCommand": null,             
            "content":  {
                        "sessionKey":g.getSession,
                        "target":513299206,
                        "messageChain":[
                          { "type":"Image", "url": url},
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