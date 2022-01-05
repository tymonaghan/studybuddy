import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddProject } from ".";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { retrieveUserProjectsFromDb } from "../../store/reducer";

const ProjectList = () => {
  const userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveUserProjectsFromDb(userId));
  }, []);
  const projects = useSelector((state) => state.projects);

  return (
    <Card border="primary" style={{ width: "80%", margin: "1rem" }}>
      <Card.Header>Your Projects</Card.Header>
      <Card.Body>
        {/* <Card.Text>If you have projects, they will appear here.</Card.Text> */}
        <Stack gap={2}>
          {!projects[0] ? (
            <p>No projects found.</p>
          ) : (
            Object.values(projects).map((entry, index) => {
              return (
                <Card key={index} className="bg-light-border">
                  <Card.Body>
                    <Stack gap={2} direction="horizontal">
                      <img
                        style={{ width: "10%" }}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Noun_Project_task_icon_1251563.svg/105px-Noun_Project_task_icon_1251563.svg.png"
                      />
                      <div>
                        <strong>{entry.name}</strong>
                      </div>
                      <div className="ms-auto">{entry.id}</div>
                      <div>{entry.status}</div>
                    </Stack>
                  </Card.Body>
                </Card>
              );
            })
          )}
          <AddProject />
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default ProjectList;
