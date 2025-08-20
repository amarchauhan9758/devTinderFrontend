import React from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/devTinder.webp";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex-1">
      <main className="flex-grow flex flex-col lg:flex-row h-screen items-center justify-center text-center p-6 lg:px-12 overflow-hidden">
        {/* Left Section */}
        <div className="lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
          <img
            src={bgImage}
            alt="Developers Image"
            className="w-full lg:w-4/5 rounded-lg"
          />
        </div>
        {/* Right Section */}
        <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-start">
          <h1 className="text-orange-500 text-base font-semibold tracking-wide uppercase mb-3">
            A Social Network for Developers 🚀
          </h1>

          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-left">
            <span className="text-blue-500">Code. Connect. Coffee.</span>
            <br /> Find devs who debug life with you.
          </h2>

          <p className="text-yellow-100 font-semibold text-lg italic mb-10">
            Because sometimes{" "}
            <span className="text-green-600 font-bold">git push </span>
            isn’t enough to feel connected. 💻
          </p>

          <div className="flex flex-col items-center lg:items-start gap-8">
            <Link
              to="/signup"
              className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-300 hover:scale-105 transition transform duration-300 shadow-lg"
            >
              🚀 Join for Free
            </Link>
            <p className="text-sm text-gray-400">
              Already with us?{" "}
              <Link
                to="/login"
                className="text-blue-500 font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
