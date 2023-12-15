import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../redux/slices/userAuthSlice'
import {
  useGetNotificationsMutation,
  useLogoutMutation,
} from '../../../redux/slices/userApiSlice'
import { NavLink, useLocation } from 'react-router-dom'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import './navbar.css'

import React, { useState, useEffect } from 'react'
import { Menubar } from 'primereact/menubar'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'

export default function NavBar() {
  const menubarStyle = {
    backgroundColor: 'white', // Specify your desired background color here
    justifyContent: 'space-between',
    alignItems: 'center',
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth)
  const [getNotifications] = useGetNotificationsMutation()
  // State variable to hold the user name
  const [userName, setUserName] = useState('')
  const [visibleRight, setVisibleRight] = useState(false)

  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    // Set the user name when userInfo is available
    if (userInfo) {
      setUserName(userInfo.firstName) // Adjust the property to match your user data structure
    }
  }, [userInfo])

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    const response = await getNotifications({ receiverId: userInfo._id })
    if (response) {
      console.log(response)
      setNotifications(response.data.notifications)
      setBadgeCount(response.data.notifications.length)
    }
  }

  const [logoutApiCall] = useLogoutMutation()
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  // Define menu items for logged-in users
  const loggedInUserItems = [
    {
      label: (
        <Link
          to="/guideList"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Guides
        </Link>
      ),
      icon: 'pi pi-fw pi-users custom-icon',
    },
    {
      label: (
        <Link to="/blogs" style={{ textDecoration: 'none', color: 'inherit' }}>
          Blogs
        </Link>
      ),
      icon: 'pi pi-id-card',
    },

    {
      label: (
        <Link
          to="/Bookings"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Bookings
        </Link>
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
              to="/Profile"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Profile
            </Link>
          ),
          icon: 'pi pi-fw pi-users custom-icon',
          // Add a link to the guides page
        },
        {
          label: (
            <Link
              to="/wallet"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Wallet
            </Link>
          ),
          icon: 'pi pi-wallet',
          // Add a link to the guides page
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off custom-icon',
          command: (event) => logoutHandler(event),
        },
      ],
    },
    // Other items for logged-in users
    {
      label: (
        <Button
          icon="pi pi-bell"
          rounded
          severity="warning"
          aria-label="Notification"
          badge={notifications.length}
          onClick={() => setVisibleRight(true)}
          style={{
            height: '9px',
            color: 'blue',
            backgroundColor: 'white',
            border: 'none',
          }}
        />
      ),
    },

    // Other items for logged-in users
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
        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
          Sign in
        </Link>
      ),
      icon: 'pi pi-sign-in',
      // Add a link to the sign-in page
    },
  ]

  // Determine which set of items to render based on the presence of userInfo
  const items = userInfo ? loggedInUserItems : signUpSignInItems
  const navbarContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const logoStyle = {
    margin: '0',
  }

  const start = (
    <Link to={'/'}>
      <div style={navbarContainerStyle}>
        <img alt="logo" src="/logos2.png" height="50" className="mr-2"></img>
      </div>
    </Link>
  )
  const end = <InputText placeholder="Search" type="text" className="w-full" />

  return (
    <div className="card navbar-container">
      <Menubar model={items} start={start} style={menubarStyle} />
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <h4>Notifications</h4>
        <ul className="p-list">
          {notifications.map((notification) => (
            <li key={notification._id} className="p-mb-3">
              <div className="p-d-flex p-ai-center">
                <span className="p-mr-2">
                  {/* Add icon or avatar if needed */}
                </span>
                <div>
                  <h6
                    className="p-d-block p-mb-1"
                    style={{ font: 'Poppins', padding: '10px' }}
                  >
                    {notification.message}
                  </h6>
                  <small className="p-text-secondary">
                    {/* Add additional details like time or sender */}
                  </small>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Sidebar>
    </div>
  )
}
