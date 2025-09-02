import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, test } from "../../actions/auth";

const initialState = { username: "", password: "" };

const Login = () => {
  const user = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(formData));
  };

  const handleChange = (event) =>
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  const testFn = () => dispatch(test());

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
      <button type="button" onClick={testFn}>
        Test
      </button>
    </>
  );
};

export default Login;
