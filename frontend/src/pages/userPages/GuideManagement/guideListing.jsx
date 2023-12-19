import { React, useState, useEffect } from 'react'
import GuideList from '../../../components/userComponents/guideCard/Guidelist'
import NavBar from '../../../components/userComponents/navBar/NavBar'
import { toast } from 'react-toastify'
import { useGetGuideDataMutation } from '../../../redux/slices/userApiSlice'
import Loader from '../../../components/userComponents/loading'
import Footer from '../../../components/userComponents/footer/footer'

import './guideListing.css'
const GuideListing = () => {
  const [guideData, setGuideData] = useState([])
  const [guideDataFromAPI, { isLoading }] = useGetGuideDataMutation()

  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseFromApiCall = await guideDataFromAPI()

        const guideArray = responseFromApiCall.data.guideData

        setGuideData(guideArray)
      }

      fetchData()
    } catch (error) {
      toast.error(error)

      console.error('Error fetching users:', error)
    }
  }, [])
  console.log(guideData)

  return (
    <div>
      <NavBar></NavBar>

      {isLoading ? <Loader /> : <GuideList />}
      <Footer></Footer>
    </div>
  )
}

export default GuideListing
