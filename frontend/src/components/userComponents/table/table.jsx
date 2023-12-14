import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import './userTable.css'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useGetBookingDataMutation } from '../../../redux/slices/userApiSlice'
import { Link } from 'react-router-dom'
export default function BookingTable() {
  const { userInfo } = useSelector((state) => state.auth)
  const [bookingDataFromAPI, { isLoading }] = useGetBookingDataMutation()
    const [activityFilter, setActivityFilter] = useState('')
  const [Data, setData] = useState([])
  const fetchData = async () => {
    const responseFromApiCall = await bookingDataFromAPI({
      email: userInfo.email,
      status: activityFilter,
    })
    console.log(responseFromApiCall)

    const bookingData = responseFromApiCall.data.booking

    setData(bookingData)
  }
    const handleActivityFilter = (event) => {
      const { value } = event.target
      setActivityFilter(value)
    }
  useEffect(() => {
    fetchData()
  }, [])
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  const guideImageTemplate = (rowData) => {
    return (
      <img
        src={
          rowData.guideImage
            ? rowData.guideImage
            : 'https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg'
        }
        alt="Guide"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
    )
  }
  const actionTemplate = (rowData) => {
    return (
      <Link to={`/ViewBooking/${rowData._id}`}>
        <button className="p-button p-button-success">View</button>
      </Link>
    )
  }

  return (
    <div className="card">
      {/* <span className="p-float-label  p-input-icon-left p-input-group">
        <Dropdown
          value={activityFilter}
          options={['Accepted', 'Cancelled']} // Add your activity options
          onChange={handleActivityFilter}
          option="Activity"
          placeholder="Select an activity"
        />
        <label htmlFor="activityFilter">Filter by Activity</label>
      </span> */}
      <DataTable
        value={Data}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: '50rem' }}
        emptyMessage="No bookings found"
      >
        <Column
          header="Guide Image"
          body={guideImageTemplate}
          style={{ width: '10%' }}
        ></Column>
        <Column
          field="guidename"
          header="Guide Name"
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
          field="payementType"
          header="Payment Method"
          style={{ width: '10%' }}
        ></Column>
        <Column
          field="totalAmount"
          header="Amount"
          style={{ width: '10%' }}
        ></Column>
        <Column
          field="createdAt"
          header="Booking Date"
          style={{ width: '10%' }}
          body={(rowData) => formatDate(rowData.createdAt)}
        ></Column>
       

        <Column
          header="Action"
          body={actionTemplate}
          style={{ width: '10%' }}
        ></Column>
      </DataTable>
    </div>
  )
}
