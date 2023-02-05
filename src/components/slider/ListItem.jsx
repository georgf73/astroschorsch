import React from 'react'
import "./listItem.scss"

const ListItem = ({name, image}) => {
  return (
    <div className="listItem">
      <img src={image} alt={name} />
        <div className="itemText">
        {name}
        </div>
    </div>
  )
}

export default ListItem