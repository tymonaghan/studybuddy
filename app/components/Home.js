import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { username } = useSelector((state) => state.auth);
  return (
    <div className="home">
      Welcome, <strong>{username}</strong>
      <Button
        variant="warning"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Home;
