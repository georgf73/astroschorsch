import React, { Fragment, useState, useEffect } from "react";

import ObjectForm from "./ObjectForm";
import ObjectDescription from "./objectdescription";
import style from "./singleview.module.css";


const SingleView = (props) => {

  const [object, setObject] = useState({});

  useEffect(() => {

    fetch("http://localhost:3001/api/objects/"+props.imageid)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setObject(data);
      });
  }, [props.imageid]);

  console.log(props);
  return (
    <Fragment>
      <div className={style.mainimagecontainer}>
        <p></p>
        <img src={object.Bild} alt={object.ObjectName} width="100%"></img>
        <div className={style.imagetitle__bottomrightbox}>
          <div className={style.imagetitle__text}>{object.ObjectName}</div>
        </div>
      </div>
      <div className={style.maincontent}>
        <ObjectDescription description={object.ObjectDescription_De} />
      </div>
      <ObjectForm />
    </Fragment>
  );
};

export default SingleView;
