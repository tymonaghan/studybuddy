import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import React from "react";

const ProjectListCard = (props) => {
  const { entry } = props;

  return (
    <Card className="bg-light-border">
      <Card.Body>
        <Stack gap={2} direction="horizontal">
          <img
            style={{ width: "4rem" }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Noun_Project_task_icon_1251563.svg/105px-Noun_Project_task_icon_1251563.svg.png"
          />
          <div>
            <strong>{entry.name}</strong>
          </div>
          <div>
            <em>{entry.summary}</em>
          </div>
          <Stack style={{ width: "8rem" }}>
            <div>x Sources</div>
            <div>y Notes</div>
            <div>Status: {entry.status}</div>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default ProjectListCard;
