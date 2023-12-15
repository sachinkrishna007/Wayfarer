import React, { useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import AdminSidebar from '../../components/adminComponents/sidebar'
import { useAdmingetCategoryMutation, useCreateCategoryMutation } from '../../redux/slices/adminSlice/adminApiSlice'
import { useState } from 'react'
import { Button } from 'primereact/button'
import { toast } from 'react-toastify'


const Category = () => {
  const [CategoryName, setCategory] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [createCategory] = useCreateCategoryMutation()
  const [listCategory] = useAdmingetCategoryMutation()

  const getCategory = async () => {

    const response = await listCategory()
    console.log(response);
    if (response) {
      setCategoryList(response.data.categoriesData)
    }
  }

  const SubmitHandler = async () => {
    try {
      const responseFromApiCall = await createCategory({
        CategoryName,
      }).unwrap()
      if (responseFromApiCall) {
        toast.success('Successfully added')
        // After successfully adding a category, refresh the category list
        getCategory()
      }
    } catch (err) {
      if (err.data && err.data.message) {
        toast.error(err.data.message)
      } else {
        toast.error('An error occurred. Please try again.') // Generic error message
      }
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <div>
      <AdminSidebar />

      <div className="grid grid-cols-12 gap-4" style={{ padding: '90px',}}>

        <div className="col-12 md:col-6" style={{}}>
          <div className="card p-fluid" style={{ width: '100%' }}>
            <h5>Add Category For Guides</h5>
            <div className="field grid">
              <label htmlFor="name3" className="col-12 mb-2 md:col-2 md:mb-0">
                Category
              </label>
              <div className="col-12 md:col-10">
                <InputText
                  id="name3"
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <Button
                label="Submit"
                onClick={SubmitHandler}
                style={{
                  width: '100px',
                  marginLeft: '100px',
                  marginTop: '10px',
                }}
              ></Button>
            </div>
          </div>
        </div>

  
        <div className="col-12 md:col-6">
          <div className="card p-fluid" style={{ width: '100%' }}>
            <h5>Category List</h5>
            <ul>
              {categoryList &&
                categoryList.map((category) => (
                  <li key={category._id}>{category.name}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
