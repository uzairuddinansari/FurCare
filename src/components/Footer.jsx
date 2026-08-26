import React from "react";
import "../style/footer.css";

const galleryImages = [
  "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500",
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500",
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500",
  "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500",
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500"
];

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">
      <section className="footer-cta">
        <div className="cta-content">
          <div>
            <span className="cta-label">PAWS & CARE</span>
            <h2>Because Every Pet Deserves The Best Care</h2>
            <p>
              Professional pet care, trusted services and genuine love
              for every furry friend.
            </p>
          </div>

          <button className="cta-button">
            Book A Service
            <span>→</span>
          </button>
        </div>
      </section>


      <div className="footer-main">

        <div className="footer-brand">

          <div className="brand-box">
            <div className="brand-logo">
              <svg
    className="paw-icon"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.2 29.4C14.8 29.4 11 24.7 11 19.5C11 14.6 14 11 18.1 11C22.7 11 25.9 15.9 25.9 20.3C25.9 25.2 23.5 29.4 20.2 29.4Z"
      fill="currentColor"
    />
    <path
      d="M43.8 29.4C40.5 29.4 38.1 25.2 38.1 20.3C38.1 15.9 41.3 11 45.9 11C50 11 53 14.6 53 19.5C53 24.7 49.2 29.4 43.8 29.4Z"
      fill="currentColor"
    />
    <path
      d="M12.6 38.8C9.4 35.6 4.8 36.1 2.5 39.3C0.2 42.5 1.5 47.1 5.1 49.1C8.8 51.1 13.1 49.7 15 46.2C16.7 43.2 15.5 41.6 12.6 38.8Z"
      fill="currentColor"
    />
    <path
      d="M51.4 38.8C54.6 35.6 59.2 36.1 61.5 39.3C63.8 42.5 62.5 47.1 58.9 49.1C55.2 51.1 50.9 49.7 49 46.2C47.3 43.2 48.5 41.6 51.4 38.8Z"
      fill="currentColor"
    />
    <path
      d="M32 28.7C25.1 28.7 19.1 35.4 18.3 42.7C17.5 49.5 21.2 54 26.2 54C29.3 54 30.2 51.8 32 51.8C33.8 51.8 34.7 54 37.8 54C42.8 54 46.5 49.5 45.7 42.7C44.9 35.4 38.9 28.7 32 28.7Z"
      fill="currentColor"
    />
               </svg>
            </div>

            <div>
              <h3>FurEver<span>&</span>CARE</h3>
              <p>Care for the Paws</p>
            </div>
          </div>

          <p className="brand-description">
            Dedicated to providing safe, loving and professional care
            for your beloved pets. Your pet's happiness is our priority.
          </p>

          <div className="contact-item">
            <div className="contact-icon">☎</div>

            <div>
              <strong>+92 123 456 789</strong>
              <span>24/7 Customer Call Support</span>
            </div>
          </div>

          <div className="address">
            <small>OUR ADDRESS</small>
            <p>82 Riverside Street,Pakistan Karachi</p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="social-links">
            <a href="#twitter">𝕏</a>
            <a href="#facebook">f</a>
            <a href="#linkedin">in</a>
            <a href="#instagram">◎</a>
          </div>

        </div>


        {/* HELP COLUMN */}
        <div className="footer-column">
          <h4>Help</h4>

          <a href="#pet-services">Pet Services</a>
          <a href="#careers">Careers</a>
          <a href="#help-center">Help Center</a>
          <a href="#treats">Treats Program</a>
          <a href="#charities">Charities</a>
          <a href="#privacy">Privacy</a>
        </div>


        {/* COMPANY COLUMN */}
        <div className="footer-column">
          <h4>Company</h4>

          <a href="#services">Our Services</a>
          <a href="#sitemap">Sitemap</a>
          <a href="#careers">Careers</a>
          <a href="#contact">Contact</a>
          <a href="#faq">FAQ</a>
        </div>


        {/* GALLERY */}
        <div className="footer-gallery">
          <h4>Gallery</h4>

          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div className="gallery-item" key={index}>
                <img
                  src={image}
                  alt={`Pet gallery ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>


        {/* WORKING HOURS */}
        <div className="working-hours">
          <h4>Working Hours</h4>

          <div className="hours-card">

            <div className="hours-row">
              <span>Mon - Fri</span>
              <strong>9am - 6pm</strong>
            </div>

            <div className="hours-row">
              <span>Saturday</span>
              <strong>9am - 4pm</strong>
            </div>

            <div className="hours-row">
              <span>Sunday</span>
              <strong>Closed</strong>
            </div>

          </div>
        </div>

      </div>

      <div className="footer-bottom">

        <div className="footer-bottom-links">
          <a href="#terms">Terms of Use</a>
          <a href="#privacy">Privacy / Environmental Policy</a>
        </div>

        <p>
          © 2026 FurEver&Care. All Rights Reserved.
        </p>

      </div>



      <button
        className="back-to-top"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>

    </footer>
  );
}

export default Footer;