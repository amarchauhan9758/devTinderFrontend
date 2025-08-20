import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/globalApi";
import laoder from "../utils/loader";

import ApiErrorMessage from "../utils/ApiErrorMessage";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirsName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [openLoader, setOpenLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openApiModel, setOpenApiModel] = useState(false);
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setOpenLoader(true);
    try {
      const responseData = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setOpenLoader(false);
      navigate("/login");
    } catch (error) {
      setOpenLoader(false);
      setOpenApiModel(true);

      setErrorMessage(
        error?.response?.data?.message || "Something went wrong ..!"
      );
    }
  };

  return (
    <div>
      <div className="min-h-screen  flex items-center justify-center px-4">
        <div className="w-full max-w-md shadow-xl rounded-2xl bg-white p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-blue-700">
            Welcome Back
          </h2>

          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-300">
                  FirstName
                </span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirsName(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-300">
                  LastName
                </span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>
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
              onClick={() => handleSignUp()}
              className="btn btn-primary w-full"
            >
              Sign Up
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-300">
                <a
                  href="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <loader openLoader={openLoader} />
      <ApiErrorMessage
        setOpenApiModel={setOpenApiModel}
        openApiModel={openApiModel}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default Signup;
