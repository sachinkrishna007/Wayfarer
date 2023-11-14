import React from 'react'
import './popular.css'
import PopularData from './popualrGuidesData'

const PopularGuides = () => {
  return (
    <div className="trip">
      <h1>Popualar Guides</h1>
      <p className="tripptag">jdk sndsi jsncjs jnsd</p>
      <div className="tripcard">
        <PopularData
          image={
            "https://plus.unsplash.com/premium_photo-1661425265757-8adc16a6983d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          heading="Jonathan"
          text="200 Trips Completed"
        />
        <PopularData
          image={
            "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          heading="Clarke"
          text="150 Trips Completed"
        />
        <PopularData
          image={
            "https://media.istockphoto.com/id/1148391078/photo/working-out-what-they-want-to-see-first.jpg?s=1024x1024&w=is&k=20&c=VoVy-eOyYVcYYng54nxa-142APsggbakzgVYaz71g08="
          }
          heading="Ravindra"
          text="110 Trips Completed"
          
        />
      </div>
    </div>
  );
}
export default PopularGuides
