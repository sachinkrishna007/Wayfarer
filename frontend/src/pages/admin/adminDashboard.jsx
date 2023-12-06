import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import AdminSidebar from '../../components/adminComponents/sidebar'
import AdminChart from '../../components/adminComponents/chart'
import { useGetAdminDAshboardMutation } from '../../redux/slices/adminSlice/adminApiSlice'
const AdminDashboard = () => {
  const [Dashboard] = useGetAdminDAshboardMutation()
  const [totalAmount, setTotalAmount] = useState('')
  const [BookingPerDay, setBookingPerDay] = useState('')
  const [BookingAmountDay, setBookingAmountDay] = useState('')
  const [totalBookings, setTotalBookings] = useState('')
  const [totalGuides, setTotalGuides] = useState('')
  const [totalUsers, setTotalUsers] = useState('')
  const [newUsers, setnewUsers] = useState('')
  const [newGuides, setnewGuides] = useState('')
  const [currentBooking, setcurrentBooking] = useState('')
  const [weeklyBooking, setweeklyBooking] = useState('')
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const respose = await Dashboard()
      console.log(respose);
      setTotalAmount(respose.data.BookingAmount[0])
      setBookingPerDay(respose.data.BookingSales)
      setBookingAmountDay(respose.data.bookingSalesData)
      setTotalBookings(respose.data.TotalBookings)
      setTotalGuides(respose.data.TotalGuides)
      setTotalUsers(respose.data.TotalUsers)
      setnewUsers(respose.data.loggedInUsers)
      setnewGuides(respose.data.guidesRegistered)
      setcurrentBooking(respose.data.currentDayBooking)
      setweeklyBooking(respose.data.weeklyBookingAmountChange[0])
      setLoading(false)
      console.log(respose)
    }
    fetchData()
  }, [])
  if(Loading){
    return '...Loading'
  }
  return (
    <div>
      <AdminSidebar></AdminSidebar>
      <div className="grid" style={{ padding: '40px' }}>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Total Bookings
                </span>
                <div className="text-900 font-medium text-xl">
                  {totalBookings}
                </div>
              </div>

              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-calendar text-blue-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">
              {currentBooking} new{' '}
            </span>
            <span className="text-500">Bookings Today</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Revenue</span>
                <div className="text-900 font-medium text-xl">
                  ₹ {totalAmount.totalAmountSum}
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-orange-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-money-bill text-orange-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">
              ₹ {weeklyBooking.totalAmountSum}+{' '}
            </span>
            <span className="text-500">this week</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Customers
                </span>
                <div className="text-900 font-medium text-xl">{totalUsers}</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-users text-cyan-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">{newUsers} </span>
            <span className="text-500">newly registered</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Travel Guides
                </span>
                <div className="text-900 font-medium text-xl">
                  {totalGuides}
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-user text-cyan-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">{newGuides} </span>
            <span className="text-500">newly registered</span>
          </div>
        </div>
      </div>
      <div style={{ paddingLeft: '6rem' }}>
        <AdminChart
          totalAmount={totalAmount}
          BookingPerDay={BookingPerDay}
          BookingAmountDay={BookingAmountDay}
        ></AdminChart>
      </div>
    </div>
  )
}

export default AdminDashboard
