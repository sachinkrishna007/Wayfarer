import { Spinner } from 'react-bootstrap'

const Loader = () => {
  const loaderContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Adjust as needed
    
  }

  return (
    <div style={loaderContainerStyle}>
      <Spinner animation="border" variant="primary" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="light" />
      <Spinner animation="grow" variant="dark" />
    </div>
  )
}

export default Loader
