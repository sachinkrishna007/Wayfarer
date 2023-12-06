import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from 'mdb-react-ui-kit'
import { useState, useEffect } from 'react'
import { useGuideAddLanguageMutation,useGuideDeleteLangMutation } from '../../redux/slices/guideSlice/guideApiSlice'
import { useGuideAddPriceMutation } from '../../redux/slices/guideSlice/guideApiSlice'
import { useGuideAddDescMutation } from '../../redux/slices/guideSlice/guideApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/userComponents/loading'
import NavBar from '../../components/guideComponents/navbar/GuideNavbar'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useGuideGetDataMutation } from '../../redux/slices/guideSlice/guideApiSlice'
const GuideAddData = () => {
  const { guideInfo } = useSelector((state) => state.guideAuth)
  const [price, setPrice] = useState('')
  const [Language, setLanguage] = useState('')
  const [Desciption, setDescription] = useState('')

  const [addLanguage, { isLoading }] = useGuideAddLanguageMutation()
  const [addPrice, { isPriceLoading }] = useGuideAddPriceMutation()
  const [addDescription] = useGuideAddDescMutation()
  const navigate = useNavigate()
  const [guideData, setGuideData] = useState([])
  const [guideDataFromAPI] = useGuideGetDataMutation()
  const [guideDelete] = useGuideDeleteLangMutation()
  useEffect(
    () => {
      try {
        const fetchData = async () => {
          const responseFromApiCall = await guideDataFromAPI({
            guideId: guideInfo.data.email,
          })

          const guideArray = responseFromApiCall.data.guideData

          setGuideData(guideArray[0])

          setPrice(guideArray[0]?.price || '')
          setDescription(guideArray[0]?.Description || '')
        }

        fetchData()
      } catch (error) {
        toast.error(error)

        console.error('Error fetching users:', error)
      }
    },
    [],
    guideData,
  )
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const capitalizedLanguage = Language.toUpperCase()
      const responseFromApiCall = await addLanguage({
        guideId: guideInfo.data.email,
        Lan: capitalizedLanguage,
      }).unwrap()
      console.log(responseFromApiCall)
      if (responseFromApiCall) {
        toast.success('Language added Successfully.')
        navigate('/guideHome')
      }
    } catch (err) {
      if (err.data && err.data.message) {
        toast.error(err.data.message)
      } else {
        toast.error('An error occurred. Please try again.') // Generic error message
      }
    }
  }

  const handleSubmitPrice = async (e) => {
    e.preventDefault()
    try {
      const responseFromApiCall = await addPrice({
        guideId: guideInfo.data.email,
        price: price,
      })

      if (responseFromApiCall) {
        toast.success('Price Updated Successfully.')
        navigate('/guideHome')
      } else {
        toast.error('error')
      }
    } catch (error) {
      console.error('Error adding language:', error.message)
    }
  }
  const handleSubmitDesc = async (e) => {
    e.preventDefault()
    try {
      const responseFromApiCall = await addDescription({
        guideId: guideInfo.data.email,
        description: Desciption,
      })

      if (responseFromApiCall) {
        toast.success('Description Added Successfully.')
        navigate('/guideHome')
      } else {
        toast.error('error adding')
      }
    } catch (error) {
      console.error('ErrorAdding Description:', error.message)
    }
  }

  const handleDeleteLanguage = async (lan) => {
    try {
      const response = await guideDelete({lan,guideId:guideInfo.data._id}).unwrap()
      if(response){
        toast.success('Language deleted')
      }
       setGuideData((prevData) => {
         const updatedLanguages = prevData.Language.filter(
           (lang) => lang !== lan,
         )
         return { ...prevData, Language: updatedLanguages }
       })
    } catch (error) {
       if (err.data && err.data.message) {
         toast.error(err.data.message)
       } else {
         toast.error('An error occurred. Please try again.') // Generic error message
       }
    }
  }
  return (
    <>
      <div>
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
                        {' '}
                        Add Language
                      </MDBBtn>
                    </div>
                  </form>
                  <div>
                    <strong>Existing Languages:</strong>
                    <ul>
                      {guideData.Language &&
                        guideData.Language.map((lang, index) => (
                          <li
                            key={index}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <span>{lang}</span>{' '}
                            <MDBBtn
                              color="danger"
                              size="sm"
                              onClick={() => handleDeleteLanguage(lang)}
                            >
                              Delete
                            </MDBBtn>
                          </li>
                        ))}
                    </ul>
                  </div>
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
                        {' '}
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
  )
}

export default GuideAddData
