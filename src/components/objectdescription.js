import React from "react";
import style from "./objectdescription.module.css"

const ObjectDescription = (props) => {
    return (
        <div className={style.objectdescription}>
            <h4>Object Description</h4>
            <p>{props.description}</p>
        </div>


    )
}

export default ObjectDescription;