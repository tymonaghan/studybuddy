import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
        {!projects[0] ? (
          <p>No projects found.</p>
        ) : (
          <Stack gap={2}>
            {Object.values(projects).map((entry, index) => {
              return (
                <div key={index} className="bg-light-border">
                  {entry.name}
                </div>
              );
            })}
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProjectList;
