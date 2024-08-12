import { Link } from "react-router-dom";
import styles from "../stylesheets/Signup.module.css";
import { useRef, useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);

  const usernameWarning = useRef(null);
  const passwordWarning = useRef(null);
  const confirmPasswordWarning = useRef(null);

  const validateUsername = (e) => {
    if (e.target.value.length > 0 && e.target.value.length < 3) {
      setValidUsername(false);
    } else {
      setValidUsername(true);
    }
    setUsername(e.target.value);
  };

  const validatePassword = (e) => {
    if (e.target.value.length > 0 && e.target.value.length < 6) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
    if (
      (!e.target.value && confirmPassword) ||
      (e.target.value !== confirmPassword && confirmPassword)
    ) {
      setValidConfirmPassword(false);
    } else if (!e.target.value || e.target.value === confirmPassword) {
      setValidConfirmPassword(true);
    }
    setPassword(e.target.value);
  };

  const validateConfirmPassword = (e) => {
    if (password && e.target.value !== password) {
      setValidConfirmPassword(false);
    } else {
      setValidConfirmPassword(true);
    }
    setConfirmPassword(e.target.value);
  };

  const validateSignUpInputs = (e) => {
    if (!username || !password || !confirmPassword) {
      e.preventDefault();
      if (!username || (username.length < 3 && password.length < 6)) {
        setValidUsername(false);
        setValidPassword(false);
        usernameWarning.current.style.display = "block";
        passwordWarning.current.style.display = "block";
      } else if (!username || username.length < 3) {
        setValidUsername(false);
        usernameWarning.current.style.display = "block";
      } else if (!password || password.length < 6) {
        setValidPassword(false);
        passwordWarning.current.style.display = "block";
      }
      if (!password || !confirmPassword || password !== confirmPassword) {
        setValidConfirmPassword(false);
        confirmPasswordWarning.current.style.display = "block";
      }
    }
  };

  return (
    <form method="post" className={styles.signup_form} onSubmit={validateSignUpInputs}>
      <h2>Sign Up</h2>
      <div className={styles.form_container}>
        <fieldset className={validUsername ? "" : styles.invalid_input}>
          <legend className={validUsername ? "" : styles.invalid_input}>Username</legend>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" onChange={validateUsername} />
          <p className={styles.username_warning} ref={usernameWarning}>
            Must be atleast 3 characters long
          </p>
        </fieldset>
        <fieldset className={validPassword ? "" : styles.invalid_input}>
          <legend className={validPassword ? "" : styles.invalid_input}>Password</legend>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={validatePassword} />
          <p className={styles.password_warning} ref={passwordWarning}>
            Must be atleast 6 characters long
          </p>
        </fieldset>
        <fieldset className={validConfirmPassword ? "" : styles.invalid_input}>
          <legend className={validConfirmPassword ? "" : styles.invalid_input}>
            Confirm Password
          </legend>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={validateConfirmPassword}
          />
          <p className={styles.confirm_password_warning} ref={confirmPasswordWarning}>
            Must match your password
          </p>
        </fieldset>
      </div>
      <button>Sign Up</button>
      <p>
        Already have an account? <Link to={"/login"}>Login!</Link>
      </p>
    </form>
  );
};

export default SignUp;
