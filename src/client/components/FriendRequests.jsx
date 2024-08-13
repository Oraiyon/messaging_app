import styles from "../stylesheets/FriendRequests.module.css";
import DisplayProfilePicture from "./DisplayProfilePicture";

const FriendRequests = (props) => {
  const removeFriendRequest = async (request) => {
    try {
      // Use body instead of url?
      const fetchUser = await fetch(
        `/api/friendrequest/remove/${props.user._id}/${request.receiver._id === props.user._id ? request.sender._id : request.receiver._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ friendRequestId: request._id })
        }
      );
      const data = await fetchUser.json();
      props.setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptFriendRequest = async (request) => {
    try {
      // Check
      const fetchUser = await fetch(
        `/api/friendrequest/accept/${props.user._id}/${request.receiver._id === props.user._id ? request.sender._id : request.receiver._id}`,
        { method: "PUT" }
      );
      const data = await fetchUser.json();
      props.setUser(data);
      props.setCurrentChat(data.friends[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const PictureHandler = (props) => {
    if (props.request.sender._id !== props.user._id) {
      return <DisplayProfilePicture profile={props.request.sender} />;
    } else {
      return <DisplayProfilePicture profile={props.request.receiver} />;
    }
  };

  const ButtonHandler = (props) => {
    if (props.request.sender._id !== props.user._id) {
      return (
        <>
          <button onClick={() => acceptFriendRequest(props.request)}>Accept</button>
          <button onClick={() => removeFriendRequest(props.request)}>Decline</button>
        </>
      );
    } else {
      return <button onClick={() => removeFriendRequest(props.request)}>Unsend</button>;
    }
  };

  // Separate friend requests for sent or received?
  return (
    <div
      className={
        props.displayFriendRequests ? styles.friend_requests_displayed : styles.friend_requests
      }
    >
      <h3>Friend Requests</h3>
      {props.user.friendRequests.length ? (
        <div className={styles.friend_requests_info}>
          {props.user.friendRequests.map((request) => (
            <div key={request._id} className={styles.friend_request}>
              <div>
                <PictureHandler user={props.user} request={request} />
                <p>
                  {request.sender.username === props.user.username
                    ? request.receiver.username
                    : request.sender.username}
                </p>
              </div>
              <div className={styles.friend_request_inputs}>
                <ButtonHandler user={props.user} request={request} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No friend requests...</p>
      )}
    </div>
  );
};

export default FriendRequests;
