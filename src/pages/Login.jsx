import React, { useState } from "react";
import { useAuth } from "../components/Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.username.length >= 3 && data.password.length >= 4) {
      login(data);
      navigate("/");
    }
    return;
  };

  return (
    <div className="container">
      <form className="w-50 mx-auto p-5" onSubmit={handleSubmit}>
        <h1 className="text-center py-3">Login</h1>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
