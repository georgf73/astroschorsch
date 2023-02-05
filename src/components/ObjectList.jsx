import React from "react";
import { useEffect, useState, useContext } from "react";
import ObjectListItem from "./ObjectListItem";
import ObjectContext from "../context/ObjectContext";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "./UI/Spinner"; 


const ObjectList = () => {
  const { objects, isLoading } = useContext(ObjectContext);

  if (!isLoading && (!objects || objects.length === 0)) {
    return <h4>Keine Objekte definiert</h4>;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <ul>
        {objects.map((object) => (
          <li key={object.objectKatalogId}>
            <ObjectListItem objectItem={object} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ObjectList;
