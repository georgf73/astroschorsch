import React from "react";
import Header from "../components/Header";
import Andromeda from "../components/assets/jpg/Andromeda.jpg";
import Statistics from "../components/Statistics";

const Home = () => {
  return (
    <div className="homescreen">
      <Header />
      <div className="toparea">
        <div className="topareaimage">
          <img className="mainimage" src={Andromeda} alt="astroschorsch" />
        </div>
      </div>
      <div className="bottomarea">
        <div className="maintitle">
          <h2>Willkommen bei Astroschorsch</h2>
          <i>"Vom Garten zu den Sternen"</i>
        </div>
        <Statistics />
      </div>
    </div>
  );
};

export default Home;
