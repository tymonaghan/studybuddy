import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function NoteCard(props) {
  const { note } = props;
  return (
    <Card className="px-2 py-1 my-1">
      <Row sm={7}>
        <Col>
          <p>
            <strong>{note.headline}:</strong>
          </p>
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
          <p>source:</p>
          <p>{note.sourceId}</p>
        </Col>
        <Col
          sm={2}
          style={{
            backgroundColor: "#ccc",
            borderRadius: "0.25rem",
            margin: "0.5rem",
          }}
        >
          <p>argument</p>
          <p>
            {note.claimId ? note.claimId : "not associated with a claim yet"}
          </p>
        </Col>
      </Row>
    </Card>
  );
}
