import React, { useEffect, useState } from 'react'
import { useGetBlogsMutation } from '../../../redux/slices/userApiSlice'
import { Button } from 'primereact/button'
import { DataView } from 'primereact/dataview'
import { Tag } from 'primereact/tag'
import { Sidebar } from 'primereact/sidebar'
import moment from 'moment'
import NavBar from '../../../components/userComponents/navBar/NavBar'

const UserBlog = () => {
  const [getBlogs] = useGetBlogsMutation()
  const [blogs, setBlogs] = useState([])
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [displayDialog, setDisplayDialog] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBlogs()
        if (response) {
          setBlogs(response.data.blog)
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    fetchData()
  }, [getBlogs])

  const itemTemplate = (blog) => {
    return (
      <div>
        <div className="col-12  " style={{ paddingTop: '110px' }}>
          <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
            <img
              className="w-9 sm:w-16rem xl:w-10rem h-200px shadow-2 block xl:block mx-auto border-round"
              src={blog.imageUrl}
              alt={blog.title}
            />

            <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
              <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                <div className="text-2xl font-bold text-900">{blog.title}</div>
                <div className="flex align-items-center gap-3">
                  <span className="flex align-items-center gap-2">
                    <i className="pi pi-tag"></i>
                    {blog.tags && (
                      <span className="font-semibold">{blog.tags}</span>
                    )}
                  </span>
                </div>

                <div className="text-xl font-bold text-5">
                  Posted By "{blog.guide.firstname} {blog.guide.Lastname}"
                </div>

                <p>Posted {moment(blog.createdAt).fromNow()}</p>
              </div>
              <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                <Button
                  label="Read More"
                  onClick={() => {
                    setSelectedBlog(blog)
                    setDisplayDialog(true)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const onHide = () => {
    setDisplayDialog(false)
    setSelectedBlog(null)
  }

  return (
    <div>
      <NavBar></NavBar>

      <div className="card">
        <DataView value={blogs} itemTemplate={itemTemplate} />
      </div>

      <Sidebar
        visible={displayDialog}
        onHide={onHide}
        fullScreen
        style={{ padding: '10px 30px' }}
      >
        {selectedBlog && (
          <>
            <h2 className="text-5xl font-bold text-900">
              {selectedBlog.title}
            </h2>
            <p>Posted {moment(selectedBlog.createdAt).fromNow()}</p>
            <img
              src={selectedBlog.travelImages} // Assuming 'photo' is the field in the Guide model containing the photo URL
              alt={selectedBlog.guide.firstname}
              className="p-mb-2"
              style={{ height: '300px' }}
            />
            <br />
            <br />

            <div
              dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
            />

            <img
              src={selectedBlog.guide.profileImage} // Assuming 'photo' is the field in the Guide model containing the photo URL
              alt={selectedBlog.guide.firstname}
              className="p-mb-2"
              style={{ height: '40px' }}
            />
            <p className="text-xl font-bold text-5">
              By {selectedBlog.guide.firstname} {selectedBlog.guide.Lastname}
            </p>
          </>
        )}
      </Sidebar>
    </div>
  )
}

export default UserBlog
