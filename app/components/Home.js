import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { username } = useSelector((state) => state.auth);
  return (
    <div className="home">
      Welcome, <strong>{username}</strong>
    </div>
  );
};

export default Home;
