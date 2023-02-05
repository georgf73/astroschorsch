import React from 'react'
import styles from './Card.module.css';

const Card = (props) => {
    const classes = styles.card + ' ' +props.className;

    return <div style={{backgoundColor: 'white'}} className={classes}>{props.children}</div>;
}

export default Card