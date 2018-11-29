// This file will execute on Renderer

const electron = require('electron');
const {
  ipcRenderer,
  remote,
} = electron;

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', () => {

  global.isElectron = true; // Yes it is.

  global.ipcRenderer = ipcRenderer;

  global.quitAndInstall = remote.autoUpdater.quitAndInstall;

});
