require("./module")

global.owner = "628388072690"
global.namabot = "MBB-BOT"
global.namaCreator = "YT MBB 11"
global.autoJoin = false
global.antilink = false
global.codeInvite = "Hit7mmitgEQJ5f83Gyeenx"
global.domain = '' // Isi Domain Lu
global.apikey = '' // Isi Apikey Plta Lu
global.capikey = '' // Isi Apikey Pltc Lu
global.eggsnya = '15' // id eggs yang dipakai
global.location = '1' // id location
global.tekspushkon = ""
global.tekspushkonv2 = ""
global.packname = ""
global.author = "Sticker By YT THOMVELZ"
global.jumlah = "5"

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})