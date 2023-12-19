import React from 'react'
import PrimeLoader from '../../../components/userComponents/primeLoading'
import NavBar from '../../../components/userComponents/navBar/navBar'
import Hero from '../../../components/userComponents/hero/hero'
import Destination from '../../../components/userComponents/hero/destinaion/destination'
import PopularGuides from '../../../components/userComponents/PopularGuides/popularGuides'
import Footer from '../../../components/userComponents/footer/footer'
import Loader from '../../../components/userComponents/loading'
import Cover from '../../../components/userComponents/Cover/Cover'
import { useState, useEffect } from 'react'
import ChatBot from '../../../components/chatBot'
const UserHome = () => {
  const [loading, setLoading] = useState(true)
  const [showChatbot, setShowChatbot] = useState(false)
  useEffect(() => {
    setLoading(false)
  })
  if (loading) {
    return <Loader></Loader>
  }
  return (
    <div>
      < NavBar />
      <Cover></Cover>
      <ChatBot></ChatBot>
      <Destination></Destination>
      <PopularGuides></PopularGuides>
      <Footer></Footer>
    </div>
  )
}

export default UserHome
