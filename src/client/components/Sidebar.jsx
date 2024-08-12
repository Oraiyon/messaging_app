import { Link } from "react-router-dom";
import styles from "../stylesheets/Sidebar.module.css";
import DisplayProfilePicture from "./DisplayProfilePicture";
import DisplaySidebar from "./DisplaySidebar";

const Sidebar = (props) => {
  const hideSidebar = () => {
    props.sidebarContainer.style.display = "none";
  };

  return (
    <div className={styles.sidebar + " sidebar_container"}>
      <DisplaySidebar sidebarContainer={props.sidebarContainer} />
      <DisplayProfilePicture profile={props.user} />
      <Link to={`/${props.user._id}/profile/messages`} onClick={hideSidebar}>
        Messages
      </Link>
      <Link to={`/${props.user._id}/profile/account`} onClick={hideSidebar}>
        Account
      </Link>
    </div>
  );
};

export default Sidebar;
