import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';

const IS_REACT_16 = !!ReactDOM.createPortal;

export default function myModal(config) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig = { ...config, close, visible: true };

  function close(...args) {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: destroy.bind(this, ...args),
    };
    if (IS_REACT_16) {
      render(currentConfig);
    } else {
      destroy(...args);
    }
  }

  function update(newConfig) {
    currentConfig = {
      ...currentConfig,
      ...newConfig,
    };
    render(currentConfig);
  }

  function destroy(...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args && args.length &&
      args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
  }

  function render(props) {
    ReactDOM.render(<Modal
      open={props.visible}
      basic
      size='small'
      {...props}
    >
      <Header icon='browser' content={props.title || ''} />
      <Modal.Content>
        <h3>{props.content}</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={() => close()} inverted>
          <Icon name='checkmark' /> OK
        </Button>
      </Modal.Actions>
    </Modal>, div);
  }

  render(currentConfig);

  return {
    destroy: close,
    update,
  };
}
