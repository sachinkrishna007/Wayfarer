import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const GuidePrivateRoute = ({ element }) => {
  const { guideInfo } = useSelector((state) => state.guideAuth)
  return guideInfo ? element : <Navigate to="/guideLogin" />
}
export default GuidePrivateRoute
