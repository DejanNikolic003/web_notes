import { useEffect } from "react";
import Notes from "./notes/Notes";
import { useDispatch } from "react-redux";
import { getNotes } from "../actions/notes";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  return (
    <>
      <h1>Home</h1>
      <Notes />
    </>
  );
};

export default Home;
