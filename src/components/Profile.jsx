import React, { useState } from "react";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState();

  const handleUpdateProfile = () => {
    console.log(object);
  };
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-indigo-200 to-rose-500 flex items-center justify-center px-4">
        <div className="w-full max-w-md shadow-xl rounded-2xl bg-white p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-300">
                  First Name
                </span>
              </label>
              <input
                type="email"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-400">
                  Last Name
                </span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your password"
                className="input  w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-400">
                  Last Name
                </span>
              </label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your password"
                className="input  w-full"
                required
              />
            </div>

            <div className="dropdown w-full dropdown-bottom">
              <div tabIndex={0} role="button" className="btn m-1">
                {gender ? gender : "Gender"}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a onClick={() => handleGenderSelect("male")}>Male</a>
                </li>
                <li>
                  <a onClick={() => handleGenderSelect("female")}>Female</a>
                </li>
                <li>
                  <a onClick={() => handleGenderSelect("others")}>Others</a>
                </li>
              </ul>
            </div>
            <div>
              <label className="label">
                <span className="label-text font-medium text-gray-400">
                  About
                </span>
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea"
                placeholder="About"
              ></textarea>
            </div>
            <p className="text-red-500"> {error}</p>
            <button
              onClick={() => handleUpdateProfile()}
              className="btn btn-primary w-full"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
