import styles from "../stylesheets/SearchUser.module.css";
import DisplayProfilePicture from "./DisplayProfilePicture";

const SearchUser = (props) => {
  const searchUserProfiles = async (e) => {
    try {
      if (!e.target.value || e.target.value === props.user.username) {
        props.setFoundUser(null);
        return;
      }
      const searchUser = await fetch(`/api/search/${e.target.value}`);
      const data = await searchUser.json();
      if (data) {
        props.setFoundUser(data);
      } else {
        props.setFoundUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendFriendRequest = async (e) => {
    try {
      e.preventDefault();
      const fetchFriendRequest = await fetch(
        `/api/friendrequest/send/${props.user._id}/${props.foundUser._id}`,
        {
          method: "POST"
        }
      );
      const data = await fetchFriendRequest.json();
      props.setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFriendRequest = async (e) => {
    try {
      e.preventDefault();
      const fetchUser = await fetch(
        `/api/friendrequest/remove/${props.user._id}/${props.foundUser._id}`,
        { method: "PUT" }
      );
      const data = await fetchUser.json();
      props.setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptFriendRequest = async (e) => {
    try {
      e.preventDefault();
      const fetchUser = await fetch(
        `/api/friendrequest/accept/${props.user._id}/${props.foundUser._id}`,
        { method: "PUT" }
      );
      const data = await fetchUser.json();
      props.setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFriend = async (e, friend) => {
    try {
      e.preventDefault();
      const fetchUser = await fetch(`/api/friend/${props.user._id}/${friend._id}`, {
        method: "PUT"
      });
      const data = await fetchUser.json();
      props.setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const FriendRequestButton = () => {
    let sent = false;
    let friendReq;
    for (const friend of props.user.friends) {
      if (props.foundUser && props.foundUser._id === friend._id) {
        return <button onClick={(e) => removeFriend(e, friend)}>Remove Friend</button>;
      }
    }
    for (const request of props.user.friendRequests) {
      if (
        (props.foundUser && request.sender.username === props.foundUser.username) ||
        (props.foundUser && request.receiver.username === props.foundUser.username)
      ) {
        friendReq = request;
        sent = true;
        break;
      }
    }
    if (sent) {
      if (props.user._id === friendReq.sender.id) {
        return (
          <button
            onClick={removeFriendRequest}
            className={
              props.foundUser && props.foundUser.username
                ? styles.active_friend_button
                : styles.inactive_friend_button
            }
          >
            Unsend Request
          </button>
        );
      } else {
        return (
          <div>
            <button
              onClick={acceptFriendRequest}
              className={
                props.foundUser && props.foundUser.username
                  ? styles.active_friend_button
                  : styles.inactive_friend_button
              }
            >
              Accept Request
            </button>
            <button
              onClick={removeFriendRequest}
              className={
                props.foundUser && props.foundUser.username
                  ? styles.active_friend_button
                  : styles.inactive_friend_button
              }
            >
              Decline Request
            </button>
          </div>
        );
      }
    } else {
      return (
        <button
          onClick={sendFriendRequest}
          className={
            props.foundUser && props.foundUser.username
              ? styles.active_friend_button
              : styles.inactive_friend_button
          }
        >
          Send Friend Request
        </button>
      );
    }
  };

  return (
    <form
      action=""
      className={props.displaySearch ? styles.search_form_displayed : styles.search_form}
    >
      <h3>Search User</h3>
      <label htmlFor="searchUser"></label>
      <input
        type="text"
        name="searchUser"
        id="searchUser"
        placeholder="Enter username"
        onChange={searchUserProfiles}
      />
      <div className={styles.searched_user}>
        <div>
          <div className={styles.foundUser_info}>
            {props.foundUser ? <DisplayProfilePicture profile={props.foundUser} /> : ""}
            <h3>{props.foundUser ? props.foundUser.username : ""}</h3>
          </div>
          <p className={props.foundUser && props.foundUser.bio ? styles.foundUser_bio : ""}>
            {props.foundUser ? props.foundUser.bio : ""}
          </p>
        </div>
        <FriendRequestButton />
      </div>
    </form>
  );
};

export default SearchUser;
