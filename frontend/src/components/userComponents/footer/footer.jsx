import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div>
         <h3>WAYFARER</h3>
            <p>Chooose your destination</p>
        </div>
        <div>
            <a href="/"><i className="fa-brands fa-facebook-square"></i></a>
            <a href="/"><i className="fa-brands fa-instagram-square"></i></a>
            <a href="/"><i className="fa-brands fa-facebook-square"></i></a>
            <a href="/"><i className="fa-brands fa-facebook-square"></i></a>
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
  );
};

export default Footer