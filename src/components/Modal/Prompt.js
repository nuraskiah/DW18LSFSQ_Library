import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { ActionLoader } from '../Loader';

const PromptModal = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal show={props.show} className="prompt" centered backdrop="static">
      <Modal.Body>{props.label}</Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={props.onHide}>
          Cancel
        </Button>
        <Button
          className="primary"
          onClick={async () => {
            setLoading(true);
            await props.onAction();
            setLoading(false);
            props.onHide();
          }}
        >
          {loading ? <ActionLoader /> : props.action}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PromptModal;
