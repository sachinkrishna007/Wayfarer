import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/userComponents/navBar/navBar'
import { useGetFollowingMutation } from '../redux/slices/userApiSlice'
import { Sidebar } from 'primereact/sidebar'
import { useSelector } from 'react-redux'
import Heading from '../components/userComponents/Headings/heading'
import { Image } from 'primereact/image'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { DataView } from 'primereact/dataview'

import { useGetProfileMutation } from '../redux/slices/userApiSlice'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit'
import { toast } from 'react-toastify'
import Loader from '../components/userComponents/loading'

export default function Following() {
  const [userData, setUserData] = useState('')
  const { userInfo } = useSelector((state) => state.auth)
  const [getProfile] = useGetProfileMutation()
  const [loading, setLoading] = useState(true)
  const [following] = useGetFollowingMutation()
  const [followings, setFollowing] = useState([])
  const fetchUserProfile = async (e) => {
    const responseFromApiCall = await getProfile({
      email: userInfo.email,
      userId: userInfo,
    })
    if (responseFromApiCall) {
      const { firstName, LastName, email, mobile, profileImageName } =
        responseFromApiCall.data.user
      setUserData({
        firstName,
        LastName,
        email,
        mobile,
        profileImageName,
      })

      setLoading(false)
      console.log(userData)
    }
  }

  const itemTemplate = (followings) => {
    return (
      <div className="col-6">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={followings.profileImage}
            alt={followings.LastName}
            style={{ height: '7rem' }}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">
                {followings.firstname} {followings.Lastname}
              </div>

              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">{followings.Location}</span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <Link to={`/guideDetailedView/${followings._id}`}>
                <Button className="p-button-rounded"> view</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const fetchFollowers = async () => {
    const responseFromApiCall = await following({
      userId: userInfo._id,
    })
    if (responseFromApiCall) {
      console.log(responseFromApiCall)
      setFollowing(responseFromApiCall.data.following)
    }
  }

  useEffect(() => {
    fetchUserProfile()
    fetchFollowers()
  }, [])

  if (loading) {
    return <Loader></Loader>
  }

  return (
    <>
      <br />
      <br />
      <br />
      <NavBar />
      <div style={{ padding: '0px 100px' }}>
        <Heading
          cName="hero"
          name="htextprofile"
          imageclass="coverProfile"
          img="https://t3.ftcdn.net/jpg/04/42/47/52/240_F_442475292_5ouemiiJiArGyNKSWgUpkRR8lmep6jgM.jpg"
          title="Following Guides"
        />
      </div>

      <div className="card" style={{ padding: '0px 90px' }}>
        <DataView
          value={followings}
          itemTemplate={itemTemplate}
          paginator
          rows={4}
        />
      </div>
    </>
  )
}
