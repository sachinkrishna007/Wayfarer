import './popular.css'

function PopularData(props) {
  return (
    <div className="t-card">
      <div className="t-image">
        <img src={props.image} alt="asds" />
      </div>
      <h4>{props.heading}</h4>
      <p>{props.text}</p>
    </div>
  )
}

export default PopularData
