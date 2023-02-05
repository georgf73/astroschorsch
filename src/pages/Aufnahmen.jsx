import React from 'react'
import Header from "../components/Header";
import ListElemente from "../components/slider/ListElemente";
import MainPicture from "../components/assets/jpg/Andromeda.jpg";
import "./objects.scss";

const Aufnahmen = () => {
  return (
    <div className='home'>      <Header />
    <img src={MainPicture} alt='Astroschorsch' width='100%'/>
    <ListElemente tabelle='aufnahmen' sortierung='timestamp' titel='Alle Aufnahmen' />
    <ListElemente tabelle='aufnahmen' sortierung='timestamp' filterfeld='brennweite' filterwert='800' titel='800mm Aufnahmen' />
    <ListElemente tabelle='aufnahmen' sortierung='timestamp' filterfeld='klasse' filterwert='Nebel' titel='Nebel' />
    </div>
  )
}

export default Aufnahmen