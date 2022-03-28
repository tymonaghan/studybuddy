import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useDispatch } from "react-redux";
import { AddClaim } from ".";
import { deleteClaimFromDb } from "../../store/projectsReducer";
import { useParams } from "react-router-dom";

export default function ArgumentView(props) {
  const params = useParams();
  const dispatch = useDispatch();
  function handleDelete(claimId) {
    dispatch(deleteClaimFromDb(params.projectId, claimId));
    // window.alert(
    //   `delete button pressed. claimID: ${claimId}\n\nprojectId: ${params.projectId}`
    // );
  }
  const { currentProject } = props;
  return (
    <div>
      <h2>Your thesis:</h2>
      {currentProject.thesis}
      <h2>Your Argument:</h2>
      {currentProject.claims.map((claim, key) => {
        return (
          <Card
            className="row mx-auto my-2 p-1"
            style={{ width: "85%" }}
            key={key}
          >
            <Card.Header className="my-0 py-0">
              <Row>
                <Col>Claim {claim.claimNumber}</Col>
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
      })}
      <AddClaim currentClaimCount={currentProject.claims.length} />
    </div>
  );
}
