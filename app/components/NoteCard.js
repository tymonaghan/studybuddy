import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ClaimPicker } from ".";

export default function NoteCard(props) {
  const { note } = props;
  return (
    <Card className="px-2 py-1 my-1">
      <Row sm={7}>
        <Col>
          <h4>{note.headline}:</h4>
          <p>
            <em>{note.text}</em>
          </p>
        </Col>
        <Col
          sm={2}
          style={{
            backgroundColor: "#ccc",
            borderRadius: "0.25rem",
            margin: "0.5rem",
          }}
        >
          <h5>source:</h5>
          <p>
            <Link to={`./source/${note.source?.id}`}>
              {note.source?.name} by {note.source?.authorFullName}
            </Link>
          </p>
        </Col>
        <Col
          sm={2}
          style={{
            backgroundColor: "#ccc",
            borderRadius: "0.25rem",
            margin: "0.5rem",
          }}
        >
          <h5>argument:</h5>
          {note.claimId ? (
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-${note.id}`}>
                  {`Claim text: "${note.claim?.claimText}"`}
                </Tooltip>
              }
            >
              {/* the triggering element must be able to accept a ref, so Button is fine, <p> won't work though */}
              <Link to="." disabled>
                currently associated with claim #{note.claim?.claimNumber}
              </Link>
            </OverlayTrigger>
          ) : (
            <div>
              <p>not associated with a claim yet</p>
              <ClaimPicker noteId={note.id} />
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
}
