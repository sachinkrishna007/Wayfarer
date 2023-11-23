import React from "react";
import AdminSidebar from "../../components/adminComponents/sidebar";
import BookingTable from "../../components/userComponents/table/table";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetAdminBookingDataMutation } from "../../redux/slices/adminSlice/adminApiSlice";
import { Sidebar } from "primereact/sidebar";

const AdminBookingData = () => {
  const [bookingDataFromAPI, { isLoading }] = useGetAdminBookingDataMutation();
  const [Data, setData] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const responseFromApiCall = await bookingDataFromAPI();
    console.log(responseFromApiCall);

    const bookingData = responseFromApiCall.data.booking;

    setData(bookingData);
  };
  return (
    <div>
      <AdminSidebar />
      <div>
        <h3 className="Heading">Bookings</h3>
      </div>
      <div className="userTable">
        <BookingTable className="tble" booking={Data} />
      </div>
    </div>
  );
};

export default AdminBookingData;
