import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../redux/slices/userAuthSlice'
import { useLogoutMutation } from '../../../redux/slices/userApiSlice'
import { NavLink, useLocation } from 'react-router-dom'

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

  // State variable to hold the user name
  const [userName, setUserName] = useState('')

  useEffect(() => {
    // Set the user name when userInfo is available
    if (userInfo) {
      setUserName(userInfo.firstName) // Adjust the property to match your user data structure
    }
  }, [userInfo])

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
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </Link>
      ),
      icon: 'pi pi-fw pi-home custom-icon',
      // Add a link to the home page
    },
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
      ],
    },
    // Other items for logged-in users
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off custom-icon',
      command: (event) => logoutHandler(event),
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
    <div style={navbarContainerStyle}>
      <img alt="logo" src="/logos2.png" height="50" className="mr-2"></img>
    </div>
  )
  const end = <InputText placeholder="Search" type="text" className="w-full" />

  return (
    <div className="card navbar-container">
      <Menubar model={items} start={start} style={menubarStyle} />
    </div>
  )
}
