import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { updateClaimInDb } from "../../store/projectsReducer";
import { useParams } from "react-router-dom";

export default function ClaimDetailView(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const { currentNotes } = useSelector((state) => state);
  const [claimText, updateClaimText] = useState("");
  const [editMode, toggleEditMode] = useState(false);

  const { claim } = props;

  useEffect(() => {
    if (!props.claim) return false;
    updateClaimText(claim.claimText);
  }, [props]);

  function toggleEdit(e) {
    console.log(e);
    if (editMode) {
      e.target.innerHtml = "Edit claim";
      e.target.nextElementSibling.disabled = true;
      // console.log(
      //   `projectId: ${params.projectId} \n\nclaimId: ${claim.claimNumber}\n\nclaimText: ${claimText}`
      // );
      dispatch(updateClaimInDb(params.projectId, +claim.id, claimText));
      toggleEditMode(false);
    } else {
      e.target.innerText = "Save";
      e.target.nextElementSibling.disabled = false;
      toggleEditMode(true);
    }
  }

  function handleChange(e) {
    updateClaimText(e.target.value);
  }

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Claim {claim?.claimNumber}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <InputGroup>
            <Button
              variant="outline-warning"
              size="sm"
              onClick={(e) => toggleEdit(e)}
            >
              {editMode ? "Save" : "Edit"}
            </Button>
            <Form.Control
              as="textarea"
              rows={3}
              name="claimText"
              value={claimText}
              disabled
              onChange={(e) => {
                handleChange(e);
              }}
            ></Form.Control>
          </InputGroup>
        </Form.Group>
        <h2>Evidence</h2>
        {currentNotes.filter((note) => note.claimId == claim?.id)[0] ? (
          <ul>
            {currentNotes[0].source
              ? currentNotes
                  .filter((note) => note.claimId == claim?.id)
                  .map((note, key) => (
                    <li key={key}>
                      "{note.text}" from {note.source?.name} by{" "}
                      {note.source.authorFullName} ({note.source.classification}{" "}
                      source)
                    </li>
                  ))
              : ""}
          </ul>
        ) : (
          "no notes linked to this claim yet."
        )}
      </Modal.Body>
    </Modal>
  );
}
