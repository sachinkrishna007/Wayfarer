import React from 'react'

import { Route, Routes } from "react-router-dom";
import Register from './pages/userPages/register';
import { Flip, ToastContainer } from 'react-toastify';

import Login from './pages/userPages/login/login';
import UserHome from './pages/userPages/userHome/UserHome';
import Booking from './pages/userPages/booking/booking';

import Guidehelp from './pages/guidePages/guidehelp';
import GuideRegister from './pages/guidePages/guideRegister';
import GuideListing from './pages/userPages/GuideManagement/guideListing';
import GuideLogin from './pages/guidePages/guideLogin';
import GuideHome from './pages/guidePages/guideHome';
import GuideDetails from './pages/guidePages/guideAddData';
import GuideDetailedView from './pages/userPages/GuideManagement/guideDetailed';
import Confirmation from './pages/userPages/booking/confirmation';

import AdminLogin from './pages/admin/Adminlogin';
import AdminHome from './pages/admin/adminHome';
import Userlist from './pages/admin/userList';
import GuideData from './pages/admin/guideList';

import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './components/userComponents/privateRoute';
import GuidePrivateRoute from './components/guideComponents/guidePrivateRoute';
import AdminPrivateRoute from './components/adminComponents/AdminCard/AdminPrivateRoute';

const App = () => {
  return (
    <div style={{ position: "relative" }}>
      <ToastContainer
        position="top-right"
        transition={Flip}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
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
        <Route
          path="/guideDetailedView/:userId"
          element={<GuideDetailedView />}
        />

        {/* --------------------guide Routes----------------------------------------- */}

        <Route path="/guideRegister" element={<GuideRegister />} />
        <Route path="/guideLogin" element={<GuideLogin></GuideLogin>} />
        <Route path="/guidehelp" element={<Guidehelp />} />

        <Route
          path="/guideHome"
          element={<GuidePrivateRoute element={<GuideHome />} />}
        />
        <Route
          path="/guideAddData"
          element={<GuidePrivateRoute element={<GuideDetails />} />}
        />

        {/* --------------------Admin Routes----------------------------------------- */}

        <Route path="/adminLogin" element={<AdminLogin></AdminLogin>} />
        <Route
          path="/adminHome"
          element={<AdminPrivateRoute element={<AdminHome />} />}
        />
        <Route
          path="/userList"
          element={<AdminPrivateRoute element={<Userlist />} />}
        />
        <Route
          path="/guideListData"
          element={<AdminPrivateRoute element={<GuideData />} />}
        />
      </Routes>
    </div>
  );
}

export default App
