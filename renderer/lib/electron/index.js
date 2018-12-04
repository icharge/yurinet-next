
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

  /**
   * Get IPC for Renderer side
   * 
   * @param {(cb: Electron.IpcRenderer => void 0)} availableCb 
   * @param {Function} notAvailable 
   * @returns {Electron.IpcRenderer}
   */
  getIpcRenderer(availableCb, notAvailable = NOOP) {
    if (typeof availableCb === 'function') {
      if (ipcRenderer) {
        availableCb(ipcRenderer);
      } else {
        notAvailable();
      }
    }

    return ipcRenderer;
  }

}

const electronUtil = new ElectronUtil();
export default electronUtil;
