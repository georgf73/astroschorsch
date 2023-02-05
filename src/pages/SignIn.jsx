import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import styles from "./SignIn.module.css";
import { ReactComponent as ArrorRightIcon } from "../components/assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../components/assets/svg/visibilityIcon.svg";
import Card from "../components/UI/Card";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const formChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error('Ungültige Nutzerangaben');
    }
  };
  return (
    <>
      <div className={styles.pageContainer}>
        <Card>
          <h1 className={styles.pageHeader}>Willkommen zurück</h1>
        </Card>

        <Card>
          <h3>Please Login</h3>
          <form onSubmit={onSubmitHandler}>
            <input
              type="email"
              placeholder="eMail"
              id="email"
              className={styles.emailInput}
              value={email}
              onChange={formChangeHandler}
            />
            <div className={styles.passwordInputDiv}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.passwordInput}
                placeholder="Passwort"
                id="password"
                value={password}
                onChange={formChangeHandler}
              />
              <img
                src={visibilityIcon}
                alt="Show Password"
                className={styles.showPassword}
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to="/forgot-password" className={styles.forgotPasswordLink}>
              Passwort Vergessen
            </Link>
            <div className={styles.signInBar}>
              <p className={styles.signInText}>Anmelden</p>
              <button className={styles.signInButton}>
                <ArrorRightIcon fill="white" width="34px" height="34px" />
              </button>
            </div>
            <Link to="/sign-up">Registrieren</Link>
          </form>
        </Card>
      </div>
    </>
  );
};

export default SignIn;
