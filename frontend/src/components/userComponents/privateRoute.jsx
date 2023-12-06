import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ element }) => {
  const { userInfo } = useSelector((state) => state.auth)
  return userInfo ? element : <Navigate to="/login" />
}
export default PrivateRoute
