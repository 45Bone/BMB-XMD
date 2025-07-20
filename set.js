const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUNSSUhkdEYvRk81YVdIbi8vb1NNWHJTMFJPakViVzQyQUVsQmpWa25tcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZhZGZPdHNFU21zbXNQQ1RMc2Q0c3RIZ1d2Uk5TWS80TkhiZUgvMGFERT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFQ0F6c2dhMkNGWThudmtCN2FYVU8xWHpPZEFFd204VVBiTFdPRGQvQjJNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHQkxwbnFpSFBuTUtHYWR1OEpsWTBTQmtRZG9ZZ3VMY1V3aUlJNFZxY1ZrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlCbnJwMlJYcjdoWTFiV2lndDVyT2pmTWR6aldGOThheTRUWVBjRDJyMzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVNQWZxTUdOa0tyNjdWUVNIUTJDUHY2OVY4M095dk9PdXlnSDFDUHUwbW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU9TY2t1SC9BMEtOdVFmcXFESGxWWTVud2ZkbU9lNHVScnJuWFNBN1FuZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib1hyT0U0M2NqQ3hxaU9IbEtaVXM2eHcvSVBRdnZtd2pvTnFVMVNNVGtIaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZwb1plOGhTQ0oyZUJwOUpESlZEcnYwR2NlRGdUVkdkeFdOcFVReXNlWVdPNHNKZnhNcitkUXpHbjFsbDRaYTFvYzJvSVo2cW5KL0R5T1dzTGRMV2hRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk2LCJhZHZTZWNyZXRLZXkiOiJodG5JRVdNdTdBeE9yaEUveVdwZVNER3lPTjYyemlGS1VxbCt2elRYR21jPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkxMzYyNzk4MTZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0EwQkUwQTAyQjk1RTlFRTg1RDIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MzAwMTM2NX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTEzNjI3OTgxNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUQ1Njk0QzQwMkM3NjlFM0Q1MyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUzMDAxMzY3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI4Q0JDTVJQVyIsIm1lIjp7ImlkIjoiMjM0OTEzNjI3OTgxNjo3OUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjMxMzIzNzgzNzEyOTkyOjc5QGxpZCIsIm5hbWUiOiJTKk4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05TcTdmTUNFSWpiOHNNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkxVMFpNWGM5SDFwVlpxUjlNQVFENFhCOUFqN1lMajVEMGtWYVA0NlZJazA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlVqM2grQnZmamRpT0Y0cTQvQUh1bnRFWVNKZUdEQnk3OTRkRzh5UTdlRGxxU2FQUnlUdzExRDJMS0tvMWdYa0JFbXRmMFRuTzJQNmlUUkhUbUZTbGdRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIwU0hqTEVLNVd2RmxYQ1JIZENPMzk3MnNyb0lwRTAyTWY4cmZzUTRIOEJaOW5CbHpvWHhBeUxPVUZHSms1S2IzbGE0NklMNTR3ODREM0RLNCtJQTlnQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxMzYyNzk4MTY6NzlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUzFOR1RGM1BSOWFWV2FrZlRBRUErRndmUUkrMkM0K1E5SkZXaitPbFNKTiJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTMwMDEzNjMsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQjF3In0=',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

