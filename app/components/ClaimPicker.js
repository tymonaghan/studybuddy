import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { attachNoteToClaimInDb } from "../../store/notesReducer";

export default function ClaimPicker(props) {
  const noteId = +props.noteId;
  const dispatch = useDispatch();
  const claimList = useSelector(
    (state) =>
      state.projects.find((project) => project.id == state.currentProjectId)
        .claims
  );

  function handleChange(e) {
    const num = +e.target.value.slice(6, 7);
    // console.log(claimList.find((claim) => claim.claimNumber == num).id);
    // console.dir(+e.target.value.slice(6, 7).length);
    dispatch(
      attachNoteToClaimInDb(
        noteId,
        claimList.find((claim) => claim.claimNumber == num).id
      )
    );
  }

  return (
    <Form.Select
      aria-label="Default select example"
      onChange={(e) => handleChange(e)}
    >
      <option>Associate...</option>
      {claimList[0] ? (
        claimList.map((claim, key) => {
          return (
            <option key={key}>
              Claim {claim.claimNumber}: {claim.claimText}
            </option>
          );
        })
      ) : (
        <option disabled>no claims found!</option>
      )}
    </Form.Select>
  );
}
