import electronUtil from '.';


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
    }
  }

}

export default new Game();
