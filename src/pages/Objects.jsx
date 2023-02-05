import React from "react";
import Header from "../components/Header";
import ListElemente from "../components/slider/ListElemente";
import "./objects.scss";
import MainPicture from "../components/assets/jpg/Andromeda.jpg";

const Objects = () => {
  return (
    <div className="home">
      <Header />
      <img src={MainPicture} alt='Astroschorsch' width='100%'/>
      <ListElemente tabelle='objects' sortierung='timestamp' titel='Alle Objekte' />
    </div>
  );
};

export default Objects;
