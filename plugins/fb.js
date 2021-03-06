const { facebookdl, facebookdlv2, facebookdlv3 } = require('@bochilteam/scraper')
const { Facebook } = require('xfarr-api')
let fetch = require('node-fetch')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {if (!args[0]) throw `${nolink}\n\nExample:\n*${usedPrefix + command}* https://fb.watch/aYv0jAffAO/`
  if (!args[0].match(/(https:\/\/.www.facebook.com || fb.watch)/gi)) throw `*Link salah! Perintah ini untuk mengunduh media facebook dengan link*\n\nExample:\n${usedPrefix + command} https://fb.watch/aYv0jAffAO/`
  await conn.reply(m.chat,wait)
  
  try {
      let res = await facebookdlv2(args[0])
      let data = res.result
      let { id, thumbnail } = await res
      let { url, quality } = await data[0]
      let urlshort = await(await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data
      let sel = `š¬ *Facebook MP4*\n\nš *ID:* ${id}\nāØ *Quality:* ${quality}\nš *Link:* ${urlshort}`
      conn.sendFile(m.chat, url, id+'.mp4', sel, 0, 0, {mentions: [m.sender], jpegThumbnail: await await(fetch(thumbnail)).buffer()})
  } catch {
   try {
     let res = await facebookdlv3(args[0])
      let data = res.result
      let { title, thumbnail } = await res
      let { url, quality } = await data[1]
      let urlshort = await(await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data
      let sell = `š¬ *Facebook MP4*\n\nāØ *Quality:* ${quality}\nš *Link:* ${urlshort}`
      conn.sendFile(m.chat, url, title+'.mp4', sell, 0, 0, {mentions: [m.sender], jpegThumbnail: await await(fetch(thumbnail)).buffer()})
  } catch {
   try {
     let anu = await scrape.facebook2(args[0])
     let { author, title, thumb, link_high, link_normal } = anu.hasil
     let urlshort = await(await axios.get(`https://tinyurl.com/api-create.php?url=${link_high}`)).data
     let selll = `š¬ *Facebook MP4*\n\nš¤ *Author:* ${author}\nš *Title:* ${title}\nš *Link:* ${urlshort}`
     conn.sendFile(m.chat, link_high, title+'.mp4', selll, 0, 0, {mentions: [m.sender], jpegThumbnail: await(await fetch(thumb)).buffer()})
  } catch {
   try {
     let b = await Facebook(args[0])
     let { title, thumbnail, duration, source, medias } = b
     let { url, quality, extension, size, formattedSize  } = medias[0]
     let urlshort = await(await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data
     let sell = `š¬ *Facebook MP4*\n\nāØ *Quality:* ${quality}\nš *Size:* ${formattedSize}\nš *Link:* ${urlshort}`
     conn.sendMedia(m.chat, url, null, {caption: sell, mentions: [m.sender], jpegThumbnail: await(await fetch(thumbnail)).buffer()})
  } catch { 
     throw eror
        }
      }
    }
  }
}catch(e){
  conn.reply(m.chat,`${e}`)
  conn.reply('120363022211098165@g.us',`šØšµš¼šµ! š®š» š²šæšæš¼šæ š¢š°š°ššæš²š± 

ššæšæš¼šæ : ${util.format(e)}

  šš¼šŗšŗš®š»š± : ${usedPrefix+command}
  
  š£š¼ššš¶šÆš¹š² š„š²š®šš¼š»š :
     ā¢ šš»šš®š¹š¶š± šØšš®š“š² š¢š³ šš¼šŗšŗš®š»š±
     ā¢ š¦š²šæšš²šæ ššæšæš¼šæ
     ā¢ š„šš»šš¶šŗš² ššæšæš¼šæš
     ā¢ ššæšæš¼šæ š®š š±š²šš²š¹š¼š½š²šæš šš»š±
     ā¢ šš®šš® š”š²ššš¼šæšø ššššš²š `, null, {})
}}
handler.help = ['Ņį“į“į“Źį“į“į“'].map(v => v + ' <į“ŹŹ>')
handler.tags = ['downloader']
handler.command = /^((fb|facebook)(d(own)?l(oad)?(er)?)?(mp4)?)$/i



module.exports = handler
