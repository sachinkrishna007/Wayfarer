import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import debounce from 'lodash/debounce'
import { Chip } from 'primereact/chip'
import { Slider } from 'primereact/slider'
import { Paginator } from 'primereact/paginator'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './card.css'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { useSelector } from 'react-redux'
import { guideSlice } from '../../../redux/slices/guideSlice/guideApiSlice'
import { useGetFilteredGuidesMutation } from '../../../redux/slices/userApiSlice'
import { useGetGuideDataMutation } from '../../../redux/slices/userApiSlice'
export default function GuideList() {
  const { userInfo } = useSelector((state) => state.auth)
  const [guideData, setGuideData] = useState([])
  const [guideDataFromAPI, { isLoading }] = useGetGuideDataMutation()
  const [activityFilter, setActivityFilter] = useState('')
  // const [priceRangeFilter, setPriceRangeFilter] = useState([500, 100])
  const navigate = useNavigate()

  const footer = <></>

  const [Searchquery, setSearchQuery] = useState('')

  const delayedSearch = debounce((value) => {
    setSearchQuery(value)
  }, 400)

  const handleSearch = (event) => {
    const { value } = event.target
    setSearchQuery(value)
    console.log(Searchquery)
  }

  const handleActivityFilter = (event) => {
    const { value } = event.target
    setActivityFilter(value)
  }
  // const handlePriceRangeFilter = (value) => {
  //   setPriceRangeFilter(value)
  // }
  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseFromApiCall = await guideDataFromAPI({
          Searchquery,
          activityFilter,
        })

        const guideArray = responseFromApiCall.data.guideData

        setGuideData(guideArray)
      }

      fetchData()
    } catch (error) {
      toast.error(error)

      console.error('Error fetching users:', error)
    }
  }, [Searchquery, activityFilter])
  console.log(guideData)

  // const handleFilter =async (event)=>{
  //   console.log('here');
  // const responseFromApiCall = await filterDates({Startdates,Enddates}).unwrap()
  // if(responseFromApiCall){
  // setguideId(responseFromApiCall.data.availableGuideIds)
  // console.log(guideid);
  // }

  // }

  const header = guideData.profileImage ? (
    <img
      alt="Guide Profile"
      src={guideData.profileImage}
      style={{ width: '100%' }}
    />
  ) : null
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(6)

  const onPaginationChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)
  }

  const clearFilter = () => {
    setSearchQuery('')
    setActivityFilter('')
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
        <div className="filter-activity-container">
          <span className="p-float-label  p-input-icon-left p-input-group">
            <Dropdown
              value={activityFilter}
              options={['WildLife', 'Adventure', 'History', 'Trekking']} // Add your activity options
              onChange={handleActivityFilter}
              option="Activity"
              placeholder="Select an activity"
            />
            <label htmlFor="activityFilter">Filter by Activity</label>
          </span>

          {activityFilter && (
            <Button
              icon="pi pi-times" // Add an 'X' icon
              onClick={clearFilter}
            />
          )}
        </div>

        {/* <div className="w-14rem">
          <InputText
            value={priceRangeFilter ? priceRangeFilter : 'Add range'}
            className="w-full"
          />
          <Slider
            value={priceRangeFilter ? priceRangeFilter : 'Add range'}
            range
            onChange={(e) => handlePriceRangeFilter(e.value)}
            className="w-full"
          />
        </div> */}

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

      {guideData && guideData.length > 0 ? (
        <div className="card-container">
          {guideData.slice(first, first + rows).map((guideInfo, index) => (
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
                <div>
                  {guideInfo.category.slice(0, 3).map((cat, index) => (
                    <Chip key={index} label={cat} className="activity-chip" />
                  ))}
                </div>

                <Link to={`/guideDetailedView/${guideInfo._id}`}>
                  <Button
                    label="View Details"
                    className="p-button-raised gradient-button" /* Apply the third style */
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
        totalRecords={guideData.length}
        onPageChange={onPaginationChange}
      />
    </div>
  )
}
