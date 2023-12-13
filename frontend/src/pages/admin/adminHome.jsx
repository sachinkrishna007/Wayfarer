import React, { useEffect, useState } from 'react'
import { useGuideRequestMutation } from '../../redux/slices/adminSlice/adminApiSlice'
import Loader from '../../components/userComponents/loading'
import { useSelector } from 'react-redux'
import AdminSidebar from '../../components/adminComponents/sidebar'
import AdminCard from '../../components/adminComponents/AdminCard/adminCard'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminHome = () => {
  const [guideData, setGuideData] = useState([])
  const navigate = useNavigate()
  const [guideDataFromAPI, { isLoading }] = useGuideRequestMutation()
  const { adminInfo } = useSelector((state) => state.adminAuth)


  return (
    <div>
      <AdminSidebar></AdminSidebar>
    
      {isLoading ? <Loader /> : <AdminCard  />}
    </div>
  )
}

export default AdminHome
