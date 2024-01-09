import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/userPages/register'
import { Bounce, Flip, ToastContainer, Zoom } from 'react-toastify'

import Login from './pages/userPages/login/login'
import UserHome from './pages/userPages/userHome/UserHome'
import Booking from './pages/userPages/booking/Booking'
import ForgotPassword from './pages/userPages/forgotPassword/ForgotPassword'
import Verifyotp from './pages/userPages/forgotPassword/Verifyotp'
import UserChangePassword from './pages/userPages/forgotPassword/UserChangePassword'
import BookingData from './pages/userPages/booking/BookingData'
import ViewBooking from './pages/userPages/booking/ViewBooking'

import GuideRegister from './pages/guidePages/guideRegister'
import GuideListing from './pages/userPages/GuideManagement/guideListing'
import GuideLogin from './pages/guidePages/guideLogin'
import GuideHome from './pages/guidePages/guideHome'
import GuideDetails from './pages/guidePages/guideAddData'
import GuideDetailedView from './pages/userPages/GuideManagement/guideDetailed'
import Confirmation from './pages/userPages/booking/confirmation'
import GuideBookingData from './pages/guidePages/guideBookings'

import 'primeflex/primeflex.css'
import AdminLogin from './pages/admin/Adminlogin'
import AdminHome from './pages/admin/adminHome'
import Userlist from './pages/admin/userList'
import GuideData from './pages/admin/guideList'
import Category from './pages/admin/Category'
import VideoCall from './components/videoCall'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/userComponents/privateRoute'
import AdminBookingData from './pages/admin/Booking'
import AdminDashboard from './pages/admin/adminDashboard'
import GuidePrivateRoute from './components/guideComponents/guidePrivateRoute'
import AdminPrivateRoute from './components/adminComponents/AdminCard/AdminPrivateRoute'
import ChangePassword from './pages/guidePages/passwordPages/ChangePassword'
import UserChat from './pages/userPages/chat/UserChat'
import GuideChat from './pages/guidePages/guideChat/guideChat'
import UserProfile from './pages/userPages/UserProfile/userProfile'
import GuideBlog from './pages/guidePages/blog/guideBlog'
import UserBlog from './pages/userPages/blogs/userBlog'
import GuideViewBlog from './pages/guidePages/blog/viewBlogs'
import Following from './pages/followers'
import Wallet from './pages/userPages/wallet/Wallet'

import CalendarGuide from './pages/guidePages/calander'
import GuideDashBoard from './pages/guidePages/guideDashBoard'
import GuideViewBooking from './pages/guidePages/GuideViewBookings'
import NotFoundPage from './pages/404page'
const App = () => {
  return (
    <div style={{ position: 'relative' }}>
      <ToastContainer
        position="top-right"
        transition={Zoom}
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/guideList" element={<GuideListing />} />
        <Route path="/bookingPage" element={<Booking />} />
        <Route path="/checkout-success" element={<Confirmation />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verifyOtp" element={<Verifyotp />} />
        <Route path="/changePassword" element={<UserChangePassword />} />
        <Route path="/Bookings" element={<BookingData />} />
        <Route path="/ViewBooking/:bookingId" element={<ViewBooking />} />
        <Route path="/UserChat/:id" element={<UserChat />} />
        <Route path="/Profile" element={<UserProfile />} />
        <Route path="/blogs" element={<UserBlog />} />
        <Route path="/Following" element={<Following />} />
        <Route path="/wallet" element={<Wallet />} />
       <Route path="/room/:userId" element={<VideoCall />} />
        <Route
          path="/guideDetailedView/:userId"
          element={<GuideDetailedView />}
        />

        {/* --------------------guide Routes----------------------------------------- */}

        <Route path="/guideRegister" element={<GuideRegister />} />
        <Route path="/guideLogin" element={<GuideLogin></GuideLogin>} />

        <Route
          path="/guideHome"
          element={<GuidePrivateRoute element={<GuideHome />} />}
        />
        <Route
          path="/guideAddData"
          element={<GuidePrivateRoute element={<GuideDetails />} />}
        />
        <Route
          path="/GuideChangePassword"
          element={<GuidePrivateRoute element={<ChangePassword />} />}
        />
        <Route
          path="/GuideChat"
          element={<GuidePrivateRoute element={<GuideChat />} />}
        />
        <Route
          path="/GuideBookings"
          element={<GuidePrivateRoute element={<GuideBookingData />} />}
        />
        <Route
          path="/GuideBlogs"
          element={<GuidePrivateRoute element={<GuideBlog />} />}
        />
        <Route
          path="/GuideViewBlogs"
          element={<GuidePrivateRoute element={<GuideViewBlog />} />}
        />
        <Route
          path="/Calender"
          element={<GuidePrivateRoute element={<CalendarGuide />} />}
        />
        <Route
          path="/GuideDashBoard"
          element={<GuidePrivateRoute element={<GuideDashBoard />} />}
        />
        <Route
          path="/guideViewBookings/:bookingId"
          element={<GuidePrivateRoute element={<GuideViewBooking />} />}
        />

        {/* --------------------Admin Routes----------------------------------------- */}

        <Route path="/adminLogin" element={<AdminLogin></AdminLogin>} />
        <Route
          path="/admin-guide-Requests"
          element={<AdminPrivateRoute element={<AdminHome />} />}
        />
        <Route
          path="/adminHome"
          element={<AdminPrivateRoute element={<AdminDashboard />} />}
        />
        <Route
          path="/userList"
          element={<AdminPrivateRoute element={<Userlist />} />}
        />
        <Route
          path="/guideListData"
          element={<AdminPrivateRoute element={<GuideData />} />}
        />
        <Route
          path="/AdminBookingData"
          element={<AdminPrivateRoute element={<AdminBookingData />} />}
        />
        <Route
          path="/Category"
          element={<AdminPrivateRoute element={<Category />} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
