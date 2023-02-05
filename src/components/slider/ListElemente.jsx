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


const ListElemente = ({tabelle, sortierung, titel, filterfeld, filterwert}) => {

  const listRef = useRef()
  const [elemente, setElemente] = useState(null)
  const [loading,setLoading] =  useState(true)

useEffect(() => {
  const fetchElemente = async () => {
    try {
      // Get Reference
      const elementeRef = collection(db, tabelle)
       // Create query
var q = null;
if(!filterfeld) { 
  q = query(
    elementeRef,
    orderBy('brennweite','desc'),
  limit(10) )
 }
 if(filterfeld) {
    q = query(
        elementeRef,
        where(filterfeld, '==', filterwert),
        orderBy(sortierung,'desc'))
    //    limit(10) )
    }     


     // Execute query
     const querySnap = await getDocs(q)
     const elemente = []
     querySnap.forEach((doc) => {
      return elemente.push({
        id: doc.id,
        data: doc.data()
      })
     })
     setElemente(elemente)
     setLoading(false)
     } catch (error) {
       toast.error("Da ging was schief")
     }
  }
 

fetchElemente()
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
    {loading ? <Spinner /> : elemente && elemente.length > 0 ? 
    <>
      <span className="listTitle">{titel}</span>
      <div className="wrapper">
        <MdArrowBackIosNew className='sliderArrow left' onClick={() => handleDirectionClick("left")}/>
        <div className="container" ref={listRef}>
          {elemente.map((element) => <ListItem key={element.id} name={element.data.name} image={element.data.imgUrls}/>)}
        </div>
        <MdArrowForwardIos className="sliderArrow right" onClick={() => handleDirectionClick("right")}/>
      </div> 
    </> :
    <p>NKeine Aufnahmen vorhanden</p>}
    </div>  
  )
}
export default ListElemente;
