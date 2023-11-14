import React from 'react'
import Navbars from '../../../components/userComponents/navBar/navBar'
import Hero from '../../../components/userComponents/hero/hero'
import Destination from '../../../components/userComponents/hero/destinaion/destination'
import PopularGuides from '../../../components/userComponents/PopularGuides/popularGuides'
import Footer from '../../../components/userComponents/footer/footer'

const UserHome = () => {
  return (
    <div>
        <Navbars />
        <Hero></Hero>
        <Destination></Destination>
        <PopularGuides></PopularGuides>
        <Footer></Footer>
    
      
    </div>
  )
}

export default UserHome
