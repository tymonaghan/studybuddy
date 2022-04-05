import React, { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import InputGroup from "react-bootstrap/InputGroup";

import { useDispatch, useSelector } from "react-redux";
import { AddClaim, ClaimDetailView } from ".";
import { deleteClaimFromDb } from "../../store/projectsReducer";
import { useParams } from "react-router-dom";

export default function ArgumentView(props) {
  const [showClaimDetails, setShowClaimDetails] = useState(false);
  const [claimDetailNumber, setClaimDetailNumber] = useState(NaN);
  const [thesis, updateThesis] = useState();
  const { currentNotes } = useSelector((state) => state);
  useEffect(() => {
    updateThesis(currentProject.thesis);
  }, [currentProject]);
  function toggleEdit(event) {
    console.dir(event);
    if (event.target.innerText === "Edit") {
      event.target.className = "btn btn-primary";
      event.target.innerText = "Save";
      event.nativeEvent.target.nextSibling.disabled = false;
    } else {
      // dispatch(updateCurrentProjectInDb(params.projectId, currentProjectData));
      event.target.className = "btn btn-secondary";
      event.target.innerText = "Edit";
      event.nativeEvent.target.nextSibling.disabled = true;
    }
  }
  const params = useParams();
  const dispatch = useDispatch();
  function handleDelete(claimId) {
    dispatch(deleteClaimFromDb(params.projectId, claimId));
    // window.alert(
    //   `delete button pressed. claimID: ${claimId}\n\nprojectId: ${params.projectId}`
    // );
  }
  function handleChange(event) {
    console.log(thesis);
    updateThesis(event.target.value);
  }
  const { currentProject } = props;
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
            rows={5}
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
                  setClaimDetailNumber(claim.claimNumber);
                }}
              >
                <Card.Header className="my-0 py-0">
                  <Row>
                    <Col>Claim {claim.claimNumber}</Col>
                    <Col>
                      {
                        currentNotes?.filter(
                          (note) => note.claimId == claim.claimNumber
                        ).length
                      }{" "}
                      notes
                    </Col>
                    <Col me="auto" xs={1}>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="m-0 py-0"
                        onClick={() => {
                          handleDelete(claim.claimNumber);
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
      <ClaimDetailView
        show={showClaimDetails}
        onHide={() => setShowClaimDetails(false)}
        claim={
          currentProject.claims?.filter(
            (claim) => claim.claimNumber == claimDetailNumber
          )[0]
        }
      />
      {/* <AddClaim currentClaimCount={currentProject.claims?.length} /> */}
    </div>
  );
}
