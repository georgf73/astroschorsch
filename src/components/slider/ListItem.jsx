import React from 'react'
import { Link } from 'react-router-dom'
import "./listItem.scss"

const ListItem = ({name, image, tabelle, imgid}) => {
  let link=''
  if(tabelle ==='aufnahmen') {
    link='aufnahme'
  }
  if(tabelle === 'objects') {
    link='object'
  }

  return (
    <div className="listItem">
      <Link to={`/${link}/${imgid}`}>
        <div>
          <img src={image} alt={name} />
          <div className="itemText"> {name}</div>
        </div>
        </Link>
      </div>
  )
}

export default ListItem