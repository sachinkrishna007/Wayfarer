import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { FileUpload } from 'primereact/fileupload'
import { InputTextarea } from 'primereact/inputtextarea'
import { useSelector } from 'react-redux'
import NavBar from '../../../components/guideComponents/navbar/GuideNavbar'
import { useCreateBlogsMutation } from '../../../redux/slices/guideSlice/guideApiSlice'
import { Button } from 'primereact/button'
import { useRef } from 'react'
import { Toast } from 'primereact/toast'
const GuideBlog = () => {
  const { guideInfo } = useSelector((state) => state.guideAuth)
  const toast = useRef(null)
  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Blog Posted Successfully',
      life: 3000,
    })
  }
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [image, setImage] = useState(null)
  const [travelImages, setTravelImages] = useState([])
  const [CreateBlog] = useCreateBlogsMutation()
  const [previewImage, setPreviewImage] = useState(null)
  const [ExtraImage, setPrevieweXTRAImage] = useState(null)

  const [tags, setTags] = useState('')

  const handleImage = (e) => {
    const file = e.target.files[0]
    setFileToBase2(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const setFileToBase2 = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      console.log(reader.result)
      setImage(reader.result)
    }
  }
  const handleImages2 = (e) => {
    const files = e.target.files[0]
    setFileToBase(files)
    setPrevieweXTRAImage(URL.createObjectURL(files))
  }

  const setFileToBase = (files) => {
    const reader = new FileReader()
    reader.readAsDataURL(files)
    reader.onloadend = () => {
      console.log(reader.result)
      setTravelImages(reader.result)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const responseFromApiCall = await CreateBlog({
        title,
        description,
        videoUrl,
        image,
        travelImages,
        tags,
        guide: guideInfo.data._id,
      }).unwrap()

      if (responseFromApiCall) {
        showSuccess()
      }
    } catch (error) {
      if (err.data && err.data.message) {
        toast.error(err.data.message)
      } else {
        toast.error('An error occurred. Please try again.') // Generic error message
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <NavBar></NavBar>
      <Toast ref={toast} />
      <div className="col-12" style={{ padding: '10px 40px' }}>
        <div className="card" style={{ padding: '10px 40px' }}>
          <h5>Add Blog</h5>
          <form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-12">
                <label htmlFor="title">Title</label>
                <InputText
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="field col-12 md:col-12">
                <label htmlFor="description">Description</label>
                <InputTextarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="field col-12">
                <label htmlFor="videoUrl">Video URL</label>
                <InputText
                  id="videoUrl"
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
              <div className="field col-12">
                <label htmlFor="image">Cover Pic</label>
                <br />

                <input
                  type="file"
                  id="image"
                  accept=".jpg, .jpeg, .png, .pdf,.avif,.webp"
                  onChange={handleImage}
                />

                {previewImage && (
                  <div style={{ marginTop: '10px' }}>
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                  </div>
                )}
<br />
<br />

                <div className="field col-10">
                  <label htmlFor="images">Additional Image</label>
                  <br />
                  <input
                    type="file"
                    id="images"
                    accept=".jpg, .jpeg, .png, .pdf,.avif,.webp"
                    onChange={handleImages2}
                  />
                </div>
                {/* You may need to handle file uploads on the server side */}
              {ExtraImage && (
                <div style={{ marginTop: '10px' }}>
                  <img
                    src={ExtraImage}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                  />
                </div>
              )}
              </div>
           
           

              <div className="field col-12 md:col-6">
                <label htmlFor="tags">Tags</label>
                <InputText
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>
            <Button
              type="submit"
              label={loading ? 'Posting...' : 'Post Blog'}
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default GuideBlog
