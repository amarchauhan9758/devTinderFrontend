import React, { useState } from "react";
import UserCards from "./UserCards";
import axios from "axios";
import { BASE_URL } from "../utils/globalApi";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/strore/userSlice";

function EditProfile({ user }) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user?.about);
  const [gender, setGender] = useState(user?.gender);
  const [skillsInput, setSkillsInput] = useState(
    user?.skills?.join(", ") || ""
  );

  const [profileURL, setProfileURL] = useState(user?.profileURL);
  const [error, setError] = useState();

  const handleUpdateProfile = async () => {
    setError(null);

    if (!firstName || !lastName || !age || !profileURL || !gender) {
      setError({ message: "Please fill in all fields." });
      return;
    }

    if (isNaN(age) || parseInt(age) <= 0) {
      setError({ message: "Please enter a valid age." });
      return;
    }

    const skills = skillsInput
      ?.split(",")
      ?.map((s) => s.trim())
      ?.filter(Boolean); // Convert to array

    try {
      const responseData = await axios.patch(
        BASE_URL + "/profile/update",
        {
          firstName,
          lastName,
          age,
          about,
          gender,
          profileURL,
          skills,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(responseData?.data));
      console.log(responseData, "line no 33");
    } catch (err) {
      setError(err.message || "Failed to update profile. Try again later.");
    }
  };

  const inputStyles =
    "input input-bordered w-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500";

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-300 to-indigo-400 p-6 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-6xl w-full">
        {/* Left Side - Form */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Edit Profile</h1>
          {/* Common Input Style */}
          const inputStyles = "input input-bordered w-full bg-gray-100
          text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500";
          <div>
            <label className="label-text font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className={inputStyles}
            />
          </div>
          <div>
            <label className="label-text font-medium text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className={inputStyles}
            />
          </div>
          <div>
            <label className="label-text font-medium text-gray-600">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className={inputStyles}
            />
          </div>
          <div>
            <label className="label-text font-medium text-gray-600">
              Profile URL
            </label>
            <input
              type="text"
              value={profileURL}
              onChange={(e) => setProfileURL(e.target.value)}
              placeholder="Profile image URL"
              className={inputStyles}
            />
          </div>
          <div>
            <label className="label-text font-medium text-gray-600">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered w-full bg-gray-100 text-gray-800"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div>
            <label className="label-text font-medium text-gray-600">
              About
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered w-full bg-gray-100 text-gray-800"
              placeholder="Write something about yourself..."
              rows={4}
            ></textarea>
          </div>
          <div>
            <label className="label-text font-medium text-gray-600">
              Skills{" "}
              <span className="text-sm text-gray-500">(comma separated)</span>
            </label>
            <textarea
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="textarea textarea-bordered w-full bg-gray-100 text-gray-800"
              placeholder="e.g., React, JavaScript, Tailwind"
              rows={2}
            ></textarea>
          </div>
          {error && <p className="text-red-500">{error?.message}</p>}
          <div className="text-center">
            <button
              onClick={handleUpdateProfile}
              className="btn btn-primary px-8 mt-4"
            >
              Save Profile
            </button>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Preview</h2>
          <UserCards
            userData={{
              firstName,
              lastName,
              age,
              about,
              profileURL,
              gender,
              skills:
                skillsInput &&
                skillsInput
                  ?.split(",")
                  ?.map((s) => s?.trim())
                  ?.filter(Boolean),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
