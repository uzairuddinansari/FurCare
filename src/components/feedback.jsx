import React, { useState } from "react";
import "../style/feedback.css";
import Nav2 from "./Nav2";

const feedbackPets = {
  dog: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=90",
  cat: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=90",
  bird: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=400&q=90",
};

const pawIcon = (
  <svg
    className="feedback-svg-icon feedback-paw-svg"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="32" cy="42" rx="14" ry="12" fill="currentColor" />
    <ellipse
      cx="14"
      cy="25"
      rx="7"
      ry="10"
      transform="rotate(-25 14 25)"
      fill="currentColor"
    />
    <ellipse
      cx="27"
      cy="14"
      rx="7"
      ry="10"
      transform="rotate(-10 27 14)"
      fill="currentColor"
    />
    <ellipse
      cx="40"
      cy="14"
      rx="7"
      ry="10"
      transform="rotate(10 40 14)"
      fill="currentColor"
    />
    <ellipse
      cx="51"
      cy="25"
      rx="7"
      ry="10"
      transform="rotate(25 51 25)"
      fill="currentColor"
    />
  </svg>
);

const chatIcon = (
  <svg
    className="feedback-svg-icon feedback-chat-svg"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 14C12 9.58 15.58 6 20 6H44C48.42 6 52 9.58 52 14V34C52 38.42 48.42 42 44 42H29L18 52V42H20C15.58 42 12 38.42 12 34V14Z"
      fill="currentColor"
    />
    <circle cx="24" cy="24" r="3" fill="white" />
    <circle cx="32" cy="24" r="3" fill="white" />
    <circle cx="40" cy="24" r="3" fill="white" />
  </svg>
);

