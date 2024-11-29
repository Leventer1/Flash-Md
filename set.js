const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0VseGNYZDdHMjkzaW01WVVxZ1hHSjNOSjQzcjFhTDRsRURmeEE0VWFuUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV2pFSWd2enFldzJ3cU9EQVZwMUdpbWNpZUgxQXVKRlBLQUExRUlpVk15Zz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpSjBUYWJBbENkZmp6QXNoOWFyNTFiMVFxZ0VtRWNMQTdDNGFPbS9jTUVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPTlUydE5Hc25iQlF4dkZ1V1g3eXFEWGRydjNva3FWSUMvM21qT3Q4Y0ZZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1CRllQUEN2dkJYUlNqRmoxRjlnbnc3M0pubTFLUDN2TU50YW5qMzVuMmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktyR2dLcTFub1lpazVqRXZXTkx2WE53Y0Jlbk9jUGhMSE9kUGJlOHdiVlk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUtnWElWcDcxM3IxM3VBU2Q0UXY3SGh4V2lUWjFpb1lYYXNXUFFMRDMxRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNnQxRVN5NHU2S1ZFWUJuZWVGNnpvb1g3OHhNTExvK3d4OVM1RjdTdjF3Zz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjloMFpPY0JJMk9oZGcxbXVRemkrTlJpZ3NDY2ZnbkJWbVhzWGxNYVpZR2Q0bm5kYjJSa1g0MFE3djdyUHVCRGNMWDJ4S0VtSnBoVXFXTWJLZDgyd0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ2LCJhZHZTZWNyZXRLZXkiOiJEQnRBb1ZyL2NSZ1hScFJJOGEreUwxQnRza29mZUh5dlJJRHpzVW9VcHBFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDcwNzc3NDU1ODBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0E4NjQ5OEUzMzMwODJERTY1RDkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczMjg4NDc2N31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiM0k1ZldPeDhRWEt3eGU5MW8wTURqQSIsInBob25lSWQiOiI5OTFiMDI4NC04MGQ5LTQyMDQtODk3NC02ODFlZDNkNjcwMjIiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOXVzNnoraWc5RU14cTBlR3poOWJBdzg4SmdRPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjcxQnNOTURzMzZPVGN2dEY2R1R1ak9mR3VPOD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJFSjhSOEc1SyIsIm1lIjp7ImlkIjoiMjM0NzA3Nzc0NTU4MDoxN0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwn6SWIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJRDErYXNMRUkzeXByb0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI2Witsb2xybGdJZmtYdUltaU16UWF3WUEzTmlUS0tsSzZWei9XcnY5dVRVPSIsImFjY291bnRTaWduYXR1cmUiOiJlWlVKTmhMSVJSak00cHpIcU9uYjN2S21MbEZzUWRSRE1HUENIVE1vZHdZNzBRWVZiWmt1ekQzaTJsZEZtQXpvang4QWFjdjUrTW50RHl0aG5uUHdEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZnVxS25ncUZmS3lNQkxJbndwS2QxRk1hNFJ3STRtNGIxcDA4VGRwSUV4ZVJXYUI2QmMxRFJzd0duUDZIMHdaMVZQb0pOb21LUDNnalNodXVPYThORHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDc3NzQ1NTgwOjE3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmVtZnBhSmE1WUNINUY3aUpvak0wR3NHQU56WWt5aXBTdWxjLzFxNy9iazEifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMjg4NDc2MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJaysifQ==';;;=>',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2347077745580",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
