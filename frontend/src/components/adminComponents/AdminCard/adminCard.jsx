import React, { useState,useEffect } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import './admincard.css'
import { toast } from 'react-toastify'
import { PROFILE_IMAGE_DIR_PATH } from '../../../utils/constances'
import { useGuideAcceptRequestMutation } from '../../../redux/slices/adminSlice/adminApiSlice'
import { useGuideRequestMutation } from '../../../redux/slices/adminSlice/adminApiSlice'
export default function AdminCard() {
 
  const [visible, setVisible] = useState(false)
 const [guide, setGuideData] = useState([])
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [guideId, setacceptReqGuide] = useState(null)
const [guideDataFromAPI] = useGuideRequestMutation()
  const [showModal, setShowModal] = useState(false) // State for the update modal
  const [acceptGuide, { isLoading }] = useGuideAcceptRequestMutation()
  console.log(selectedGuide)

  const header = (
    <img alt="Card" src="/guide.avif" style={{ height: '16rem' }} />
  )

  const footer = <></>

    const fetchData = async () => {
      const responseFromApiCall = await guideDataFromAPI()

      const guideArray = responseFromApiCall.data.guideData

      setGuideData(guideArray)
    }

 
    useEffect(() => {
      
      fetchData()
     
    }, [])

  const handleAgree = async () => {
    try {
      console.log(guideId)
      console.log('here')
      const responseFromApiCall = await acceptGuide({ userId: guideId })
      if (responseFromApiCall) {
        toast.success('User accepted Successfully.')
        fetchData()
     
        setacceptReqGuide(null) 
        setShowModal(false)
        
      }
    } catch (err) {}
  }

  return (
    <div>
      <div>
        <h3 className="headingTop">Guide Requests </h3>
      </div>
      <Dialog
        visible={showModal}
        style={{ width: '30%' }}
        onHide={() => setShowModal(false)}
        header="Confirm Request"
        modal
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setShowModal(false)}
              style={{ backgroundColor: '#FF5733', marginRight: '10px' }}
            />
            <Button
              label="Accept"
              icon="pi pi-check"
              onClick={handleAgree}
              disabled={isLoading}
              style={{ backgroundColor: '#4CAF50' }}
            />
          </div>
        }
      >
        <p>Are you sure you want to accept this Guide?</p>
      </Dialog>
      <Dialog
        visible={visible}
        style={{ width: '30%' }}
        onHide={() => setVisible(false)}
        header="ID Card"
        modal
      >
        {selectedGuide && (
          <img
            alt="ID Card"
            // src={`http://localhost:5000/guideImages/${selectedGuide.idCardFile}`}
            src={selectedGuide.idCardFile}
            style={{ width: '100%' }}
          />
        )}
      </Dialog>

      <div className="card-container">
        {guide.map((guide, index) => (
          <Card
            key={index}
            title={
              <span className="title">{`${guide.firstname} ${guide.Lastname}`}</span>
            }
            subTitle={<span className="subTitle">{guide.Location}</span>}
            footer={footer}
            header={header}
            className="small-card zoom-in-card"
            role="region"
          >
            <div>
              <strong className="mobilead">Mobile:</strong> {guide.mobile}
            </div>
            <div className="button-container">
              {/* Wrapping buttons in a container */}
              <div className="button-wrapper">
                <Button
                  label="View ID Card"
                  icon="pi pi-image"
                  onClick={(e) => {
                    setSelectedGuide(guide)
                    setVisible(true)
                  }}
                />
              </div>
              <div className="button-wrapper">
                <Button
                  className="btnagree"
                  label="Approve Guide"
                  onClick={(e) => {
                    setacceptReqGuide(guide)
                    setShowModal(true)
                  }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
