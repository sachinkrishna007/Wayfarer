import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminPrivateRoute = ({ element }) => {
  const { adminInfo } = useSelector((state) => state.adminAuth)
  console.log(adminInfo)
  return adminInfo ? element : <Navigate to="/adminLogin" />
}
export default AdminPrivateRoute
