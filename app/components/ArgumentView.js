import React from "react";

export default function ArgumentView(props) {
  const { currentProject } = props;
  return (
    <div>
      <h2>Your thesis:</h2>
      {currentProject.thesis}
      <h2>Your Argument:</h2>
    </div>
  );
}
