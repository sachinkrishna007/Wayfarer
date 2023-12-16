import React from 'react'
import AdminSidebar from '../../components/adminComponents/sidebar'
import BookingTable from '../../components/userComponents/table/table'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetAdminBookingDataMutation } from '../../redux/slices/adminSlice/adminApiSlice'
import { TabView, TabPanel } from 'primereact/tabview'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const AdminBookingData = () => {
  const [bookingDataFromAPI, { isLoading }] = useGetAdminBookingDataMutation()
  const [Data, setData] = useState([])
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const responseFromApiCall = await bookingDataFromAPI()
    console.log(responseFromApiCall)

    const bookingData = responseFromApiCall.data.booking

    setData(bookingData)

    
  }

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
  return (
    <div>
      <AdminSidebar />
      <div>
        <h3 className="Heading">Bookings</h3>
      </div>
      <div className="userTable">
        <TabView>
          <TabPanel header="Accepted">
            <DataTable
              value={Data.filter((item) => item.status === 'Accepted')}
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

              
            </DataTable>
          </TabPanel>
          <TabPanel header="Cancelled">
            <DataTable
              value={Data.filter((item) => item.status === 'cancelled')}
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

             
            </DataTable>
          </TabPanel>
          <TabPanel header="Guide Cancelled">
            <DataTable
              value={Data.filter((item) => item.status === 'Guidecancelled')}
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

              
            </DataTable>
          </TabPanel>
        </TabView>
      </div>
    </div>
  )
}

export default AdminBookingData
