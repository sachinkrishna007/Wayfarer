import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import debounce from 'lodash/debounce'
import { Paginator } from 'primereact/paginator'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './card.css'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Calendar } from 'primereact/calendar'
import { useSelector } from 'react-redux'
import { guideSlice } from '../../../redux/slices/guideSlice/guideApiSlice'
import { useGetFilteredGuidesMutation } from '../../../redux/slices/userApiSlice'
export default function GuideList({ guide }) {
  const { userInfo } = useSelector((state) => state.auth)
  
  const navigate = useNavigate()

  const footer = <></>

  const [searchQuery, setSearchQuery] = useState('')
  const [guideid, setguideId] = useState([])
  const [Startdates, setStartDates] = useState(null)
  const [Enddates, setEndDates] = useState(null)
  const [filterDates] = useGetFilteredGuidesMutation()
  const delayedSearch = debounce((value) => {
    setSearchQuery(value)
  }, 400)
  const handleSearch = (event) => {
    const { value } = event.target
    delayedSearch(value)
  }
const handleFilter =async (event)=>{
  console.log('here');
const responseFromApiCall = await filterDates({Startdates,Enddates}).unwrap()
if(responseFromApiCall){
setguideId(responseFromApiCall.data.availableGuideIds)
console.log(guideid);
}

}

  const filteredGuides = guide.filter(
    (guides) =>
      guides.Location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guides.firstname.toLowerCase().includes(searchQuery.toLowerCase()),
    
  )
  const header = guide.profileImage ? (
    <img
      alt="Guide Profile"
      src={guide.profileImage}
      style={{ width: '100%' }}
    />
  ) : null
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(6)

  const onPaginationChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)
  }
  return (
    <div>
      <div>
        <h1 className="guideHeading">Available Guides</h1>
      </div>

      <div className="search-guide-container">
        <div className="search-input-container">
          <span className="p-input-icon-left">
            <i className="pi pi-spin pi-spinner" />
            <InputText
              placeholder="Search your Location"
              onChange={handleSearch}
            />
          </span>
        </div>
        <div className="calendar-container">
          {/* <Calendar
            value={Startdates}
            onChange={(e) => {
              setStartDates(e.target.value)
             
            }}
          
            readOnlyInput
          />
          <Calendar
            value={Enddates}
            onChange={(e) => {
              setEndDates(e.target.value)
              handleFilter(e)
            }}
          
            readOnlyInput
          /> */}
        </div>
      </div>

      {guide && guide.length > 0 ? (
        <div className="card-container">
          {filteredGuides.slice(first, first + rows).map((guideInfo, index) => (
            <Card key={index} className="small-card">
              <div>
                <h3 className="title">{`${guideInfo.firstname} ${guideInfo.Lastname}`}</h3>
                <img
                  src={guideInfo.profileImage}
                  alt={`Profile of ${guideInfo.firstname}`}
                  style={{ width: '100%', height: '250px' }}
                  className="guideimage"
                />
                <p>{''}</p>
                <p className="subtitle">
                  <FaMapMarkerAlt /> Location: {guideInfo.Location}
                </p>

                <Link to={`/guideDetailedView/${guideInfo._id}`}>
                  <Button
                    label="View Details"
                    className="p-button-raised p-button-info"
                  />
                </Link>
                {/* Add more details or customize the display as needed */}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <h1>No guides available currently</h1>
      )}
      <Paginator
        first={first}
        rows={rows}
        totalRecords={filteredGuides.length}
        onPageChange={onPaginationChange}
      />
    </div>
  )
}
