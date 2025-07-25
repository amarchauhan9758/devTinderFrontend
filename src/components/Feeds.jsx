import React from "react";
import UserCards from "./UserCards";
import axios from "axios";
import { BASE_URL } from "../utils/globalApi";
import Loader from "./utils/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeeds } from "./utils/strore/feedSlice";

function Feeds() {
  const dispatch = useDispatch();
  // const feedData = useSelector((store)=> store.addFeeds)

  const feedData = useSelector((store) => store?.feed);
  console.log(feedData, "line no 15");


  const getFeedData = async () => {
    try {
      const responseData = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeeds(responseData.data));
      console.log(responseData.data, "line no 16");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);

  console.log(feedData, "line no 40");

  return (
    feedData &&
    <div className="flex justify-center">
      <UserCards userData={feedData[0]} />
    </div>
  );
}

export default Feeds;
