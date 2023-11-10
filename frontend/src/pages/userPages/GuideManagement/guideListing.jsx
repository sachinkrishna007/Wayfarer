import {React,useState,useEffect} from 'react'
import GuideList from '../../../components/userComponents/guideCard/Guidelist'
import NavBar from '../../../components/userComponents/navBar/navBar'
import { toast } from "react-toastify";
import { useGetGuideDataMutation } from '../../../redux/slices/userApiSlice';
import Loader from '../../../components/userComponents/loading';
const GuideListing = () => {
    const [guideData, setGuideData] = useState([]);
 const [guideDataFromAPI, { isLoading }] = useGetGuideDataMutation()

   useEffect(() => {
     try {
      
       const fetchData = async () => {
         const responseFromApiCall = await guideDataFromAPI()
        

         const guideArray = responseFromApiCall.data.guideData;
console.log('llll',guideArray);

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
      <NavBar></NavBar>
      <h1
        style={{ paddingLeft: "35rem", paddingTop: "2rem", paddingBottom:'3rem', color: "#387F8E", fontSize:'200%', alignItems:'center' }}
      >
        GUIDE LIST
      </h1>
      {isLoading ? <Loader /> : <GuideList guide={guideData} />}
    </div>
  );
}

export default GuideListing
