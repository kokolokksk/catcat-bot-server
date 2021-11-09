const axios =require('axios')
const iconv = require('iconv-lite')
const qs = require('qs')
const parse = require('fast-xml-parser')
async function getInfo(date = new Date()) {
 
}


async function getSearch(key,bearer){
  const {data} = await axios({
    responseType:'arraybuffer',
    url:'https://app-api.pixiv.net/v1/search/illust?merge_plain_keyword_results=true&search_target=partial_match_for_tags&word='+key+'&include_translated_tag_results=true&sort=popular_descinclude_translated_tag_results',
    headers:{
      'Authorization':'Bearer '+bearer,
      'Referer':'http://spapi.pixiv.net/' ,
      'Host':'app-api.pixiv.net',
      'User-Agent':'PixivAndroidApp/5.0.234 (Android 11; Pixel 5)'
    }
  })
  let datax = JSON.parse(iconv.decode(data, 'utf-8'))
  console.info(datax)
  let rodom = 0
  if(eval(datax)?.illusts?.length){
    rodom= parseInt(Math.random()*(eval(datax)?.illusts?.length+1),10)
  }
  return eval(datax)?.illusts[rodom]?.id
}

async function rsshub(url){
  console.info("get pixiv ranking data")
  const {data} = await axios({
    responseType:'arrarybuffer',
    method: 'get',
    url: 'https://rsshub.app/pixiv/ranking/'+url,
    headers:{
      'User-Agent':'PixivAndroidApp/5.0.234 (Android 11; Pixel 5)'
    }
  })
  let datax = parse.parse(iconv.decode(data, 'utf-8'))
  console.info(datax)
}

async function getBearer(refresh_token){
  console.info('get bearer start')
  const {data} = await axios({
    responseType:'arraybuffer',
    method: 'post',
    url:'https://oauth.secure.pixiv.net/auth/token',
    data:qs.stringify({
      "client_id": 'MOBrBDS8blbauoSck0ZfDbtuzpyT',
      "client_secret": 'lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj',
      "grant_type": "refresh_token",
      "include_policy": "true",
      "refresh_token": refresh_token,
    }),
    headers:{
      'User-Agent':'PixivAndroidApp/5.0.234 (Android 11; Pixel 5)',
      'Content-Type':'application/x-www-form-urlencoded'
    }
  })
  let datax = JSON.parse(iconv.decode(data, 'utf-8'))
  console.info(datax)
  return datax.access_token
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
  getSearch,getBearer,rsshub
}
