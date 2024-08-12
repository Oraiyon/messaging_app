import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Account.module.css";
import { useRef, useState } from "react";
import Header from "./Header";
import DisplayProfilePicture from "./DisplayProfilePicture";

const Account = () => {
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

  const editUsernameRef = useRef(null);
  const invalidUsernameRef = useRef(null);
  const formRef = useRef(null);
  const editBioRef = useRef(null);
  const invalidBioRef = useRef(null);

  const setProfilePictureToDefault = async () => {
    try {
      if (user.picture) {
        const fetchUser = await fetch(`/api/${user._id}/profile/account/picture`, {
          method: "PUT"
        });
        const data = await fetchUser.json();
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SetToDefaultPicture = () => {
    if (user.picture) {
      return (
        <div className={styles.default_picture_button}>
          <button onClick={setProfilePictureToDefault}>Set Profile Picture To Default</button>
        </div>
      );
    }
  };

  const cancelProfilePictureEdit = (e) => {
    e.preventDefault();
    formRef.current.value = "";
  };

  const ProfilePictureForm = () => {
    if (user) {
      return (
        <form action="" className={styles.profile_picture_form}>
          <label htmlFor="picture">Profile Picture</label>
          <div>
            <input type="file" name="picture" id="picture" ref={formRef} />
            <button onClick={cancelProfilePictureEdit}>Cancel</button>
          </div>
        </form>
      );
    }
  };

  const UpdateBioForm = () => {
    return (
      <>
        <form className={styles.bio_form}>
          <label htmlFor="bio">Bio</label>
          <textarea name="bio" id="bio" defaultValue={user.bio} ref={editBioRef}></textarea>
        </form>
        <p className={styles.bio_warning} ref={invalidBioRef}>
          Max character count for Bio is 100
        </p>
      </>
    );
  };

  const saveChanges = async () => {
    try {
      // Username
      if (!editUsernameRef.current.value) {
        invalidUsernameRef.current.style.display = "none";
      } else if (
        editUsernameRef.current.value.length >= 3 &&
        editUsernameRef.current.value.length <= 10
      ) {
        const fetchUser = await fetch(`/api/${user._id}/profile/account/username`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ editName: editUsernameRef.current.value })
        });
        const data = await fetchUser.json();
        if (!data) {
          invalidUsernameRef.current.style.display = "flex";
        }
      } else {
        invalidUsernameRef.current.style.display = "flex";
      }
      // Profile Picture
      if (formRef.current.value) {
        const formData = new FormData();
        formData.append("file", formRef.current.files[0]);
        await fetch(`/api/${user._id}/profile/account/picture`, {
          method: "POST",
          body: formData
        });
      }
      // Bio
      if (editBioRef.current.value.length <= 100 && editBioRef.current.value !== user.bio) {
        const fetchUser = await fetch(`/api/${user._id}/profile/account/bio`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ editBio: editBioRef.current.value })
        });
        const data = await fetchUser.json();
        if (!data) {
          invalidBioRef.current.style.display = "flex";
        }
      }
      const fetchuser = await fetch(`/api/${user._id}/profile/messages`);
      const data = await fetchuser.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        user={user}
        setFoundUser={setFoundUser}
        searchUserInput={searchUserInput}
        account={true}
        sidebarContainer={sidebarContainer}
      />
      <div className={styles.account_container}>
        <DisplayProfilePicture profile={user} user={true} formRef={formRef} />
        <h3>{user.username}</h3>
        <div className={styles.edits}>
          <div className={styles.edit_name_inputs}>
            <label htmlFor="editName">Username</label>
            <input
              type="text"
              id="editName"
              name="editName"
              ref={editUsernameRef}
              placeholder={user.username}
              className={styles.new_name}
            />
            <p className={styles.username_taken_warning} ref={invalidUsernameRef}>
              Invalid username edit
            </p>
          </div>
          <ProfilePictureForm />
          <SetToDefaultPicture />
          <UpdateBioForm />
          <button onClick={saveChanges}>Save Changes</button>
        </div>
      </div>
    </>
  );
};

export default Account;
