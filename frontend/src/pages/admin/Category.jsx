import React from 'react'
import { InputText } from 'primereact/inputtext'
import AdminSidebar from '../../components/adminComponents/sidebar'
import { useCreateCategoryMutation } from '../../redux/slices/adminSlice/adminApiSlice'
import { useState } from 'react'
import { Button } from 'primereact/button'
import { toast } from 'react-toastify'
const Category = () => {
  const[CategoryName,setCategory] = useState("")
  const [createCategory] = useCreateCategoryMutation()
  const SubmitHandler = async()=>{
    console.log('here');
    try {
        const responseFromApiCall = await createCategory({ CategoryName }).unwrap()
        if (responseFromApiCall) {
          toast.success('sucessfully added')
        }
    } catch (err) {
     if (err.data && err.data.message) {
       toast.error(err.data.message)
     } else {
       toast.error('An error occurred. Please try again.') // Generic error message
     }
      
    }
  
  }
  return (
    <div>
      <AdminSidebar />

      <div className="col-12 md:col-6" style={{ padding: '90px' }}>
        <div className="card p-fluid" style={{ width: '500px' }}>
          {/* Adjusted width here */}
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
            <Button label="Submit" onClick={SubmitHandler} style={{width:"100px", marginLeft:'100px', marginTop:"10px"}}></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
