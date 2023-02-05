import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp} from "firebase/firestore"
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import styles from "./SignIn.module.css";
import { ReactComponent as ArrorRightIcon } from "../components/assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../components/assets/svg/visibilityIcon.svg";
import Card from "../components/UI/Card";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
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
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      // Jetzt wird der user geschrieben
      await setDoc(doc(db, 'users', user.uid), formDataCopy)      
      navigate("/");
    } catch (error) {
      toast.error('Da ist wohl etwas schiefgegangen');
    }
  };
  return (
    <>
      <header>
        <div className={styles.pageContainer}>
          <Card>
            <p className="pageHeader">Willkommen zurück</p>
          </Card>
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              placeholder="Benutzername"
              id="name"
              className={styles.nameInput}
              value={name}
              onChange={formChangeHandler}
            />
            <input
              type="email"
              placeholder="eMail"
              id="email"
              className={styles.emailInput}
              value={email}
              onChange={formChangeHandler}
            />
            <div className="passwordInputDiv">
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
            <div className={styles.signUpBar}>
              <p className={styles.signUpText}>Registrieren</p>
              <button className={styles.signUpButton}>
                <ArrorRightIcon fill="white" width="34px" height="34px" />
              </button>
            </div>
          </form>
        </div>
      </header>
    </>
  );
};

export default SignUp;
