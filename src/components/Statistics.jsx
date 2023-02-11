import { useState, useEffect } from "react";
import {
  collection,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

const Statistics = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [imageCount, setImageCount] = useState(0);
  const [objectsCount, setObjectsCount] = useState(0);

  useEffect(() => {
    const countAufnahmen = async () => {
      try {
        const collaufnahmen = collection(db, "aufnahmen");
        const snapshot = await getCountFromServer(collaufnahmen);
        setImageCount(snapshot.data().count);
      } catch (error) {
        toast.error("Da ging was schief");
      }
    };
    const countObjects = async () => {
        try {
          const collobjects = collection(db, "objects");
          const snapshot = await getCountFromServer(collobjects);
          setObjectsCount(snapshot.data().count);
        } catch (error) {
          toast.error("Da ging was schief");
        }
      };

    countAufnahmen();
    countObjects();

    setIsFetching(false);
  }, []);

  return (
    <div>
        <table className="statistiktabelle">
            <tr colspan="2">
                <td>
                <b>Statistik</b>
                </td>
            </tr>
            <tr>
                <td>Aufnahmen</td>
                <td>{isFetching ? "..." : imageCount}</td>
            </tr>
            <tr>
                <td>Objekte</td>
                <td>{isFetching ? "..." : objectsCount}</td>
            </tr>
            <tr>
                <td>Tutorials</td>
                <td>0</td>
            </tr>
        </table>

    </div>
  );
};

export default Statistics;
