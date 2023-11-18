import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useGuideAddLanguageMutation } from "../../redux/slices/guideSlice/guideApiSlice";
import { useGuideAddPriceMutation } from "../../redux/slices/guideSlice/guideApiSlice";
import { useGuideAddDescMutation } from "../../redux/slices/guideSlice/guideApiSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/userComponents/loading";
import NavBar from "../../components/guideComponents/navbar/GuideNavbar";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GuideAddData = () => {
  const { guideInfo } = useSelector((state) => state.guideAuth);
  const [price, setPrice] = useState("");
  const [Language, setLanguage] = useState("");
  const [Desciption, setDescription] = useState("");

  const [addLanguage, { isLoading }] = useGuideAddLanguageMutation();
  const [addPrice, { isPriceLoading }] = useGuideAddPriceMutation();
  const [addDescription,] = useGuideAddDescMutation()
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const responseFromApiCall = await addLanguage({
      guideId: guideInfo.data.email,
      Lan: Language,
    });
    if (responseFromApiCall.success) {
      toast.success("Language added Successfully.");
      navigate("/guideHome");
    } else {
      toast.error(responseFromApiCall.message);
    }
  } catch (err) {
    if (
      err.response &&
      err.response.data &&
      err.response.data.message === "Language Limit exceeded"
    ) {
      toast.error("Maximum languages you can add is 3");
    } else if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("An error occurred. Please try again."); // Generic error message
    }
  }
};

  const handleSubmitPrice = async (e) => {
    e.preventDefault();
    try {
      const responseFromApiCall = await addPrice({
        guideId: guideInfo.data.email,
        price: price,
      });

      if (responseFromApiCall) {
        toast.success("Price Updated Successfully.");
        navigate("/guideHome");
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error("Error adding language:", error.message);
    }
  };
  const handleSubmitDesc = async (e) => {
    e.preventDefault();
    try {
      const responseFromApiCall = await addDescription({
        guideId: guideInfo.data.email,
       description: Desciption,
      });

      if (responseFromApiCall) {
        toast.success("Description Added Successfully.");
        navigate("/guideHome");
      } else {
        toast.error("error adding");
      }
    } catch (error) {
      console.error("ErrorAdding Description:", error.message);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${"/guide1.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // Set this to the desired height
          overflow: "hidden",
        }}
      >
        <NavBar></NavBar>
        {isLoading && <Loader></Loader>}
        {isPriceLoading && <Loader></Loader>}
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol className="px-3" lg="6">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle className="text-center m-4">
                    Add Languages
                  </MDBCardTitle>
                  <form onSubmit={handleSubmit}>
                    <MDBInput
                      required
                      label="Add your Languages"
                      value={Language}
                      onChange={(e) => setLanguage(e.target.value)}
                    />
                    <div className="m-2 text-center">
                      <MDBBtn type="submit" className=" ">
                        {" "}
                        Add Language
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol className="px-3" lg="6">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle className="text-center m-4">
                    Add New Guide Charge/Day
                  </MDBCardTitle>
                  <form onSubmit={handleSubmitPrice}>
                    <MDBInput
                      type="number"
                      required
                      label="Add Price "
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="m-2 text-center">
                      <MDBBtn type="submit" className=" ">
                        {" "}
                        Confirm Price
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>

          <MDBRow className="">
            <MDBCol className="px-3 py-5" lg="20">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle className="text-center m-4">
                    Add Your Description
                  </MDBCardTitle>
                  <form onSubmit={handleSubmitDesc}> 
                    {/* <MDBInput required label="Add your activities" onChange={handleChange} /> */}
                    <textarea
                      className="form-control z-depth-1"
                      id="exampleFormControlTextarea6"
                      rows="3"
                      required
                      placeholder="Add your description"
                      value={Desciption}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <div className="m-2 text-center">
                      <MDBBtn type="submit" className=" ">
                        Add Description
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
};

export default GuideAddData;
