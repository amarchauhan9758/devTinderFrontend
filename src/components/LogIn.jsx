import React, { use, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/strore/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/globalApi";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("risabh@gmail.com");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("risabh@123#");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);

      dispatch(addUser(response?.data));
      navigate("/");
    } catch (error) {
      console.log(error, "line no29");
      setError(error?.response?.data?.message || "Something wetnt wrong..!");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-indigo-200 to-rose-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md shadow-xl rounded-2xl bg-white p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500">
          Please log in to your account
        </p>

        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-300">
                Email
              </span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-400">
                Password
              </span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input  w-full"
              required
            />
          </div>
          <p className="text-red-500"> {error}</p>
          <button
            onClick={() => handleLogin()}
            className="btn btn-primary w-full"
          >
            Login
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-300">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
