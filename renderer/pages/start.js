import React, { Component } from 'react';
import game from '../lib/electron/game';
import { Button } from 'semantic-ui-react';
import electronUtil from '../lib/electron';

export default class extends Component {
  state = {
    input: '',
    message: null,
  }

  /**
   * @type {Electron.IpcRenderer}
   */
  ipcRenderer;

  constructor(props) {
    super(props);

    this.ipcRenderer = electronUtil.getIpcRenderer(ipc => this.ipcRenderer = ipc);
  }

  componentDidMount() {
    // start listening the channel message
    if (this.ipcRenderer) {
      this.ipcRenderer.on('message', this.handleMessage);
    }
  }

  componentWillUnmount() {
    // stop listening the channel message
    if (this.ipcRenderer) {
      this.ipcRenderer.removeListener('message', this.handleMessage);
    }
  }

  handleMessage = (event, message) => {
    // receive a message from the main process and save it in the local state
    message = JSON.stringify(message);
    console.log('Received message :', message);

    if (message.update) {
      global.quitAndInstall();
    }

    this.setState({ message });
  }

  handleChange = event => {
    this.setState({ input: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.ipcRenderer) {
      this.ipcRenderer.send('message', this.state.input);
    }
    this.setState({ message: null });
  }

  handleStartGame = event => {
    game.startGame();
  }

  render() {
    return (
      <div>
        <h1>Hello Electron!</h1>

        {this.state.message &&
          <p>{this.state.message}</p>
        }

        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChange} />
        </form>

        <style jsx>{`
          h1 {
            color: red;
            font-size: 50px;
          }
        `}</style>

        <Button type="button" onClick={this.handleStartGame}>Test launch</Button>
      </div>
    );
  }
}
