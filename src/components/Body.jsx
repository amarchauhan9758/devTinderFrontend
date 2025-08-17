import React from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/globalApi";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/strore/userSlice";
import { useEffect } from "react";

function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const responseData = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(responseData.data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }

      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="">
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default Body;
