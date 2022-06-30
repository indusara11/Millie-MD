let { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys')
let levelling = require('../lib/levelling')
let fs = require('fs')
let path = require('path')
let { createHash} = require('crypto')
let { perfomance } = require('perf_hooks')
const os = require('os')
let moment = require('moment-timezone')
const { default: Users } = require('node-os-utils/lib/users')
const defaultMenu = {
  before: `╭────────────────╮
          ✪  *αʂιαƚα* ✪           
╰────────────────╯
     
`.trimStart(),
header: '┌─〔 %category 〕',
body: '├ %cmd',
footer: '└────\n',
after: ``,
}

let handler = async (m, { conn, usedPrefix: _p,command, args }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'anime', 'update', 'maker', 'edukasi', 'news', 'random', 'game', 'xp', 'islamic', 'stiker', 'rpg', 'kerangajaib', 'quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'vote', 'nsfw', 'audio', 'jadibot', 'info', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
      'main': 'ᴍᴀɪɴ', 
      'anime': 'ᴀɴɪᴍᴇ', 
      'group': 'ɢʀᴏᴜᴘ',
      'anonymous': 'ᴀɴᴏɴʏᴍᴏᴜs ᴄʜᴀᴛ', 
      'audio': 'ᴠᴏɪᴄᴇ ᴄʜᴀɴɢᴇʀ', 
      'downloader': 'ᴅᴏᴡɴʟᴏᴀᴅᴇʀ',
      'fun': 'ғᴜɴ',
      'game': 'ɢᴀᴍᴇ',
      'xp': 'ᴇxᴘ & ʟɪᴍɪᴛ',
      'info': 'ɪɴғᴏ',
      'internet': 'ɪɴᴛᴇʀɴᴇᴛ',
      'news': 'ɴᴇᴡs', 
      'nulis': 'ᴡʀɪᴛᴇ & ʟᴏɢᴏ',
      'premium': 'ᴘʀᴇᴍɪᴜᴍ', 
      'random': 'ʀᴀɴᴅᴏᴍ',
      'sticker': 'sᴛɪᴄᴋᴇʀ',
      'tools': 'ᴛᴏᴏʟs',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Rpg'
  }
  if (teks == 'education') tags = {
    'edukasi': 'Education'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'random') tags = {
    'random': 'Random'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'group') tags = {
    'group': 'Group'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo',
    'maker': 'Foto & Video Maker'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
 if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'update') tags = {
    'update': 'Update'
  }
 

  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { level, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = await registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const w = new Date();
    let week = weekday[w.getDay()];
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let who = m.sender
         
let aoa = ` 🕺සියලුම විධාන මෙහි ඇත🇱🇰🏅 `.trim()
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  })
    if (teks == '404') {
        const template = generateWAMessageFromContent(m.key.remoteJid, proto.Message.fromObject({
        listMessage: {
            title: `Hi ${ucapan()}`,
            description: aoa,
            buttonText: 'sᴇʟᴇᴄᴛ ᴍᴇɴᴜ',
            listType: 1,
            footerText:wm,
            mtype: 'listMessage',
            sections: [
              {
                "rows": [
                  {
                    "title": `αѕιαтα🇱🇰`,
                    "description": "𝚠𝚘𝚛𝚕𝚍 𝚋𝚎𝚜𝚝 𝚋𝚘𝚝🥀",
                    "rowId": ".git"
                  },
                  {
                    "title": "ѕтι¢кєя💃",
                    "description": "𝚖𝚊𝚔𝚎 𝚝𝚘 𝚜𝚝𝚒𝚌𝚔𝚎𝚛𝚜🥀",
                    "rowId": ".lst stiker"
                  },
                   {
                    "title": "χρ💃",
                    "description": "𝚐𝚎𝚝 𝚡𝚙 𝚖𝚎𝚗𝚞🥀",
                    "rowId": ".lst xp"
  
                  },  {
                    "title": "νι∂єσ мα¢кєя💃",
                    "description": "𝚖𝚊𝚗𝚢 𝚟𝚒𝚍𝚎𝚘 𝚎𝚍𝚒𝚝𝚝𝚒𝚗𝚐 𝚝𝚘𝚘𝚕𝚜 𝚊𝚝 𝚑𝚎𝚛𝚎🥀",
                    "rowId": ".lst videomaker"
  
                  }, { 
                  "title": "αηιмє💃",
                  "description": "𝚖𝚊𝚔𝚎 𝚝𝚘 𝚊𝚗𝚒𝚖𝚜🥀",
                  "rowId": ".lst anime"
                },  {
                    "title": "qσυтєѕ💃",
                    "description": "𝚚𝚘𝚞𝚝𝚎𝚜🥀",
                    "rowId": ".lst quote"
                  }, {
                    "title": "gяσυρ💃",
                    "description": "𝚐𝚛𝚘𝚞𝚙𝚜 𝚙𝚊𝚗𝚗𝚎𝚕🥀",
                    "rowId": ".lst grup"
                  }, {
                    "title": "ρяємιυм🏅",
                    "description": "𝚐𝚎𝚝 𝚝𝚘 𝚊𝚜𝚒𝚊𝚝𝚊 𝚙𝚛𝚒𝚖𝚒𝚞𝚖🥀",
                    "rowId": ".lst premium"
                  }, {
                    "title": "ιηтєяηєт💃",
                    "description": "𝚒𝚗𝚝𝚎𝚛𝚗𝚎𝚝 𝚠𝚘𝚛𝚔𝚜🥀",
                    "rowId": ".lst internet"
                  }, {
                    "title": "αησηумσυѕ🕺",
                    "description": "𝚌𝚑𝚊𝚝 𝚠𝚒𝚝𝚑 𝚊𝚗𝚘𝚗🥀",
                    "rowId": ".lst anonymous"
                  }, {
                    "title": "мαgι¢ ѕнєℓℓ💃",
                    "description": "𝚠𝚘𝚗𝚍𝚎𝚛𝚏𝚞𝚕 𝚖𝚊𝚐𝚒𝚌𝚜🥀",
                    "rowId": ".lst magicshell"
                  }, {
                    "title": "ωяιтє αη∂ ℓσgσ💃",
                    "description": "𝚖𝚊𝚔𝚎 𝚕𝚘𝚐𝚘𝚎𝚜🥀",
                    "rowId": ".lst nulis"
                  }, {
                    "title": "∂σωηℓσα∂єя🥀",
                    "description": "𝚊𝚕𝚕 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚎𝚛 𝚖𝚊𝚗𝚞🥀",
                    "rowId": ".lst downloader"
                  }, {
                    "title": "тσσℓѕ💃",
                    "description": "𝚎𝚟𝚎𝚛𝚢 𝚝𝚘𝚘𝚕𝚜 𝚑𝚎𝚛𝚎🥀",
                    "rowId": ".lst tools"
                  }, {
                    "title": "αυ∂ισ є∂ιтσя💃",
                    "description": "𝚊𝚞𝚍𝚒𝚘 𝚎𝚍𝚍𝚒𝚝𝚒𝚗𝚐 𝚝𝚘𝚘𝚕𝚜 𝚊𝚝 𝚑𝚎𝚛𝚎🥀",
                    "rowId": `.lst audio`
                  }, {
                    "title": "ƒυη💃",
                    "description": "𝚎𝚗𝚓𝚘𝚢 𝚠𝚒𝚝𝚑 𝚞𝚜🥀",
                    "rowId": ".lst fun"
                  },
                  {
                    "title": "gαмєѕ💃",
                    "description": "𝚜𝚒𝚖𝚙𝚕𝚎 𝚐𝚊𝚖𝚎𝚜 𝚊𝚝 𝚑𝚎𝚛𝚎🥀",
                    "rowId": ".lst game"
  
                  }, {
                    "title": "∂αтαвαѕє💃",
                    "description": "𝚊𝚜𝚒𝚊𝚝𝚊 𝚍𝚊𝚝𝚊𝚋𝚊𝚜𝚎🥀",
                    "rowId": ".lst database"
                  },{
                    "title": "σωηєя💃",
                    "description": "𝚖𝚛.𝚜𝚊𝚗𝚘𝚗(𝚃𝙷𝙸𝚂𝙰𝙽)",
                    "rowId": ".lst owner"
                  }, {
                    "title": "α∂мιη💃",
                    "description": "𝚊𝚍𝚖𝚒𝚗 𝚙𝚊𝚗𝚗𝚎𝚕🥀",
                    "rowId": ".lst admin"
                  }
                ]
              }
            ], "contextInfo": {
              "stanzaId": m.key.id,
              "participant": m.sender,
              "quotedMessage": m.message
            }
    }}
    ),
    { userJid: m.participant || m.key.remoteJid, quoted: m });
    return await conn.relayMessage(
        m.key.remoteJid,
        template.message,
        { messageId: template.key.id , mentions:[`${owner[0]}@s.whatsapp.net`] }
    ,m)
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Presented by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        ...Object.keys(tags).map(tag => {
          return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                  .replace(/%islimit/g, menu.limit ? `Ⓛ` : '')
                  .replace(/%isPremium/g, menu.premium ? `Ⓟ` : '')
                  .trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        }),
        after
      ].join('\n')
      text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name,
      ucapan: ucapan(),
      name, weton, week, date, time,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
  await conn.sendTBI2(m.chat, text.trim(), wm,thumburl,`sᴏᴜʀᴄᴇ ᴄᴏᴅᴇ `, `https://github.com/mrsanon`, `ᴏᴡɴᴇʀ`, `${_p}owner`, `ᴀʟʟ ᴄᴏᴍᴍᴀɴᴅs`, `.lst all`,m)
 
}catch(e){
  conn.reply(m.chat,`${e}`)
  conn.reply('120363022211098165@g.us',`𝗨𝗵𝗼𝗵! 𝗮𝗻 𝗲𝗿𝗿𝗼𝗿 𝗢𝗰𝗰𝘂𝗿𝗲𝗱 

𝗘𝗿𝗿𝗼𝗿 : ${util.format(e)}

  𝗖𝗼𝗺𝗺𝗮𝗻𝗱 : ${usedPrefix+command}
  
  𝗣𝗼𝘀𝘀𝗶𝗯𝗹𝗲 𝗥𝗲𝗮𝘀𝗼𝗻𝘀 :
     • 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝘀𝗮𝗴𝗲 𝗢𝗳 𝗖𝗼𝗺𝗺𝗮𝗻𝗱
     • 𝗦𝗲𝗿𝘃𝗲𝗿 𝗘𝗿𝗿𝗼𝗿
     • 𝗥𝘂𝗻𝘁𝗶𝗺𝗲 𝗘𝗿𝗿𝗼𝗿𝘀
     • 𝗘𝗿𝗿𝗼𝗿 𝗮𝘁 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿𝘀 𝗘𝗻𝗱
     • 𝗗𝗮𝘁𝗮 𝗡𝗲𝘁𝘄𝗼𝗿𝗸 𝗜𝘀𝘀𝘂𝗲𝘀 `, null, {})
}
}
handler.command = /^(lst)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null


module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Colombo').format('HH')
  res = "ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ  sʟᴇᴇᴘ ʟᴜᴠ ᴜ<3"
  if (time >= 4) {
    res = "ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ🥀"
  }
  if (time > 10) {
    res = "ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ🕊️"
  }
  if (time >= 15) {
    res = "ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ🕺"
  }
  if (time >= 21) {
    res = "ɢᴏᴏᴅ ɴɪɢʜᴛ💫"
  }
  return res
}
