const electron = require('electron');
// const os = require('os');
const autoUpdater = electron.autoUpdater;
const appVersion = require('./package.json').version;

let updateFeed = '';
let initialized = false;
// const platform = `${os.platform()}_${os.arch()}`;
const nutsURL = 'http://thaira2.com';

updateFeed = `${nutsURL}/update/${appVersion}.ver`;

console.log(`App version : ${appVersion}`);
console.log(`Update URL : ${updateFeed}`);

function init(mainWindow) {
  mainWindow.webContents.send('console', `App version: ${appVersion}`);
  mainWindow.webContents.send('message', { msg: `🖥 App version: ${appVersion}` });

  if (initialized || !updateFeed/*  || process.env.NODE_ENV === 'development' */) { return; }

  console.log('Auto update started.');

  initialized = true;

  autoUpdater.setFeedURL(updateFeed);

  autoUpdater.on('error', (ev, err) => {
    mainWindow.webContents.send('message', { msg: `😱 Error: ${err}` });
  });

  autoUpdater.on('checking-for-update', (ev, err) => {
    mainWindow.webContents.send('message', { msg: '🔎 Checking for updates' });
  });

  autoUpdater.on('update-available', (ev, err) => {
    mainWindow.webContents.send('message', { msg: '🎉 Update available. Downloading ⌛️', hide: false });
  });

  autoUpdater.on('update-not-available', (ev, err) => {
    mainWindow.webContents.send('message', { msg: '👎 Update not available' });
  });

  autoUpdater.on('update-downloaded', (ev, err) => {
    const msg = '<p style="margin: 0;">🤘 Update downloaded - <a onclick="quitAndInstall()">Restart</a></p>';
    mainWindow.webContents.send('message', { msg, hide: false, replaceAll: true });
  });

  autoUpdater.checkForUpdates();
}

module.exports = {
  init
};
