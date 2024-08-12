import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Messages.module.css";
import SearchUser from "./SearchUser";
import FriendRequests from "./FriendRequests";
import FriendsList from "./FriendsList";
import Header from "./Header";
import { useEffect, useState } from "react";

const Messages = () => {
  const [
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
  ] = useOutletContext();

  // Change names?
  const [friendsListHidden, setFriendsListHidden] = useState(
    window.innerWidth > 768 ? false : true
  );
  const [chatHidden, setChatHidden] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [displayFriendRequests, setDisplayFriendRequests] = useState(false);

  const handleMessagesPageResize = () => {
    if (window.innerWidth > 768) {
      setFriendsListHidden(false);
      if (displaySearch || displayFriendRequests) {
        setChatHidden(true);
      } else {
        setChatHidden(false);
      }
    } else {
      if (!chatHidden || displaySearch || displayFriendRequests) {
        setFriendsListHidden(true);
      }
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const messagesFetch = await fetch(`/api/message/${user._id}/${currentChat._id}`);
          const data = await messagesFetch.json();
          setCurrentMessages(data);
        } else {
          setCurrentMessages(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    window.addEventListener("resize", handleMessagesPageResize);
    return () => window.removeEventListener("resize", handleMessagesPageResize);
  });

  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      if (!text.current.value.length) {
        return;
      }
      const messageFetch = await fetch(`/api/message/${user._id}/${currentChat._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.current.value })
      });
      text.current.value = "";
      // Returns sender & receiver
      const data = await messageFetch.json();
      setUser(data.sender);
      setCurrentChat(data.receiver);
    } catch (error) {
      console.log(error);
    }
  };

  const DisplayMessages = () => {
    if (currentChat && currentMessages) {
      return (
        <div className={styles.messages}>
          {currentMessages.map((message) => (
            <div
              key={message._id}
              className={message.sender === user._id ? styles.user_message : styles.friend_message}
            >
              <p>{message.message}</p>
              <p>{message.date_sent_formatted}</p>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <Header
        user={user}
        setFoundUser={setFoundUser}
        searchUserInput={searchUserInput}
        sidebarContainer={sidebarContainer}
        friendsListHidden={friendsListHidden}
        setFriendsListHidden={setFriendsListHidden}
        chatHidden={chatHidden}
        setChatHidden={setChatHidden}
        displaySearch={displaySearch}
        setDisplaySearch={setDisplaySearch}
        displayFriendRequests={displayFriendRequests}
        setDisplayFriendRequests={setDisplayFriendRequests}
      />
      <div className={styles.messages_container}>
        <FriendsList
          user={user}
          setUser={setUser}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          friendsListHidden={friendsListHidden}
          setFriendsListHidden={setFriendsListHidden}
          setChatHidden={setChatHidden}
          setDisplaySearch={setDisplaySearch}
          setDisplayFriendRequests={setDisplayFriendRequests}
        />
        <div className={chatHidden ? styles.chat_hidden : styles.chat}>
          <DisplayMessages />
          {currentChat ? (
            <form action="" method="post">
              <label htmlFor="message"></label>
              <input
                type="text"
                name="message"
                className={styles.text}
                id="message"
                placeholder="Send a message"
              />
              <button onClick={sendMessage} className={styles.send_message_button}>
                Send
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
        <SearchUser
          user={user}
          setUser={setUser}
          foundUser={foundUser}
          setFoundUser={setFoundUser}
          displaySearch={displaySearch}
        />
        <FriendRequests
          user={user}
          setUser={setUser}
          setCurrentChat={setCurrentChat}
          displayFriendRequests={displayFriendRequests}
        />
      </div>
    </>
  );
};

export default Messages;
