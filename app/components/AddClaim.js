import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewClaimToDb } from "../../store/projectsReducer";

const AddClaim = (props) => {
  const dispatch = useDispatch();
  const { currentClaimCount } = props;
  const params = useParams();
  const { projectId } = params;
  return (
    <Stack
      className="mx-auto"
      direction="horizontal"
      gap={2}
      style={{ width: "85%" }}
    >
      <Form style={{ width: "80%" }}>
        <Form.Control
          as="textarea"
          rows={2}
          id="new-claim-text"
          className="me-auto"
          placeholder="New Claim Text"
        />
      </Form>
      <Button
        variant="outline-primary"
        onClick={() => {
          const thisForm = document.getElementById("new-claim-text");
          dispatch(
            addNewClaimToDb(projectId, currentClaimCount + 1, thisForm.value)
          );
          thisForm.value = "";
        }}
      >
        Add a Claim
      </Button>
    </Stack>
  );
};

export default AddClaim;