function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    feedback: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      type: "",
      feedback: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4500);
  };

  return (
    <>
      <Nav2 />

      <main className="feedback-page">
        <section className="feedback-section">
          <div className="feedback-bg-shape feedback-shape-one"></div>
          <div className="feedback-bg-shape feedback-shape-two"></div>

          <div className="feedback-main-container">
            <div className="feedback-intro">
              <div className="feedback-small-title">
                <span className="feedback-small-title-icon">
                  {pawIcon}
                </span>

                <span>FEEDBACK</span>
              </div>

              <h1 className="feedback-main-title">
                Share Your
                <br />

                <strong className="feedback-main-title-highlight">
                  Feedback
                </strong>
              </h1>

              <div className="feedback-title-line"></div>

              <p className="feedback-description">
                Your feedback helps us improve our services
                and provide the best experience for you
                and your lovely pets.
              </p>

              <div className="feedback-pets">
                <div className="feedback-pet-background"></div>

                <img
                  src={feedbackPets.dog}
                  className="feedback-pet-image feedback-pet-dog"
                  alt="Dog"
                />

                <img
                  src={feedbackPets.cat}
                  className="feedback-pet-image feedback-pet-cat"
                  alt="Cat"
                />

                <img
                  src={feedbackPets.bird}
                  className="feedback-pet-image feedback-pet-bird"
                  alt="Bird"
                />

                <div className="feedback-floating-paw feedback-paw-one">
                  {pawIcon}
                </div>

                <div className="feedback-floating-paw feedback-paw-two">
                  {pawIcon}
                </div>
              </div>
            </div>

            <div className="feedback-form-card">
              <div className="feedback-card-heading">
                <div className="feedback-chat-icon">
                  {chatIcon}
                </div>

                <h2 className="feedback-card-title">
                  We'd Love to Hear
                  <br />
                  From You!
                </h2>
              </div>

              <div className="feedback-card-divider">
                <span className="feedback-divider-line"></span>

                <b className="feedback-divider-icon">
                  {pawIcon}
                </b>

                <span className="feedback-divider-line"></span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="feedback-input-row">
                  <div className="feedback-input-wrapper">
                    <span className="feedback-input-icon">
                      ♙
                    </span>

                    <input
                      type="text"
                      name="name"
                      className="feedback-input"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="feedback-input-wrapper">
                    <span className="feedback-input-icon">
                      ✉
                    </span>

                    <input
                      type="email"
                      name="email"
                      className="feedback-input"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="feedback-input-wrapper">
                  <span className="feedback-input-icon">
                    ☎
                  </span>

                  <input
                    type="tel"
                    name="phone"
                    className="feedback-input"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="feedback-select-wrapper">
                  <span className="feedback-select-icon">
                    ▣
                  </span>

                  <select
                    name="type"
                    className="feedback-select"
                    required
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Feedback Type
                    </option>

                    <option value="general">
                      General Feedback
                    </option>

                    <option value="service">
                      Service Feedback
                    </option>

                    <option value="website">
                      Website Experience
                    </option>

                    <option value="suggestion">
                      Suggestion
                    </option>

                    <option value="complaint">
                      Complaint
                    </option>
                  </select>

                  <b className="feedback-select-arrow">
                    ⌄
                  </b>
                </div>

                <div className="feedback-message-wrapper">
                  <span className="feedback-message-icon">
                    ✎
                  </span>

                  <textarea
                    name="feedback"
                    className="feedback-textarea"
                    placeholder="Your Feedback *"
                    maxLength="600"
                    value={formData.feedback}
                    onChange={handleChange}
                    required
                  ></textarea>

                  <small className="feedback-character-count">
                    {formData.feedback.length}/600
                  </small>
                </div>

                <button
                  className="feedback-submit-button"
                  type="submit"
                >
                  <span className="feedback-submit-icon">
                    ➤
                  </span>

                  <span>SUBMIT FEEDBACK</span>
                </button>

                <div className="feedback-safe-text">
                  <svg
                    className="feedback-svg-icon feedback-lock-svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="11"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <path
                      d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />

                    <circle
                      cx="12"
                      cy="15.5"
                      r="1.3"
                      fill="currentColor"
                    />
                  </svg>

                  Your information is safe with us.
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="feedback-submission-section">
          <div className="feedback-submission-wrapper">
            <div className="feedback-submission-info">
              <span className="feedback-submission-label">
                THANK YOU!
              </span>

              <h2 className="feedback-submission-title">
                Submitting Your
                <br />
                Feedback...
              </h2>

              <p className="feedback-submission-description">
                Please wait while we send your feedback
                to our team.
              </p>

              <div className="feedback-progress">
                <i className="feedback-progress-item feedback-progress-active"></i>
                <i className="feedback-progress-item"></i>
                <i className="feedback-progress-item"></i>
              </div>
            </div>

            <div className="feedback-send-animation">
              <div className="feedback-animation-background">
                <div className="feedback-animation-ring feedback-ring-one"></div>

                <div className="feedback-animation-ring feedback-ring-two"></div>

                <div className="feedback-plane">
                  ➤
                </div>

                <div className="feedback-floating-heart">
                  ♥
                </div>

                <div className="feedback-floating-mail">
                  ✉
                </div>
              </div>
            </div>

            <div className="feedback-steps">
              <div className="feedback-step">
                <div className="feedback-step-circle">
                  ➤
                </div>

                <div>
                  <h3 className="feedback-step-title">
                    Sending Feedback
                  </h3>

                  <p className="feedback-step-description">
                    Your feedback is on its way
                  </p>
                </div>
              </div>

              <div className="feedback-step">
                <div className="feedback-step-circle">
                  ⌕
                </div>

                <div>
                  <h3 className="feedback-step-title">
                    Reviewing
                  </h3>

                  <p className="feedback-step-description">
                    Our team will review it
                  </p>
                </div>
              </div>

              <div className="feedback-step">
                <div className="feedback-step-circle">
                  ♡
                </div>

                <div>
                  <h3 className="feedback-step-title">
                    Thank You!
                  </h3>

                  <p className="feedback-step-description">
                    We appreciate your time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="feedback-opinion-section">
          <div className="feedback-decoration feedback-decoration-left">
            {pawIcon}
          </div>

          <div className="feedback-decoration feedback-decoration-right">
            {pawIcon}
          </div>

          <div className="feedback-opinion-container">
            <div className="feedback-opinion-label">
              <span className="feedback-opinion-icon">
                {pawIcon}
              </span>

              <span>WE LISTEN & IMPROVE</span>
            </div>

            <h2 className="feedback-opinion-title">
              Your Opinion Matters
            </h2>

            <p className="feedback-opinion-description">
              We are committed to providing the best care
              for your pets.
              <br />
              Your feedback helps us grow and serve you better.
            </p>

            <div className="feedback-info-cards">
              <div className="feedback-info-card">
                <div className="feedback-info-card-icon feedback-info-card-icon-dark">
                  {chatIcon}
                </div>

                <h3 className="feedback-info-card-title">
                  Share Freely
                </h3>

                <p className="feedback-info-card-description">
                  Your honest feedback helps us
                  understand your needs better.
                </p>
              </div>
               {/* 2nd card */}
              <div className="feedback-info-card">
                <div className="feedback-info-card-icon">
                  ☆
                </div>

                <h3 className="feedback-info-card-title">
                  We Improve
                </h3>

                <p className="feedback-info-card-description">
                  We use your feedback to enhance
                  our services every day.
                </p>
              </div>
              {/* 3rd card  */}
              <div className="feedback-info-card">
  <div className="feedback-info-card-icon">
    ✓
  </div>

  <h3 className="feedback-info-card-title">
    We Listen
  </h3>

  <p className="feedback-info-card-description">
    Your valuable feedback helps us
    understand what matters to you.
  </p>
              </div>
               {/* 4th card */}
              <div className="feedback-info-card">
  <div className="feedback-info-card-icon">
    ♡
  </div>

  <h3 className="feedback-info-card-title">
    We Care
  </h3>

  <p className="feedback-info-card-description">
    Your experience matters to us,
    and we are always here to improve.
  </p>
              </div>

            </div>
          </div>
        </section>

        <footer className="feedback-footer">
          <div className="feedback-footer-paw">
            {pawIcon}
          </div>

          <p className="feedback-footer-text">
            Together, we make tails wag and hearts happy.
          </p>

          <span className="feedback-footer-heart">
            ♥
          </span>
        </footer>

        {submitted && (
          <div className="feedback-success-message">
            <div className="feedback-success-check">
              ✓
            </div>

            <h3 className="feedback-success-title">
              Thank You!
            </h3>

            <p className="feedback-success-description">
              Your feedback has been submitted
              successfully.
            </p>
          </div>
        )}
      </main>
    </>
  );
}

export default Feedback;