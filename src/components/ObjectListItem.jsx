import React from "react";
import { useContext } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import Card from "./UI/Card";
import styles from "./ObjectListItem.module.css";
import nebulaicon from "./assets/nebula_icon.png";
import galaxyicon from "./assets/galaxy_icon.png";
import ObjectContext from "../context/ObjectContext";

const ObjectListItem = ({ objectItem }) => {
  const OBJECTPATH = "/images/Aufnahmen/";
  const { deleteObject, editObject } = useContext(ObjectContext);

  return (
    <div className={styles.objectListItem}>
      <Card>
        <button onClick={() => deleteObject(objectItem.id)} className="close">
          <FaTimes color="purple" />
        </button>
        <button onClick={() => editObject(objectItem)} className="edit">
          <FaEdit color="purple" />
        </button>

        <div className="objectItem__Bild">
          <img src={OBJECTPATH + objectItem.objectBild} width="300px" alt="" />
        </div>
        <div className="objectListItem__description">
          <h2>
            {objectItem.objectKatalogId}
            <br />
            {objectItem.objectName}
          </h2>
        </div>
        <div className="objectItem__Info">
          <img
            src={objectItem.objectKlasse === "Nebula" ? nebulaicon : galaxyicon}
            width="50px"
            alt=""
          />
        </div>
      </Card>
    </div>
  );
};

export default ObjectListItem;
