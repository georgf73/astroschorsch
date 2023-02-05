import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import Header from "../components/Header";
import "./createimage.scss";
import { toast } from "react-toastify";

const CreateImage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    klasse: "",
    art: "",
    katalogId: "",
    beschreibung: "",
    name: "",
    entfernung: 0,
  });

  const { klasse, art, katalogId, name, beschreibung, entfernung, bildUrl } =
    formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //Form validations

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };


    const docRef = await addDoc(collection(db, "objects"), formDataCopy);
    setLoading(false);
    toast.success("Objekt wurde erfasst");
    navigate(`/objects`);

    setLoading(false);
  };

  const onMutate = (e) => {

      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }))
    }
  

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="createImage">
      <Header />
      <main className="createImageMain">
        <div className="createImageDetailsHeader">
          <h2 className="createImageDetailsText">Objekt erfassen</h2>
        </div>
        <form onSubmit={onSubmit}>
          <label className="createImageFormLabel">
            Beschreibung des Objekts
          </label>
          <textarea
            className="formInputBeschreibung"
            id="beschreibung"
            onChange={onMutate}
            value={beschreibung}
            rows="4"
            cols="36"
          />
          <div className="formTeleskopFlex">
            <div>
              <label className="createImageFormLabel">Klasse</label>
              <input
                className="formInputKlasse"
                type="text"
                id="klasse"
                onChange={onMutate}
                value={klasse}
                maxLength="32"
              />
            </div>
            <div>
              <label className="createImageFormLabel">Art</label>
              <input
                className="formInputArt"
                type="text"
                id="art"
                onChange={onMutate}
                value={art}
                maxLength="32"
                minLength="4"
              />
            </div>
          </div>
          <div className="formTeleskopFlex">
            <div>
              <label className="createImageFormLabel">Katalog-ID</label>
              <input
                className="formInputKatalogId"
                type="text"
                id="katalogId"
                value={katalogId}
                onChange={onMutate}
                maxLength="32"
                minLength="2"
              />
            </div>
            <div>
              <label className="createImageFormLabel">Objekt-Name</label>
              <input
                className="formInputBeschreibung"
                type="text"
                id="name"
                value={name}
                onChange={onMutate}
                maxLength="32"
              />
            </div>
          </div>

          <label className="createImageFormLabel">
            Entfernung in Lichtjahren
          </label>
          <input
            className="formInputEntfernung"
            type="number"
            id="entfernung"
            min="0"
            step="1"
            value={entfernung}
            onChange={onMutate}
          />

          <button type="submit" className="primaryButton createImageButton">
            Einstellen
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateImage;
