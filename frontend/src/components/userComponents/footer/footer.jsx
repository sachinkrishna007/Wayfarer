import './footer.css'

import 'primeicons/primeicons.css'

const Footer = () => {
  return (
    <div  className="footer">
      <div className="top">
        <div>
          <img style={{height:"5rem"}} src="./wayfarer2.png" alt="" />
         
        </div>
        <div>
          <a href="/">
            <i
              className="pi pi-linkedin
 mr-3"
            ></i>
          </a>
          <a href="/">
            <i
              className=" pi pi-instagram mr-3
"
            ></i>
          </a>
          <a href="/">
            <i
              className="pi pi-facebook
"
            ></i>
          </a>
          <a href="/">
            {/* <i
              className=" pi pi-twitter
"
            ></i> */}
          </a>
        </div>
      </div>
      <div className="bottom">
        <div>
          <h4>Project</h4>
          <a href="">Changelog</a>
          <a href="">Staus</a>
          <a href="">Version</a>
        </div>
        <div>
          <h4>Community</h4>
          <a href="">Git</a>
          <a href="">issues</a>
          <a href="">Project</a>
        </div>
        <div>
          <h4>Help</h4>
          <a href="">Support</a>
          <a href="">Trobleshooting</a>
          <a href="">Contact Us</a>
        </div>
        <div>
          <h4>Others</h4>
          <a href="">Terms of Service</a>
          <a href="">Privacy Policy</a>
          <a href="">License</a>
        </div>
      </div>
    </div>
  )
}

export default Footer
