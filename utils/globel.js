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
  getBearer(){
    return this.bearer
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