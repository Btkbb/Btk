/*Script Ini Gratis Yah Gengs Bisa Download Di YT gua
CHANEL : BTKboby
Sc ini Di Enc sama Gua Kalo Mau Buy Yang No enc cuman 5k
Ada Juga Sc Cpanel Yang Banyak Menunya Kalo Minat Bisa Hub
NO : 081247140206
SC BY : BTK */

require("./all/global")

const func = require("./all/place")

async function startSesi() {

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)
const { version, isLatest } = await fetchLatestBaileysVersion()

const connectionOptions = {
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ['SC BY THOMZ','Safari','1.0.0'],
auth: state,
version
}

const YtThomz = func.makeWASocket(connectionOptions)

store.bind(YtThomz.ev)

YtThomz.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
YtThomz.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
YtThomz.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await startSesi()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
startSesi()
}
} else if (connection === "connecting") {
start(`1`, `Connecting...`)
} else if (connection === "open") {
success(`1`, `Tersambung`)
if (autoJoin) {
YtThomz.groupAcceptInvite(codeInvite)
}
}
})

YtThomz.ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return YtThomz.readMessages([m.key])
if (!YtThomz.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = func.smsg(YtThomz, m, store)
require("./thomz")(YtThomz, m, store)
} catch (err) {
console.log(err)
}
})

YtThomz.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = YtThomz.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

YtThomz.public = true

YtThomz.ev.on('creds.update', saveCreds)
return YtThomz
}

startSesi()
