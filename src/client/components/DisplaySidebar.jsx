import Icon from "@mdi/react";
import { mdiDotsHorizontal } from "@mdi/js";

const DisplaySidebar = (props) => {
  const displaySidebar = () => {
    if (!props.sidebarContainer.style.display || props.sidebarContainer.style.display === "none") {
      props.sidebarContainer.style.display = "flex";
    } else {
      props.sidebarContainer.style.display = "none";
    }
  };
  return <Icon path={mdiDotsHorizontal} size={1} onClick={displaySidebar} color="white" />;
};

export default DisplaySidebar;
