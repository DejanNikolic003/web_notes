import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";

const initialState = { username: "", password: "" };

const Register = () => {
  const { data, message } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(formData));
  };

  const handleChange = (event) =>
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  return (
    <>
      {message && <h1>{message}</h1>}
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

export default Register;
