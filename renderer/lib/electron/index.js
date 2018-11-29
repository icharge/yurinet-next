
/**
 * DUMMY callback - Use as default callback for safe invoking
 */
const NOOP = () => { };

/**
 * 
 */
const ipcRenderer = global.ipcRenderer;

/**
 * A Proxy between Client with Electron process
 * 
 * Global please see preload file
 * @see preload.js
 */
class ElectronUtil {

  constructor() {
    // "global" must already defined!
    this.isElectron = !!global.isElectron; // !! Convert to boolean

  }

  getIpcRenderer(availableCb, notAvailable = NOOP) {
    return ipcRenderer;
  }

}

const electronUtil = new ElectronUtil();
export default electronUtil;
