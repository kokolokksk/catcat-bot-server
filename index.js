const g = require('./utils/globel')
const msgdb = require('./core/msg')
const { ws, http } = require('./bot')
const config = require('./config')
const plugins = Object.keys(config.plugin).map(name =>
  require(name)(config.plugin[name] || {})
)
msgdb.init().then(e=>{
  ws.listen(data => {
    if (process.env.NODE_ENV === 'development') {
     // console.log(data)
    }
    //todo get session
    // let msg = eval(data)
    data.uuid = Math.random(1000000)
    msgdb.insertMsg(data)
    // msgdb.findMsg({})
    if(data.meta_event_type !== 'heartbeat' && data?.meta_event_type !== 'lifecycle'){
      plugins.forEach(plugin => plugin({ data, ws, http }))
    }
  })
})
