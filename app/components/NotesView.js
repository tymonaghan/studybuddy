import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getNotesForProject } from "../../store/notesReducer";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function NotesView() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [notes, updateNotes] = useState([]);
  const initialNotes = useSelector((state) => state.currentNotes);
  const params = useParams();

  useEffect(() => {
    updateNotes(initialNotes);
  }, [initialNotes]);

  useEffect(() => {
    console.log(projectId);
    dispatch(getNotesForProject(params.projectId));
  }, []);

  return (
    <div>
      {notes[0]
        ? notes.map((note, key) => {
            return (
              <Card key={key} className="px-2 py-1 my-1">
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
                      {note.claimId
                        ? note.claimId
                        : "not associated with a claim yet"}
                    </p>
                  </Col>
                </Row>
              </Card>
            );
          })
        : "no notes...yet?"}
    </div>
  );
}
