import React, { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import InputGroup from "react-bootstrap/InputGroup";

import { useDispatch, useSelector } from "react-redux";
import { AddClaim, ClaimDetailView, ConfirmDelete, ArgumentTableView } from ".";
import {
  deleteClaimFromDb,
  updateThesisInDb,
} from "../../store/projectsReducer";
import { useParams } from "react-router-dom";

export default function ArgumentView() {
  const dispatch = useDispatch();
  const params = useParams();
  const initialProject = useSelector((state) =>
    state.projects.find((project) => project.id == params.projectId)
  );

  const [currentProject, setCurrentProject] = useState({});
  const [showClaimDetails, setShowClaimDetails] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [claimDetailNumber, setClaimDetailNumber] = useState(NaN);
  const [thesis, updateThesis] = useState("");
  const { currentNotes } = useSelector((state) => state);

  useEffect(() => {
    setCurrentProject(initialProject);
    updateThesis(initialProject.thesis);
  }, [initialProject]);

  function toggleEdit(event) {
    // console.dir(event);
    if (event.target.innerText === "Edit") {
      event.target.className = "btn btn-primary";
      event.target.innerText = "Save";
      event.nativeEvent.target.nextSibling.disabled = false;
    } else {
      dispatch(updateThesisInDb(params.projectId, thesis));
      event.target.className = "btn btn-secondary";
      event.target.innerText = "Edit";
      event.nativeEvent.target.nextSibling.disabled = true;
    }
  }

  function handleChange(event) {
    updateThesis(event.target.value);
  }

  function getNotes(claimId) {
    return currentNotes?.filter((note) => note.claimId == claimId);
  }

  return (
    <div>
      <h2>Your thesis:</h2>
      <Form.Group className="mb-3 mx-auto" style={{ width: "85%" }}>
        <InputGroup>
          <Button
            variant="secondary"
            onClick={(e) => {
              toggleEdit(e);
            }}
          >
            Edit
          </Button>
          <Form.Control
            as="textarea"
            rows={4}
            name="thesis"
            value={thesis}
            disabled
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </InputGroup>
      </Form.Group>
      {/* {currentProject.thesis} */}
      <h2>Your Argument:</h2>
      {currentProject.claims
        ? currentProject.claims.map((claim, key) => {
            return (
              <Card
                className="row mx-auto my-2 p-1"
                style={{ width: "85%" }}
                key={key}
                onClick={() => {
                  setShowClaimDetails(true);
                  setClaimDetailNumber(claim.id);
                }}
              >
                <Card.Header className="my-0 py-0">
                  <Row>
                    <Col>Claim {claim.claimNumber}</Col>
                    <Col>{getNotes(claim.id).length} notes</Col>
                    <Col sm="auto">
                      (
                      {
                        getNotes(claim.id).filter(
                          (note) => note.source?.classification == "secondary"
                        ).length
                      }{" "}
                      from secondary sources,{" "}
                      {
                        getNotes(claim.id).filter(
                          (note) => note.source?.classification == "primary"
                        ).length
                      }{" "}
                      from primary sources)
                    </Col>
                    <Col me="auto" xs={1}>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="m-0 py-0"
                        onClick={() => {
                          setClaimDetailNumber(claim.id);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <span className="material-icons">delete</span>{" "}
                      </Button>
                    </Col>
                  </Row>
                </Card.Header>
                <div>{claim.claimText}</div>
              </Card>
            );
          })
        : "No claims yet."}
      <AddClaim currentClaimCount={currentProject.claims?.length} />
      <h2>Argument at a glance:</h2>
      <ArgumentTableView />
      <ClaimDetailView
        show={showClaimDetails}
        onHide={() => setShowClaimDetails(false)}
        claim={
          currentProject.claims?.filter(
            (claim) => claim.id == claimDetailNumber
          )[0]
        }
      />
      <ConfirmDelete
        show={showDeleteDialog}
        onHide={() => {
          setShowDeleteDialog(false);
          setShowClaimDetails(false);
        }}
        deleteaction={deleteClaimFromDb}
        projectid={params.projectId}
        claimid={claimDetailNumber}
      />
      {/* <AddClaim currentClaimCount={currentProject.claims?.length} /> */}
    </div>
  );
}
