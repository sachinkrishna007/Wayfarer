import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { useGetGuideBookingDatesMutation } from '../../redux/slices/userApiSlice'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import NavBar from '../../components/guideComponents/navbar/GuideNavbar'
import Loader from '../../components/userComponents/loading'

const CalendarGuide = () => {
  const [date, setDate] = useState(null)
  const { guideInfo } = useSelector((state) => state.guideAuth)
  const [getBooking] = useGetGuideBookingDatesMutation()
  const [calendarDates, setCalendarDates] = useState([])
  const [calendarHeight, setCalendarHeight] = useState('auto')

  const fetchData = async () => {
    try {
      const response = await getBooking({ guideId: guideInfo.data._id })
      const bookedDates = response.data.bookings || []
      setCalendarDates(bookedDates)
    } catch (error) {
      console.error('Error fetching booking dates:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const calendarEvents = calendarDates.map((booking) => ({
    title: 'Booked',
    start: new Date(booking.startDate).toISOString(),
    end: new Date(booking.endDate).addDays(1).toISOString(), // Add one day to the end date
    color: 'green',
  }))

  return (
    <div className="card flex justify-content-center">
      <NavBar />
      <Suspense fallback={<Loader />}>
        <div>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            eventContent={() => <div>Booked</div>}
            height={calendarHeight}
            datesRender={(info) => {
              const weeks = info.view.currentEnd.diff(
                info.view.currentStart,
                'weeks',
              )
              const newHeight = weeks <= 4 ? 'auto' : '600px'
              if (calendarHeight !== newHeight) {
                setCalendarHeight(newHeight)
              }
            }}
          />
        </div>
      </Suspense>
    </div>
  )
}

// Add a utility function to add days to a date
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

export default CalendarGuide
