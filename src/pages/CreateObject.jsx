import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp} from 'firebase/firestore'
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
    aufnahmeDatum: "",
    entfernung: 0,
    teleskop: "",
    brennweite: 0,
    kamera: "",
    montierung: "",
    bildUrl: "",
  });

  const {
    klasse,
    art,
    katalogId,
    name,
    beschreibung,
    aufnahmeDatum,
    entfernung,
    teleskop,
    brennweite,
    kamera,
    montierung,
    bildUrl,
  } = formData;

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

    //Store image in fi rebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.Uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const BildUrl = await storeImage(bildUrl).catch(() => {
      setLoading(false);
      toast.error("Fehler beim Upload");
      return
    })

    const formDataCopy = {
      ...formData,
      imgUrls: BildUrl,
      timestamp: serverTimestamp(),
    }

    delete formDataCopy.bildUrl

    const docRef = await addDoc(collection(db, 'aufnahmen'), formDataCopy)
    setLoading(false)
    toast.success('Bild wurde gespeichert')
    navigate(`/objects`)


    setLoading(false);
  };
  const onMutate = (e) => {
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        bildUrl: e.target.files[0],
      }));
    }
    if (!e.target.files) { 
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="createImage">
      <Header />
      <main className="createImageMain">
        <div className="createImageDetailsHeader">
          <h2 className="createImageDetailsText">Aufnahme hochladen</h2>
        </div>
        <form onSubmit={onSubmit}>
          <label className="createImageFormLabel">AufnahmeDatum</label>
          <input
            className="formInputDatum"
            type="date"
            id="aufnahmeDatum"
            value={aufnahmeDatum}
            onChange={onMutate}
          />
          <label className="createImageFormLabel">
            Beschreibung der Aufnahme
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
          <div className="formTeleskopFlex">
            <div>
              <label className="createImageFormLabel">Teleskop</label>
              <input
                className="formInputTeleskop"
                type="text"
                id="teleskop"
                value={teleskop}
                onChange={onMutate}
                required
              />
            </div>
            <div>
              <label className="createImageFormLabel">Brennweite (mm)</label>
              <input
                className="formInputBrennweite"
                type="number"
                id="brennweite"
                value={brennweite}
                onChange={onMutate}
                min="20"
                max="3000"
                step="1"
                required
              />
            </div>
          </div>
          <div className="formTeleskopFlex">
            <div>
              <label className="createImageFormLabel">Kamera</label>
              <input
                className="formInputKamera"
                type="text"
                id="kamera"
                value={kamera}
                onChange={onMutate}
                required
              />
            </div>
            <div>
              <label className="createImageFormLabel">Montierung</label>
              <input
                className="formInputMontierung"
                type="text"
                id="montierung"
                onChange={onMutate}
                value={montierung}
              />
            </div>
          </div>
          <label className="createImageFormLabel">Datei</label>
          <input
            className="formInputBild"
            type="file"
            id="bildUrl"
            accept=".jpg,.png,.jpeg"
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
