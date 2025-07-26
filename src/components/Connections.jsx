import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/globalApi";
import { useDispatch, useSelector } from "react-redux";
import {
  pendingRequest,
  pendingRequestRemove,
} from "./utils/strore/requestReceivedSlice";

function Connections() {
  const pendingUser = useSelector((store) => store.pendingRequest);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("connections");
  const [connections, setConnections] = useState([]);
  const [pending, setPending] = useState([]);

  const getAllConnections = async () => {
    try {
      const responseData = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(responseData.data);
      setConnections(responseData?.data?.data || []);

      const resPending = await axios.get(`${BASE_URL}/user/requests`, {
        withCredentials: true,
      });
      dispatch(pendingRequest(resPending?.data?.data));
      //   setPending(resPending?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(pending, "line no 57");

  useEffect(() => {
    getAllConnections();
  }, []);

  const handleAccept = async (status, id) => {
    try {
      const responseData = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(responseData, "line no 70");

      dispatch(pendingRequestRemove(id));
    } catch (error) {
      console.log(error.message);
    }

    const acceptedUser = pendingUser.find((u) => u.fromUser._id === id);
    setConnections([...connections, acceptedUser]);
  };

  console.log(pendingUser, "line no 58");

  const handleReject = async (status, id) => {
    try {
      const responseData = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        }
      );
      setPending(pendingUser.filter((u) => u.fromUser._id !== id));
      console.log(responseData, "line no 70");
    } catch (error) {
      console.log(error.message);
    }
    // setPending(pending.filter((u) => u._id !== id));
  };

  const renderUserCard = (user, isPending = false) => (
    <div
      key={user?._id}
      className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition"
    >
      <div className="flex items-center gap-4">
        <img
          src={user?.profileURL}
          alt={user?.firstName}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="font-semibold text-gray-800">
            {user.firstName + " " + user.lastName}
          </h4>
          <p className="text-sm text-gray-500">{user.about}</p>
        </div>
      </div>

      {isPending && (
        <div className="flex gap-2">
          <button
            onClick={() => handleAccept("accepted", user?._id)}
            className="btn btn-sm btn-success"
          >
            Accept
          </button>
          <button
            onClick={() => handleReject("rejected", user?._id)}
            className="btn btn-sm btn-outline btn-error"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
  return (
    <div>
      {" "}
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Connections</h2>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("connections")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "connections"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Connections ({connections?.length})
          </button>

          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "pending"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Pending ({pendingUser?.length})
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === "connections" &&
            connections.map((user) => renderUserCard(user))}
          {activeTab === "pending" &&
            pendingUser.map((item) => {
              console.log(item, "line no 152");
              const { _id, firstName, lastName, profileURL, about } =
                item?.fromUserId;
              return (
                <div
                  key={item._id}
                  className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={profileURL}
                      alt={firstName}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {firstName + " " + lastName}
                      </h4>
                      <p className="text-sm text-gray-500">{about}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept("accepted", item?._id)}
                      className="btn p-5  btn-sm btn-success"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject("rejected", item?._id)}
                      className="btn p-5 btn-sm btn-outline btn-error"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}

          {activeTab === "connections" && connections?.length === 0 && (
            <p className="text-gray-500 text-center">No connections yet.</p>
          )}
          {activeTab === "pending" && pendingUser?.length === 0 && (
            <p className="text-gray-500 text-center">No pending requests.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Connections;
