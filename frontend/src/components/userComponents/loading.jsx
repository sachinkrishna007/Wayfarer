import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <>
    
      <Spinner animation="border" variant="primary" />

      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="light" />
      <Spinner animation="grow" variant="dark" />
    </>
  );
};

export default Loader;
