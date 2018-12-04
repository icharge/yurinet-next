
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
   * @param {(cb: Electron.IpcRenderer => void 0)} callback 
   * @param {Function} fallback 
   * @returns {Electron.IpcRenderer}
   */
  getIpcRenderer(callback, fallback = NOOP) {
    if (typeof callback === 'function') {
      if (ipcRenderer) {
        callback(ipcRenderer);
      } else {
        fallback();
      }
    }

    return ipcRenderer;
  }

}

const electronUtil = new ElectronUtil();
export default electronUtil;
