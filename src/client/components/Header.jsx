import styles from "../stylesheets/Header.module.css";
import DisplaySidebar from "./DisplaySidebar";

const Header = (props) => {
  const displaySearch = () => {
    props.setFoundUser(null);
    props.searchUserInput.value = "";
    if (window.innerWidth <= 768) {
      props.setFriendsListHidden(true);
    }
    props.setDisplayFriendRequests(false);
    if (props.displaySearch) {
      props.setDisplaySearch(false);
      props.setChatHidden(false);
    } else {
      props.setDisplaySearch(true);
      props.setChatHidden(true);
    }
  };

  const displayFriendRequests = () => {
    if (window.innerWidth <= 768) {
      props.setFriendsListHidden(true);
    }
    props.setDisplaySearch(false);
    if (props.displayFriendRequests) {
      props.setDisplayFriendRequests(false);
      props.setChatHidden(false);
    } else {
      props.setDisplayFriendRequests(true);
      props.setChatHidden(true);
    }
  };

  const displayFriendsList = () => {
    props.setDisplaySearch(false);
    props.setDisplayFriendRequests(false);
    if (props.friendsListHidden) {
      props.setFriendsListHidden(false);
      props.setChatHidden(true);
    } else {
      props.setFriendsListHidden(true);
      props.setChatHidden(false);
    }
  };

  return (
    <header className={styles.header_container}>
      <div className={styles.account_links}>
        <DisplaySidebar sidebarContainer={props.sidebarContainer} />
        <div>
          {!props.account ? (
            <>
              <button onClick={displayFriendsList} className={styles.friends_list_button}>
                Friends
              </button>
              <button onClick={displaySearch}>Search</button>
              <button onClick={displayFriendRequests}>Friend Requests</button>
            </>
          ) : (
            ""
          )}
          <button>
            <a href="/logout">Logout</a>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
