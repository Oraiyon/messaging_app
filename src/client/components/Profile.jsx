import { useEffect, useState } from "react";
import Login from "./Login";
import { Outlet } from "react-router-dom";
import styles from "../stylesheets/Profile.module.css";
import Sidebar from "./Sidebar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [foundUser, setFoundUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentMessages, setCurrentMessages] = useState(null);

  // Change?
  const searchUserInput = document.querySelector("#searchUser");
  const sidebarContainer = document.querySelector(".sidebar_container");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // /:id/profile/messages
        const fetchUser = await fetch(`/api${window.location.pathname}`);
        const data = await fetchUser.json();
        setUser(data);
        if (data.friends.length) {
          setCurrentChat(data.friends[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <div className={styles.profile_container}>
      <Sidebar user={user} sidebarContainer={sidebarContainer} />
      <Outlet
        context={[
          user,
          setUser,
          foundUser,
          setFoundUser,
          currentChat,
          setCurrentChat,
          currentMessages,
          setCurrentMessages,
          searchUserInput,
          sidebarContainer
        ]}
      />
    </div>
  );
};

export default Profile;
