import React from "react";
import "../style/contact.css";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
  };

  return (
    <main className="newsletter-page">

      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>
      <div className="bg-circle bg-circle-3"></div>

      <section className="newsletter-container">

    
        <div className="cat-section">

          <div className="portal">
            <div className="portal-inner"></div>
          </div>

      
          <img
            className="cat-image2"
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=90"
            alt="Cute Cat"
          />

          <div className="floating-circle circle-left"></div>
          <div className="floating-circle circle-bottom"></div>
          <div className="floating-circle circle-right"></div>

        </div>

      
        <div className="content-section">

          <div className="badge">
            <span className="paw-icon">
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
  </svg></span>
            NEWSLETTER
          </div>

          <h1>
            Subscribe for
            <br />
            <span>Pet Updates</span>
          </h1>

          <div className="divider">
            <span></span>
            <b><svg
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
  </svg></b>
            <span></span>
          </div>

          <p className="description">
            Stay connected with us! Subscribe to our newsletter
            and receive helpful pet care tips, latest updates,
            and adorable moments directly in your inbox.
          </p>

          <form
            className="newsletter-form"
            onSubmit={handleSubmit}
          >

            <div className="input-box">

              <input
                type="email"
                placeholder="Your Email Address *"
                required
              />

              <span className="email-icon">
                ✉
              </span>

            </div>

            <button type="submit">

              <span><svg
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
  </svg></span>

              SUBSCRIBE

            </button>

          </form>

          <p className="bottom-text">
            Stay always in touch with our pet-loving community.
          </p>

        </div>

      </section>

      {/* Bottom Wave */}
      <div className="bottom-wave"></div>

    </main>
  );
}

export default Contact;