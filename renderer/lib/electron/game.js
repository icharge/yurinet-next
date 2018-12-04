import electronUtil from '.';
import myModal from '../modal';


class Game {

  // TODO: Load from config
  gameDir = 'e:\\games\\westwood\\ra2';

  startGame() {
    const ipcRenderer = electronUtil.getIpcRenderer();
    if (ipcRenderer) {
      ipcRenderer.send('startGame', {
        gameDir: this.gameDir,
        isAres: true,
        hostUri: 'localhost:8888',
      });
    } else {
      // alert('Please Start game on YuriNET 2 Desktop.');
      myModal({
        title: 'Starting game',
        content: 'Please Start game on YuriNET 2 Desktop.',
      });
    }
  }

}

export default new Game();
