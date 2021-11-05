const axios =require('axios')
const iconv = require('iconv-lite')
const qs = require('qs')
async function getInfo(date = new Date()) {
 
}


async function getImageCheckResult(imageUrl){
  const {data} = await axios({
    responseType:'arraybuffer',
    url:'https://aip.baidubce.com/rest/2.0/solution/v1/img_censor/v2/user_defined?access_token=ak',
   
    
    data:qs.stringify({
      imgUrl:imageUrl,
      imgType:0
    }),
    method:'post',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
    }
  })
  let datax=  JSON.parse(iconv.decode(data, 'utf-8'))
  console.info(datax.conclusion)
  return datax.conclusion
}

async function getDetail() {
  const info = await getInfo()
  return 
}

async function getAIReply() {
  return '...'
}

module.exports = {
  getDetail,getAIReply,getImageCheckResult
}
