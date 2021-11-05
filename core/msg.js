let Datastore = require('nedb')
db = {}
async function init(){
    console.info('MsgDao init')
    db.msg =  new Datastore('msg.db')
    await db.msg.loadDatabase()
  }

function insertMsg(msg){
 // console.info(db)
  db.msg.find(msg,function (err,docs) {
    if(docs.length == 0){
      db.msg.insert(msg,function(err) {
        console.error(err)
      })
    }else{
     // console.info(docs[0])
    }
  })
}

function findMsg(msg){
  db.msg.find(msg, function (err, docs) {
    console.info(docs)
  });
}

module.exports = {
  init,insertMsg,findMsg
}