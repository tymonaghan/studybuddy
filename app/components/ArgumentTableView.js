import React from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";

export default function ArgumentTableView() {
  const currentProject = useSelector((state) =>
    state.projects.find((project) => project.id == state.currentProjectId)
  );
  const { currentNotes } = useSelector((state) => state);
  const { currentSources } = useSelector((state) => state);

  function getNotes(claimId) {
    return currentNotes.filter((note) => note.claimId == claimId);
  }

  return (
    <Card className="mx-auto" style={{ width: "85%" }}>
      <Table>
        <thead>
          <tr>
            <th>Claim number</th>
            <th>Claim text</th>
            <th>Total Notes (p/s)</th>
            <th>Total Sources (p/s)</th>
          </tr>
        </thead>
        <tbody>
          {currentProject.claims[0]
            ? currentProject.claims.map((claim, key) => {
                return (
                  <tr key={key}>
                    <td>{claim.claimNumber}</td>
                    <td>{claim.claimText}</td>
                    <td>{getNotes(claim.id).length}</td>
                    <td>
                      {
                        getNotes(claim.id).reduce((accum, val) => {
                          if (accum.includes(val.sourceId)) return 0;
                          else accum.push(val.sourceId);
                          return accum;
                        }, []).length
                      }
                    </td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </Table>
    </Card>
  );
}
