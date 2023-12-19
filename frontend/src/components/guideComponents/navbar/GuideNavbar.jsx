import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../redux/slices/guideSlice/guideAuthSlice'
import {
  useGuideGetNotificationsMutation,
  useGuideLogoutMutation,
} from '../../../redux/slices/guideSlice/guideApiSlice'
import { Badge } from 'primereact/badge'
import React, { useState, useEffect } from 'react'
import { Menubar } from 'primereact/menubar'
import { InputText } from 'primereact/inputtext'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import { Card } from 'primereact/card'
import io from 'socket.io-client'
const ENDPOINT = 'https://sachinkrishna.me/'
var socket
export default function NavBar() {
  const menubarStyle = {
    backgroundColor: 'white', // Specify your desired background color here
    justifyContent: 'space-between',
    alignItems: 'center',
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { guideInfo } = useSelector((state) => state.guideAuth)
  const [socketConnected, setSocketConnected] = useState(false)

  const [visibleRight, setVisibleRight] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [notificationsdb, setNotificationsdb] = useState('')
  const [badgeCount, setBadgeCount] = useState(0)
  const [userName, setUserName] = useState('')
  const [getNotifications] = useGuideGetNotificationsMutation()
  useEffect(() => {
    if (guideInfo) {
      setUserName(guideInfo.data.firstName)
      fetchNotifications()

    }
  }, [guideInfo])

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('setup', guideInfo.data)
    socket.on('connection', () => setSocketConnected(true))
  }, [])

  useEffect(() => {
    socket.on('new notification', (newfollowing) => {
      console.log('here');
     console.log(newfollowing);
     setNotifications(newfollowing.notification.message)
     console.log(notifications.length);
     setBadgeCount(notifications.length+1)
    })
  })

  const getNotificationImage = (notificationdb) => {
    if (notificationdb.type === 'following') {
      return 'https://media.istockphoto.com/id/1303124806/vector/vector-image-of-follower-notification-icon.jpg?s=612x612&w=0&k=20&c=16o3-156smtUxJXA0Uay47KrUy_dyiuBjrTes0LCVsY='
    } else if (notificationdb.type === 'NewBooking') {
      return 'https://cdn-icons-png.flaticon.com/128/6030/6030217.png' // Replace with the default image or handle other types
    }
  }
  const fetchNotifications = async () => {
    const response = await getNotifications({ receiverId: guideInfo.data._id })
    if (response) {
      setNotificationsdb(response.data.notifications)
    }
  }

  const [logoutApiCall] = useGuideLogoutMutation()
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/guideLogin')
    } catch (err) {
      console.log(err)
    }
  }

  // Define menu items for logged-in users
  const loggedInUserItems = [
    // {
    //   label: (
    //     <Link to="/homet" style={{ textDecoration: "none", color: "inherit" }}>
    //       Home
    //     </Link>
    //   ),
    //   icon: "pi pi-fw pi-home custom-icon",
    //   // Add a link to the home page
    // },
    // {
    //   label: (
    //     <Link
    //       to="/guideList"
    //       style={{ textDecoration: "none", color: "inherit" }}
    //     >
    //       Guides
    //     </Link>
    //   ),
    //   icon: "pi pi-fw pi-users custom-icon",
    //   // Add a link to the guides page
    // },
    {
      label: 'Blogs', // Dynamically include the user name
      icon: 'pi pi-id-card',
      items: [
        {
          label: (
            <Link
              to="/GuideBlogs"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Add Blogs
            </Link>
          ),
          icon: 'pi pi-fw pi-users custom-icon',
          // Add a link to the guides page
        },
        {
          label: (
            <Link
              to="/GuideViewBlogs"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              View Blogs
            </Link>
          ),
          icon: 'pi pi-fw pi-users custom-icon',
          // Add a link to the guides page
        },
      ],
    },
    {
      label: `Booking`, // Dynamically include the user name
      icon: 'pi pi-fw pi-user custom-icon',
      items: [
        {
          label: (
            <Link
              to="/GuideBookings"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Bookings
            </Link>
          ),
          icon: 'pi pi-fw pi-users custom-icon',
          // Add a link to the guides page
        },
        {
          label: (
            <Link
              to="/Calender"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Calender
            </Link>
          ),
          icon: 'pi pi-fw pi-users custom-icon',
          // Add a link to the guides page
        },
      ],
    },
    {
      label: (
        <div>
          <Link
            to="/GuideChat"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Messages
          </Link>
          {/* <Badge value="0"></Badge> */}
        </div>
      ),
      icon: 'pi pi-fw pi-users custom-icon',

      // Add a link to the guides page
    },
    {
      label: ` ${userName}`, // Dynamically include the user name
      icon: 'pi pi-fw pi-user custom-icon',
      items: [
        {
          label: (
            <Link
              to="/GuideHome"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Profile
            </Link>
          ),
          icon: 'pi pi-fw pi-users custom-icon',
          // Add a link to the guides page
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off custom-icon',
          command: (event) => logoutHandler(event),
        },
      ],
    },

    {
      label: (
        <Button
          icon="pi pi-bell"
          rounded
          severity="warning"
          aria-label="Notification"
          badge={badgeCount}
          onClick={() => {
            setVisibleRight(true)
            // Set badge count to zero when the user clicks on the notifications button
          }}
          style={{
            height: '9px',
            color: 'blue',
            backgroundColor: 'white',
            border: 'none',
          }}
        />
      ),
    },
  ]

  // Define menu items for sign-up and sign-in
  const signUpSignInItems = [
    {
      label: (
        <Link
          to="/register"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Sign Up
        </Link>
      ),
      icon: 'pi pi-user-plus',
      // Add a link to the sign-up page
    },
    {
      label: (
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Sign in
        </Link>
      ),
      icon: 'pi pi-sign-in',
      // Add a link to the sign-in page
      url: '/signin',
    },
  ]

  // Determine which set of items to render based on the presence of userInfo
  const items = guideInfo ? loggedInUserItems : signUpSignInItems
  const navbarContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const logoStyle = {
    margin: '0',
  }

  const start = (
    <div style={navbarContainerStyle}>
      <img alt="logo" src="/logos2.png" height="50" className="mr-2"></img>
    </div>
  )
  const end = <InputText placeholder="Search" type="text" className="w-full" />

  return (
    <div className="card">
      <Menubar model={items} start={start} style={menubarStyle} />
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
        style={{
          margin: '30PX',
          marginBottom: '-40px',
          marginTop: '-29px',
          borderRadius: '20px',
        }}
      >
        <h4>Notifications</h4>
        <br />
        {notificationsdb && notificationsdb.length > 0 && (
          <ul className="p-list" style={{ listStyleType: 'none', padding: 0 }}>
            {notificationsdb.map((notification) => (
              <li key={notification._id} className="p-mb-3">
                <div className="flex ">
                  <div>
                    <h6
                      className="p-d-block p-mb-1"
                      style={{ font: 'Poppins', padding: '10px' }}
                    >
                      {notification.message}
                    </h6>
                    <small className="p-text-secondary"></small>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <h6
          className="p-d-block p-mb-1"
          style={{ font: 'Poppins', padding: '10px' }}
        >
          {notifications}
        </h6>
      </Sidebar>
    </div>
  )
}
