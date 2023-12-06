import { useEffect, useState } from 'react'
import { Button, Modal, Table, Form as BootstrapForm } from 'react-bootstrap'
import { useGetUserDataMutation } from '../../redux/slices/userApiSlice'
import { Paginator } from 'primereact/paginator'
import {
  useBlockUserMutation,
  useUnBlockUserMutation,
} from '../../redux/slices/adminSlice/adminApiSlice'
import AdminSidebar from '../../components/adminComponents/sidebar'
import './table.css'
import { toast } from 'react-toastify'
const Userlist = () => {
  const [guideDataFromAPI, { isLoading }] = useGetUserDataMutation()
  const [userData, setUserData] = useState([])
  useEffect(() => {
    fetchData()
  }, [userData])

  const fetchData = async () => {
    const responseFromApiCall = await guideDataFromAPI()
    console.log(responseFromApiCall)

    const userArray = responseFromApiCall.data.user

    setUserData(userArray)
  }
  const [searchQuery, setSearchQuery] = useState('')

  const [userIdToBlock, setUserIdToBlock] = useState(null)
  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredUsers = userData.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(5)

  const onPaginationChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)
  }

  const [blockuser, { isLoading: isBlocking }] = useBlockUserMutation()
  const [unblockuser, { isLoading: isunBlocking }] = useUnBlockUserMutation()

  const handleBlock = async (userId) => {
    try {
      const responseFromApiCall = await blockuser({ userId })

      console.log('Block API Response:', responseFromApiCall)

      if (responseFromApiCall.success) {
        toast.success('Block successful')
        // Update the guideData state to reflect the change in the UI
        setUserData((prevData) => {
          const updatedData = prevData.map((user) =>
            user._id === userId ? { ...user, isBlocked: true } : user,
          )

          return updatedData
        })
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.error)
    }
  }

  const handleUnblock = async (userId) => {
    try {
      const responseFromApiCall = await unblockuser({ userId })

      console.log('Unblock API Response:', responseFromApiCall)

      if (responseFromApiCall.success) {
        toast.success('User unblocked successfully.')
        // Update the guideData state to reflect the change in the UI
        setUserData((prevData) => {
          const updatedData = prevData.map((user) =>
            user._id === userId ? { ...user, isBlocked: false } : user,
          )

        
          return updatedData
        })
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.error)
    }
  }

  return (
    <>
      <AdminSidebar></AdminSidebar>
      <div>
        <h3 className="Heading">User Management</h3>
      </div>
      <div className="Table">
        <BootstrapForm>
          <BootstrapForm.Group
            className="mt-3"
            controlId="exampleForm.ControlInput1"
          >
            <BootstrapForm.Label>Search users:</BootstrapForm.Label>
            <BootstrapForm.Control
              style={{ width: '500px' }}
              value={searchQuery}
              type="text"
              placeholder="Enter Name or email........"
              onChange={handleSearch}
            />
          </BootstrapForm.Group>
        </BootstrapForm>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Profile image</th>
              <th> Name</th>

              <th>Email</th>

              <th>Block</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.slice(first, first + rows).map((user, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={
                      user.profileImageName
                        ? user.profileImageName
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz_hPrEDS3XE8LQIEQRNSSMzc8IryJhz_iXQ&usqp=CAU'
                    }
                    alt={`Guide ${index}`}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                    }}
                  />
                </td>
                <td>
                  {user.firstName} {user.LastName}
                </td>

                <td>{user.email}</td>

                <td>
                  <Button
                    type="button"
                    variant={user.isBlocked ? 'success' : 'warning'}
                    className="mt-3"
                    disabled={isBlocking || isunBlocking} // Disable the button during API calls
                    onClick={() => {
                      if (user.isBlocked) {
                        // Unblock the user
                        handleUnblock(user._id)
                      } else {
                        // Block the user
                        handleBlock(user._id)
                      }
                    }}
                  >
                    {isBlocking || isunBlocking
                      ? 'Processing...'
                      : user.isBlocked
                        ? 'Unblock'
                        : 'Block'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginator
          first={first}
          rows={rows}
          totalRecords={filteredUsers.length}
          onPageChange={onPaginationChange}
        />
      </div>
    </>
  )
}

export default Userlist
