import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";

export default function ConfirmDelete(props) {
  const { deleteaction, projectid, claimid } = props;
  const dispatch = useDispatch();

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Are you sure?</h2>
        <p>
          Deleting this item is permanent. Any attached items will lose their
          association with the deleted item.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            dispatch(deleteaction(projectid, claimid));
            props.onHide();
          }}
        >
          Yes, Delete
        </Button>
        <Button variant="secondary">Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}
