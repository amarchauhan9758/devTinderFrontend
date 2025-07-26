import React, { useState } from "react";
import UserCards from "./UserCards";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

function Profile() {
  const user = useSelector((store) => store?.user?.data);

  return <div>{user && <EditProfile user={user} />}</div>;
}

export default Profile;
