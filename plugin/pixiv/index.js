const config = require('../../config')
const g = require('../../utils/globel')
const service = require('./service')
const KEY_WORDS = g.getKeyWords()
const msg = require('../../core/msg')


// {
//   "anonymous": null,
//   "font": 0,
//   "group_id": 716692626,
//   "message": "[CQ:reply,id=461003250][CQ:at,qq=2329692460]博士为什么要说这种话，阿米娅要生气了！[CQ:face,id=67]（33%）",
//   "message_id": -2061579183,
//   "message_seq": 3974,
//   "message_type": "group",
//   "post_type": "message",
//   "raw_message": "[CQ:reply,id=461003250][CQ:at,qq=2329692460]博士为什么要说这种话，阿米娅要生气了！[CQ:face,id=67]（33%）",
//   "self_id": 2329692460,
//   "sender": {
//       "age": 0,
//       "area": "",
//       "card": "",
//       "level": "",
//       "nickname": "Mreo家的兔兔",
//       "role": "member",
//       "sex": "unknown",
//       "title": "",
//       "user_id": 1982751087
//   },
//   "sub_type": "normal",
//   "time": 1636351845,
//   "user_id": 1982751087
// }

module.exports = options => {
  return async ({ data, ws, http }) => {
    // TODO:
    console.info(data)
    if (!data) {
      return 
    }
    
    //console.info(data.data)
    const message = data?.message?.toUpperCase().trim()
    if (KEY_WORDS.includes(message)) {
      console.info(message +'is in KEY_WORDS list')
      return
    }
    console.info('common word :'+message)
    if (data.message_type === 'group') {
      // handle pixiv words
      let groupId = data.group_id
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
                    "action":"send_group_msg",
                    "params":{
                    "group_id":groupId,
                    "message":"未找到"
                    }
                   }
          }else{
            url += pixivID+".jpg"
            sendMsgData = 
            {
              "action":"send_group_msg",
              "params":{
              "group_id":groupId,
              "message":'[CQ:at,qq='+data.sender.user_id+'] illust_id='+pixivID+' [CQ:image,file='+pixivID+'.jpg,url='+url+']'
              }
             }
          }
          
        }else if(message?.search('R') !== -1){
            let url = message?.slice(8,message.length);
            console.info(url)
            let bearer = g.getBearer()
            let pixivIDList = await service.rsshub(url,bearer)
            console.info(pixivIDList)
            if(pixivIDList == 'undfined' || pixivIDList ==undefined){
              sendMsgData = 
                     {
                      "action":"send_group_msg",
                      "params":{
                      "group_id":groupId,
                      "message":"未找到"
                      }
                     }
            }else{
              let catutl  ="https://pixiv.cat/"+ pixivIDList+".jpg"
              sendMsgData = 
              {
                "action":"send_group_msg",
                "params":{
                "group_id":groupId,
                "message":'[CQ:at,qq='+data.sender.user_id+'] illust_id='+pixivIDList+' [CQ:image,file='+pixivIDList+'.jpg,url='+catutl+']'
                }
               }
            }
        }else{
          let pid = message.slice(6,message.length)
           
            url += pid+".jpg"
            sendMsgData = 
            {
              "action":"send_group_msg",
              "params":{
              "group_id":groupId,
              "message":'[CQ:at,qq='+data.sender.user_id+'] illust_id='+pid+' [CQ:image,file='+pid+'.jpg,url='+url+']'
              }
             } 
           
          }
        ws.send(sendMsgData)  
        return
      }
      if(message?.search('GETTOKEN') !==-1 &&message?.charAt(0)==="G" && data?.sender.user_id == config.defualt_admin_qq){
        let bearer = await service.getBearer(config.refresh_token)
        let msgDb = msg.getDb()
        msgDb.find({type:'config'},(err,docs)=>{
          if(docs !== null && docs.length !==0){
            msgDb.update({ _id: docs[0]._id }, { $set: { bearer: bearer } }, {}, function () {
              console.info('update success')
            })
          }else{
            msgDb.insert({type:'config',bearer:bearer},(err,ret)=>{
              if(err!==null){
                console.info(err)
              }
            })
          }
        })
        g.setBearer(bearer)
        console.info(bearer)
        let sendMsgData = {}
        sendMsgData = 
        {
          "action":"send_group_msg",
          "params":{
          "group_id":groupId,
          "message":"token已刷新"
          }
         }
        ws.send(sendMsgData)
        return
      } 
       // ws.send(sendMsgData)
        return
    }
   
  }
}