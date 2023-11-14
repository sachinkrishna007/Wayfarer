import React, { useEffect, useState } from "react";
import { useGuideRequestMutation } from "../../redux/slices/adminSlice/adminApiSlice";
import Loader from "../../components/userComponents/loading";
import { useSelector } from "react-redux";
import AdminSidebar from "../../components/adminComponents/sidebar";
import AdminCard from "../../components/adminComponents/AdminCard/adminCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AdminHome = () => {
  const [guideData, setGuideData] = useState([]);
  const navigate = useNavigate();
  const [guideDataFromAPI, { isLoading }] = useGuideRequestMutation();
  const { adminInfo } = useSelector((state) => state.adminAuth);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseFromApiCall = await guideDataFromAPI();

        const guideArray = responseFromApiCall.data.guideData;
        console.log("llll", guideArray);

        setGuideData(guideArray);
      };

      fetchData();
    } catch (error) {
      toast.error(error);

      console.error("Error fetching users:", error);
    }
  }, []);
  console.log(guideData);
  return (
    <div>
      <AdminSidebar></AdminSidebar>
      <h1>Guide Requests</h1>
      {isLoading ? <Loader /> : <AdminCard guide={guideData} />}
    </div>
  );
};

export default AdminHome;
