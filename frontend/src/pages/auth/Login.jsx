import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";

const initialState = { username: "", password: "" };

const Login = () => {
  const user = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (user && user?.data?.token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(formData, navigate));
  };

  const handleChange = (event) =>
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username..."
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter your password..."
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
