import React from 'react'
import { InputText } from 'primereact/inputtext'
import './hero.css'
const Hero = () => {
  return (
    <div className="hero">
      <img
        className="cover"
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />

      <div className="textcover">
        <h1 className="htext">Explore the World Together</h1>
        <p className="ptext">
          Embark on a Journey Beyond Imagination with Our Expert Guides!
        </p>
      </div>
    </div>
  )
}

export default Hero
