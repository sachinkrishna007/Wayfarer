import React from 'react'
import NavBar from '../../components/guideComponents/navbar/GuideNavbar'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useGuidegetBookingsMutation } from '../../redux/slices/guideSlice/guideApiSlice'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const GuideBookingData = () => {
  const [bookingDataFromAPI, { isLoading }] = useGuidegetBookingsMutation()
  const [Data, setData] = useState([])
  const [userData, setuserData] = useState([])
   const { guideInfo } = useSelector((state) => state.guideAuth)
   console.log(guideInfo);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const responseFromApiCall = await bookingDataFromAPI({guideId:guideInfo.data._id})
    console.log(responseFromApiCall)

    const bookingData = responseFromApiCall.data.booking
    const userData = responseFromApiCall.data.user

    setData(bookingData)
    setuserData(userData)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  const UserImageTemplate = (rowData) => {
    return (
      <img
        src={
          rowData.UserImage
            ? rowData.guideImage
            : 'https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg'
        }
        alt="Guide"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
    )
  }
  return (
    <div>
  <NavBar></NavBar>
      <div>
        <h3 className="Heading">Bookings</h3>
      </div>
      <div className="userTable">
        <DataTable
          value={Data}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: '50rem' }}
          emptyMessage="No bookings found"
        >
          <Column
            header="#"
            body={UserImageTemplate}
            style={{ width: '10%' }}
          ></Column>
          <Column
            field="userName"
            header="Name"
            style={{ width: '15%' }}
          ></Column>
          <Column
            field="location"
            header="Location"
            style={{ width: '15%' }}
          ></Column>
          <Column
            field="startDate"
            header="Start Date"
            style={{ width: '15%' }}
            body={(rowData) => formatDate(rowData.startDate)}
          ></Column>
          <Column
            field="endDate"
            header="End Date"
            style={{ width: '15%' }}
            body={(rowData) => formatDate(rowData.endDate)}
          ></Column>
          <Column
            field="totalDays"
            header="Days"
            style={{ width: '10%' }}
          ></Column>
          <Column
            field="status"
            header="Status"
            style={{ width: '10%' }}
          ></Column>
          <Column
            field="totalAmount"
            header="Amount"
            style={{ width: '10%' }}
          ></Column>
        </DataTable>
      </div>
    </div>
  )
}

export default GuideBookingData
