import { useState} from "react";
import { Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { MdCameraEnhance } from 'react-icons/md'
import { MdKeyboardArrowRight}  from 'react-icons/md'

import "./profile.scss";

const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //Update in Firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update in Firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("Fehler beim Update");
    }
  };

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };


  return (
    <div className="profile">
      <Header />
      <main className="profileMain">
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Konto</p>
          <p
            className="changePersonaldetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "erledigt" : "Ändern"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={onChangeHandler}
            ></input>
            <input
              type="text"
              id="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              disabled={!changeDetails}
              value={email}
              onChange={onChangeHandler}
            ></input>
          </form>
        </div>
        <Link to='/create-image' className="createImage">
<MdCameraEnhance size="36px" />
<p>Eine neue Aufnahme einstellen</p>
<MdKeyboardArrowRight size="36px" />

        </Link>

      </main>
    </div>
  );
};

export default Profile;
