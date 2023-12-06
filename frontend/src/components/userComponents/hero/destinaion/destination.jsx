import React from 'react'
import './destination.css'
import DestinationData from './destinationData'
const Destination = () => {
  return (
    <div className="destination">
      <h1>POPULAR DESTINATIONS</h1>
      <p className="destinationptag">
        "Explore the world, collect memories, and let every mile be a story to
        tell."
      </p>
      <DestinationData
        className="first-des"
        heading="Munnar,Kerala"
        text="  Munnar is a hill station in the Western Ghats mountain range in the Idukki district of Kerala, India. Munnar is situated at an altitude of 1,500–2,500 m above sea level and has an average rainfall of 275 cm"
        img="https://upload.wikimedia.org/wikipedia/commons/4/49/Munnar_hill_station_.JPG"
        img1="https://images.unsplash.com/photo-1624049321569-f483adecb8fa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <DestinationData
        className="first-des-reverse"
        heading="Manali,Himachal Pradesh"
        text="  Manali is a Himalayan resort town in the northern state of Himachal Pradesh in India. It's located in the Beas River Valley and is known for its natural beauty, adventure opportunities, and culinary scene."
        img="https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        img1="https://images.unsplash.com/photo-1516406742981-2b7d67ec4ae8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  )
}

export default Destination
