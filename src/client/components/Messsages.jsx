import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Messages.module.css";
import SearchUser from "./SearchUser";
import FriendRequests from "./FriendRequests";
import FriendsList from "./FriendsList";
import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import Icon from "@mdi/react";
import { mdiCloseCircle } from "@mdi/js";

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
  const [deleteMessageId, setDeleteMessageId] = useState(null);

  const textRef = useRef(null);
  const searchUserButton = useRef(null);
  const searchUserValue = useRef(null);

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
      if (!textRef.current.value) {
        return;
      }
      const messageFetch = await fetch(`/api/message/${user._id}/${currentChat._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textRef.current.value })
      });
      textRef.current.value = "";
      // Returns sender & receiver
      const data = await messageFetch.json();
      setUser(data.sender);
      setCurrentChat(data.receiver);
    } catch (error) {
      console.log(error);
    }
  };

  const setDeleteMessageIdButton = (id) => {
    if (id === deleteMessageId) {
      setDeleteMessageId(null);
    } else {
      setDeleteMessageId(id);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const messagesFetch = await fetch(
        `/api/message/delete/${user._id}/${currentChat._id}/${id}`,
        { method: "PUT" }
      );
      const data = await messagesFetch.json();
      setCurrentMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const DisplayDeleteMessageButton = (props) => {
    if (
      props.message.sender === user._id &&
      props.message.id === deleteMessageId &&
      props.message.message !== "--Deleted Message--"
    ) {
      return (
        <button className={styles.delete_message_button}>
          <Icon path={mdiCloseCircle} onClick={() => deleteMessage(props.message._id)} />
        </button>
      );
    }
  };

  const DisplayMessages = () => {
    if (currentChat && currentMessages && !currentMessages.length) {
      return (
        <div className={styles.messages}>
          <p>No Messages</p>
        </div>
      );
    } else if (currentChat && currentMessages) {
      return (
        <div className={styles.messages}>
          {currentMessages.map((message) => (
            <div
              key={message._id}
              className={message.sender === user._id ? styles.user_message : styles.friend_message}
              onMouseEnter={() => setDeleteMessageId(message._id)}
              onMouseLeave={() => setDeleteMessageId(null)}
              onClick={() => setDeleteMessageIdButton(message._id)}
            >
              <div className={styles.message_info}>
                <p>{message.message}</p>
                <p>{message.date_sent_formatted}</p>
              </div>
              <DisplayDeleteMessageButton message={message} />
            </div>
          ))}
        </div>
      );
    }
  };

  const DisplayMessageInput = () => {
    if (currentChat) {
      return (
        <form action="" method="post">
          <label htmlFor="message"></label>
          <input
            type="text"
            name="message"
            className={styles.text}
            id="message"
            placeholder="Send a message"
            ref={textRef}
          />
          <button onClick={sendMessage} className={styles.send_message_button}>
            Send
          </button>
        </form>
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
        searchUserButton={searchUserButton}
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
          <DisplayMessageInput />
        </div>
        <SearchUser
          user={user}
          setUser={setUser}
          setCurrentChat={setCurrentChat}
          foundUser={foundUser}
          setFoundUser={setFoundUser}
          displaySearch={displaySearch}
          searchUserValue={searchUserValue}
        />
        <FriendRequests
          user={user}
          setUser={setUser}
          setCurrentChat={setCurrentChat}
          setFoundUser={setFoundUser}
          displayFriendRequests={displayFriendRequests}
          searchUserButton={searchUserButton}
          searchUserValue={searchUserValue}
        />
      </div>
    </>
  );
};

export default Messages;
