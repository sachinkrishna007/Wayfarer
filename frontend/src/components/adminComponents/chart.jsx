import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart'

export default function AdminChart({
  totalAmount,
  BookingPerDay,
  BookingAmountDay,
}) {
  const [chartData, setChartData] = useState({})
  const [chartDataAmount, setChartDataAmount] = useState({})
    const [isLoading, setIsLoading] = useState(true)
  const [chartOptions, setChartOptions] = useState({})
console.log(BookingAmountDay);
  useEffect(() => {
    if (BookingPerDay && BookingPerDay.length > 0) {
        const documentStyle = getComputedStyle(document.documentElement)
      const labels = BookingPerDay.map((date) => date._id)
      const dataValues = BookingPerDay.map((count) => count.bookingCount)
        const textColor = documentStyle.getPropertyValue('--text-color')
        const textColorSecondary = documentStyle.getPropertyValue(
          '--text-color-secondary',
        )
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Bookings',
            data: dataValues,

            backgroundColor: documentStyle.getPropertyValue('--red-500'),
            borderColor: documentStyle.getPropertyValue('--blue-500'),
          },
        ],
      }

         const options = {
           maintainAspectRatio: false,
           aspectRatio: 0.8,
           plugins: {
             legend: {
               labels: {
                 fontColor: textColor,
               },
             },
           },
           scales: {
             x: {
               ticks: {
                 color: textColorSecondary,
                 font: {
                   weight: 500,
                 },
               },
               grid: {
                 display: false,
                 drawBorder: false,
               },
             },
             y: {
               ticks: {
                 color: textColorSecondary,
               },
               grid: {
                 color: surfaceBorder,
                 drawBorder: false,
               },
             },
           },
         }


      setChartData(data)
      setChartOptions(options)
    }
  }, [BookingPerDay])

  useEffect(() => {
    if (BookingAmountDay && BookingAmountDay.length > 0) {
      const labels = BookingAmountDay.map((date) => date._id)
      const dataValues = BookingAmountDay.map((count) => count.dailyBooking)
      const documentStyle = getComputedStyle(document.documentElement)

       const textColor = documentStyle.getPropertyValue('--text-color')
       const textColorSecondary = documentStyle.getPropertyValue(
         '--text-color-secondary',
       )
         const surfaceBorder =
           documentStyle.getPropertyValue('--surface-border')

      const data = {
        labels: labels,
        datasets: [
          {
            label: '₹Amount',
            data: dataValues,
            fill: false,
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            tension: 0.4,
          
          },
        ],
      }

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    }

      setChartDataAmount(data)
      setChartOptions(options)
       setIsLoading(false)
    }
  }, [BookingPerDay])
 if (isLoading) {
   return <div>Loading...</div>
 }
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <h5>Daily Booking</h5>
        <Chart
          type="bar"
          data={chartData}
          options={chartOptions}
          style={{ width: '600px', height: '300px' }}
        />
      </div>
      <div>
        <h5>Daily Booking Amount</h5>
        <Chart
          type="line"
          data={chartDataAmount}
          options={chartOptions}
          style={{ width: '600px', height: '300px' }}
        />
      </div>
    </div>
  )
}
