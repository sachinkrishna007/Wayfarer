import React, { useState,useEffect } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Link, useNavigate } from 'react-router-dom'
import debounce from 'lodash/debounce'
import './cover.css'
const Cover = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const searchHandler = (event) => {
    const { value } = event.target
    debouncedSearchHandler(value)
  }


    const debouncedSearchHandler = debounce((value) => {
      setSearchQuery(value)
    }, 400)

    useEffect(() => {
      // Navigate when the state has been updated
      if (searchQuery.trim() !== '') {
        navigate(`/guideList`)
      }
    }, [searchQuery, navigate])
  return (
    <div>
      <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
            <span className="block text-6xl text-dark font-bold mb-1">
              Explore the World
            </span>
            <div className="text-6xl  font-bold mb-3 secondText">
              Beyond Imagination with Our Expert Guides!sdfsdfs
            </div>
            <p className="mt-0 mb-4 text-700 line-height-3">
              Find experienced and passionate guides for every destination. From
              local insights to expert recommendations, our platform connects
              you with guides who enhance your travel experience. Explore,
              connect, and embark on your next adventure with confidence!"
            </p>
            <Link to={'/'}>
              <Button
                label="Learn More"
                type="button"
                className="mr-3 p-button-raised LearnMoreBTn"
              />
            </Link>

            {/* <span className="p-input-icon-left">
              <i className="pi pi-search SearchCover" />
              <InputText
                placeholder="Search Your Location"
                onChange={searchHandler}
              />
            </span> */}
          </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden coverimg ">
          <img
            src="https://images.unsplash.com/photo-1482446439224-59276c41a5fc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="hero-1"
            className="md:ml-auto block md:h-full"
            style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Cover
