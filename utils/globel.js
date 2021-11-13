const msgdb = require('../core/msg')
class globel {
  session=''
  KEY_WORDS = ['HL','黄历']
  bearer = ''
  refresh_token = ''
  ACTION = {
    SEND_GROUP_MSG:'send_group_msg'
  }
  getAction() {
    return this.ACTION
  }
  getKeyWords() {
    return this.KEY_WORDS
  }
  getSession() {
    return this.session;
  }
  setSession(args) {
    this.session = args
  }
 freshBearerFromDb(callback){
  let Datastore = require('nedb')
  let msgDb  =  new Datastore('msg.db')
  msgDb.loadDatabase()
  msgDb.find({'type':'config'},(err,docs)=>{
    if (docs !== null && docs.length !== 0) {
      console.info(docs[0])
      this.bearer = docs[0].bearer
    }
  })
  callback()
  }
  setBearer(args){
    this.bearer = args
  }
  getRefreshToken(){
    return this.refresh_token
  }
}

const g = new globel()
module.exports = g