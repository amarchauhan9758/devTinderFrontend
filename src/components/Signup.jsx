import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/globalApi";

import ApiErrorMessage from "../utils/ApiErrorMessage";
import { useNavigate, Link } from "react-router-dom";
import Loader from "./utils/loader";

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

      if (responseData?.status == 200) {
        setOpenLoader(false);
        navigate("/login");
      }
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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md shadow-xl rounded-2xl bg-gray-900 p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-blue-700">
            Welcome Back
          </h2>

          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="label">
                <span className="label-text font-medium text-yellow-100">
                  FirstName
                </span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirsName(e.target.value)}
                placeholder="Enter your first name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="label">
                <span className="label-text font-medium text-yellow-100">
                  LastName
                </span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-medium text-yellow-100">
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

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium text-yellow-100">
                  Password
                </span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input w-full"
                required
              />
            </div>

            <p className="text-red-500">{error}</p>

            <button onClick={handleSignUp} className="btn btn-primary w-full">
              Sign Up
            </button>

            <div className="text-center">
              <p className="text-sm text-yellow-100">
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loader overlay */}
      {openLoader && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader />
        </div>
      )}

      <ApiErrorMessage
        setOpenApiModel={setOpenApiModel}
        openApiModel={openApiModel}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default Signup;
