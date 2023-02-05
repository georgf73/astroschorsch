import { useRef, useEffect, useState } from "react";
import "./list.scss";
import ListItem from "./ListItem";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../UI/Spinner"; 
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";


const List = () => {

  const listRef = useRef()
  const [objects, setObjects] = useState(null)
  const [loading,setLoading] =  useState(true)

useEffect(() => {
  const fetchObjects = async () => {
    try {
      // Get Reference
      const objectsRef = collection(db, 'objects')
       // Create query
     const q = query(
     objectsRef,
     orderBy('timestamp','desc'),
     limit(10) 
     )

     // Execute query
     const querySnap = await getDocs(q)
     const objects = []
     querySnap.forEach((doc) => {
      return objects.push({
        id: doc.id,
        data: doc.data()
      })
     })
     setObjects(objects)
     setLoading(false)
     } catch (error) {
       toast.error("Da ging was schief")
     }
  }
 

fetchObjects()
},[])

  const handleDirectionClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 50;
if(direction ==="left") {
  listRef.current.style.transform = `translateX(${230 + distance}px)`
}
if(direction ==="right") {
  listRef.current.style.transform = `translateX(${-230 + distance}px)`
}
  }

  return (  
    <div className="list">
    {loading ? <Spinner /> : objects && objects.length > 0 ? 
    <>
      <span className="listTitle">Objekte</span>
      <div className="wrapper">
        <MdArrowBackIosNew className='sliderArrow left' onClick={() => handleDirectionClick("left")}/>
        <div className="container" ref={listRef}>
          {objects.map((object) => <ListItem key="{object.id}" name={object.data.name} image={object.data.imageUrls[1]}/>)}
        </div>
        <MdArrowForwardIos className="sliderArrow right" onClick={() => handleDirectionClick("right")}/>
      </div> 
    </> :
    <p>No Objects available</p>}
    </div> 
  )
}
export default List;
