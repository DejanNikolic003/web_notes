import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { useEffect } from "react";
import { me } from "./actions/auth";
import Notes from "./pages/notes/Notes";
import Home from "./pages/Home";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      await dispatch(me());
      setInitialized(true);
    };
    initAuth();
  }, [dispatch]);

  if (!initialized) return <h2>Loading...</h2>; // wait for auth

  return (
    <>
      <BrowserRouter>
        <nav>
          {!user.data ? (
            <>
              <h1>You are not logged in!</h1>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <div>
              <h1>You are logged in as {user?.data?.username}</h1>
              <Link to="/">Home</Link>
            </div>
          )}
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
