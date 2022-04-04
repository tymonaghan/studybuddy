import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";

export default function ClaimDetailView(props) {
  const { currentNotes } = useSelector((state) => state);

  const { claim } = props;
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Claim {claim?.claimNumber}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Claim text</h2>
        <p>{claim?.claimText}</p>
        <h2>Evidence</h2>
        {currentNotes.filter(
          (note) => note.claimId == claim?.claimNumber
        )[0] ? (
          <ul>
            {currentNotes
              .filter((note) => note.claimId == claim?.claimNumber)
              .map((note, key) => (
                <li key={key}>
                  "{note.text}" from {note.source.name} by{" "}
                  {note.source.authorFullName} ({note.source.classification}{" "}
                  source)
                </li>
              ))}
          </ul>
        ) : (
          "no notes linked to this claim yet."
        )}
      </Modal.Body>
    </Modal>
  );
}
