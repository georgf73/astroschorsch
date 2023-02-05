import { useState, useContext, useEffect } from "react";
import Button from "./UI/Button";
import Card from "./UI/Card";

import ObjectContext from "../context/ObjectContext";

const ObjectForm = () => {
  const [enteredObjectId, setEnteredObjectId] = useState("");
  const [enteredKatalog, setEnteredKatalog] = useState("");
  const [enteredObjectName, setEnteredObjectName] = useState("");
  const [enteredObjectKlasse, setEnteredObjectKlasse] = useState("");
  const [enteredObjectArt, setEnteredObjectArt] = useState("");
  const [enteredBeschreibungDe, setEnteredBeschreibungDe] = useState("");
  const [enteredBeschreibungEn, setEnteredBeschreibungEn] = useState("");
  const [enteredEntfernung, setEnteredEntfernung] = useState("");
  const [enteredFilename, setEnteredFilename] = useState(null);

  const { addObject, objectEdit, updateObject } = useContext(ObjectContext);

  useEffect(() => {
if (objectEdit.edit === true){ 
    setEnteredObjectId(objectEdit.item.objectKatalogId)
    setEnteredKatalog(objectEdit.item.objectKatalog)
    setEnteredObjectName(objectEdit.item.objectName);
    setEnteredObjectKlasse(objectEdit.item.objectKlasse);
    setEnteredObjectArt(objectEdit.item.objectArt);
    setEnteredBeschreibungDe(objectEdit.item.objectBeschreibungDe);
    setEnteredBeschreibungEn(objectEdit.item.objectBeschreibungEn);
    setEnteredEntfernung(objectEdit.item.objectEntfernung);
    setEnteredFilename(objectEdit.item.objectBild);

}
  },[objectEdit])

  const inputObjectIdHandler = (e) => {
    setEnteredObjectId(e.target.value);
  };
  const inputKatalogHandler = (e) => {
    setEnteredKatalog(e.target.value);
  };
  const inputObjectNameHandler = (e) => {
    setEnteredObjectName(e.target.value);
  };
  const inputObjectKlasseHandler = (e) => {
    setEnteredObjectKlasse(e.target.value);
  };

  const inputObjectArtHandler = (e) => {
    setEnteredObjectArt(e.target.value);
  };
  const inputBesxchreibungDeHandler = (e) => {
    setEnteredBeschreibungDe(e.target.value);
  };

  const inputBesxchreibungEnHandler = (e) => {
    setEnteredBeschreibungEn(e.target.value);
  };
  const inputEntfernungHandler = (e) => {
    setEnteredEntfernung(e.target.value);
  };
  const inputObjectBildHandler = (e) => {
    setEnteredFilename(e.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (enteredObjectId.length > 3) {
      const newObject = {
        objectKatalogId: enteredObjectId,
        objectKatalog: enteredKatalog,
        objectName: enteredObjectName,
        objectKlasse: enteredObjectKlasse,
        objectArt: enteredObjectArt,
        objectBeschreibungDe: enteredBeschreibungDe,
        objectBeschreibungEn: enteredBeschreibungEn,
        objectEntfernung: enteredEntfernung,
        objectBild: 'test.jpg',
      };
      if(objectEdit.edit === true) {
        updateObject(objectEdit.item.id, newObject)
      } else {
        addObject(newObject);
      }
      
    }
  };

  return (
    <Card>
      <form onSubmit={handleForm}>
        <div className="formcontrol">
          <label htmlFor="objectId">Object ID (M, NGC, IC)</label>
          <input
            type="text"
            id="objectId"
            onChange={inputObjectIdHandler}
            value={enteredObjectId}
          ></input>
        </div>
        <div className="formcontrol">
          <label htmlFor="katalog">Katalog</label>
            <select name="katalog" id="katalog" value ={enteredKatalog && 'Messier'} onChange={inputKatalogHandler}>
            <option value="Messier">Messier</option>
            <option value="NGC">NGC</option>
            <option value="IC">IC</option>
          </select>
        </div>
        <div className="formcontrol">
          <label htmlFor="name">Object Bezeichnung</label>
          <input
            type="text"
            id="name"
            onChange={inputObjectNameHandler}
            value={enteredObjectName}
          ></input>
        </div>
        <div className="formcontrol">
          <label htmlFor="objectKlasse">
            Klasse des Objektes (Planet, Galaxie, Nebel)
          </label>
          <select name="Klasse" id="objectKlasse" value={enteredObjectKlasse && 'Galaxie'} onChange={inputObjectKlasseHandler}>
            <option value="Galaxie">Galaxie</option>
            <option value="Nebel">Nebel</option>
            <option value="Planetarisch">Planetarisch</option>
            <option value="Mond">Mond</option>
          </select>
        </div>
        <div className="formcontrol">
          <label htmlFor="objectArt">Art des Objektes</label>
          <input
            type="text"
            id="objectArt"
            onChange={inputObjectArtHandler}
            value={enteredObjectArt}
          ></input>
        </div>
        <div className="formcontrol">
          <label htmlFor="beschreibungde">Beschreibung (Deutsch)</label>
          <input
            type="text"
            id="beschreibungde"
            onChange={inputBesxchreibungDeHandler}
            value={enteredBeschreibungDe}
          ></input>
        </div>
        <div className="formcontrol">
          <label htmlFor="beschreibungen">Beschreibung (Englisch)</label>

          <input
            type="text"
            id="beschreibungen"
            onChange={inputBesxchreibungEnHandler}
            value={enteredBeschreibungEn}
          ></input>
        </div>
        <div className="formcontrol">
          <label htmlFor="entfernung">Entfernung in Lichtjahren</label>
          <input
            type="text"
            id="entfernung"
            onChange={inputEntfernungHandler}
            value={enteredEntfernung}
          ></input>
        </div>
        <div className="formcontrol">
          <label htmlFor="objectBild"></label>
          <input
            type="file"
            id="objectBild"
            onChange={inputObjectBildHandler}
          ></input>
        </div>
        <Button type="submit">Absenden</Button>
      </form>
    </Card>
  );
};

export default ObjectForm;
