import { Link } from "react-router-dom";
import styles from "../stylesheets/Login.module.css";
import { useState, useRef } from "react";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const usernameWarning = useRef(null);
  const passwordWarning = useRef(null);
  const wrongUsernameOrPassword = useRef(null);
  const passwordInput = useRef(null);

  // Find way to say if user is not found in database
  const validateLoginInputs = async (e) => {
    try {
      e.preventDefault();
      // Unnecessary checks?
      if (!username && !password) {
        setValidUsername(false);
        setValidPassword(false);
        usernameWarning.current.style.display = "block";
        passwordWarning.current.style.display = "block";
      } else if (!username) {
        setValidUsername(false);
        usernameWarning.current.style.display = "block";
      } else if (!password) {
        setValidPassword(false);
        passwordWarning.current.style.display = "block";
      } else {
        // Check if already logged in
        const fetchUser = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password })
        });
        const data = await fetchUser.json();
        if (!data) {
          setValidUsername(false);
          setValidPassword(false);
          usernameWarning.current.style.display = "none";
          passwordWarning.current.style.display = "none";
          wrongUsernameOrPassword.current.style.display = "block";
          return;
        }
        // fetch doesn't allow redirects from server
        window.location.href = `/${data._id}/profile/messages`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showPassword = () => {
    if (passwordInput.current.type === "password") {
      passwordInput.current.type = "text";
    } else {
      passwordInput.current.type = "password";
    }
  };

  return (
    <form method="post" className={styles.login_form} onSubmit={validateLoginInputs}>
      <h2>Login</h2>
      <div className={styles.form_container}>
        <fieldset className={validUsername ? "" : styles.invalid_input}>
          <legend>Username</legend>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className={styles.username_warning} ref={usernameWarning}>
            Enter a username
          </p>
        </fieldset>
        <fieldset className={validPassword ? "" : styles.invalid_input}>
          <legend>Password</legend>
          <label htmlFor="password">Password</label>
          <div className={styles.password_inputs}>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordInput}
            />
            <div>
              <p>Show password</p>
              <label htmlFor="show_password"></label>
              <input
                type="checkbox"
                name="show_password"
                id="show_password"
                onClick={showPassword}
              />
            </div>
          </div>
          <p className={styles.password_warning} ref={passwordWarning}>
            Enter a password
          </p>
        </fieldset>
        <p className={styles.wrongUsernameOrPassword} ref={wrongUsernameOrPassword}>
          Wrong username or password
        </p>
      </div>
      <button>Login</button>
      <p>
        Don't have an account yet? <Link to={"/signup"}>Sign Up!</Link>
      </p>
    </form>
  );
};

export default Login;
