import styles from "../stylesheets/SearchFriend.module.css";

const SearchFriend = (props) => {
  const findFriend = async (e) => {
    try {
      if (e.target.value) {
        for (const friend of props.user.friends) {
          if (friend.username === e.target.value) {
            const fetchUser = await fetch(`/api/search/${e.target.value}`);
            const data = await fetchUser.json();
            props.setCurrentChat(data);
            return;
          } else {
            props.setCurrentChat(props.user.friends[0]);
          }
        }
      } else {
        props.setCurrentChat(props.user.friends[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="" method="post">
      <label htmlFor="friend_search"></label>
      <input
        type="text"
        name="friend_search"
        id="friend_search"
        onChange={findFriend}
        placeholder="Search friend"
      />
    </form>
  );
};

export default SearchFriend;
