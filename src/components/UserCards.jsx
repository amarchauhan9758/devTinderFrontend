import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/globalApi";
import Loader from "./utils/loader";
import ApiErrorMessage from "../utils/ApiErrorMessage";
import { useDispatch } from "react-redux";
import { removedFeeds } from "./utils/strore/feedSlice";

function UserCards({ userData }) {
  const dispatch = useDispatch();
  const [openloader, setOpenLoader] = useState(false);
  const [openApiModel, setOpenApiModel] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!userData) {
    return "Feeds Empty";
  }
  const {
    firstName,
    lastName,
    age,
    profileURL,
    about,
    gender,
    skills,
    description,
    _id,
  } = userData;

  const handleRequest = async (status, id) => {
    setOpenLoader(true);
    try {
      const responseData = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        }
      );
      setOpenLoader(false);
      dispatch(removedFeeds(id));
    } catch (err) {
      setOpenLoader(false);
      setOpenApiModel(true);
      setErrorMessage(err.message || "Something went wrong..!");
    }
  };

  return (
    <div className="bg-gray-900  text-white rounded-2xl shadow-lg overflow-hidden max-w-md w-full">
      <figure className="relative h-auto w-full overflow-hidden">
        <img
          src={profileURL || "https://via.placeholder.com/500x250"}
          alt={`${firstName} ${lastName}`}
          className="object-cover w-full h-[24rem]"
        />
      </figure>
      <div className="p-6 space-y-3">
        <h2 className="text-2xl font-semibold">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-gray-400">
          Age: <span className="text-white font-medium">{age}</span> | Gender:{" "}
          <span className="text-white font-medium">{gender}</span>
        </p>
        {about && <p className="text-gray-300">{about}</p>}

        {skills && (
          <div>
            <h4 className="font-semibold text-gray-200">Skills:</h4>
            <ul className="flex flex-wrap gap-2 mt-1">
              {skills.map((skill, idx) => (
                <li
                  key={idx}
                  className="bg-gray-700 text-sm px-3 py-1 rounded-full text-white"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => handleRequest("ignored", _id)}
            className="btn btn-outline btn-error"
          >
            Ignore
          </button>
          <button
            onClick={() => handleRequest("interested", _id)}
            className="btn btn-primary"
          >
            Interested
          </button>
        </div>
      </div>
      <Loader openloader={openloader} />
      <ApiErrorMessage
        openApiModel={openApiModel}
        setOpenApiModel={setErrorMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default UserCards;
