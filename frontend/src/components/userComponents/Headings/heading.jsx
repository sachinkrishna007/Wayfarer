import React from 'react'
import { InputText } from 'primereact/inputtext'
import './heading.css'
const Heading = (props) => {
  return (
    <div className={props.cName}>
      <img className={props.imageclass} src={props.img} alt="" />

      <div className="textcover">
        <h1 className={props.name}>{props.title}</h1>
        <p className="ptext">{props.text}</p>
      </div>
    </div>
  )
}

export default Heading
