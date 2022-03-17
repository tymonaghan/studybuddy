import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useDispatch } from "react-redux";
import { AddClaim } from ".";

export default function ArgumentView(props) {
  const dispatch = useDispatch();
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
              Claim {claim.claimNumber}
            </Card.Header>
            <div>{claim.claimText}</div>
          </Card>
        );
      })}
      <AddClaim currentClaimCount={currentProject.claims.length} />
    </div>
  );
}
