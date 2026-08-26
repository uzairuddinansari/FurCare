import "../style/SuccessStories.css";

const stories = [
  {
    title: "Daisy found her home",
    text: "After 6 months at the shelter, Daisy was adopted by the Malik family and now hikes every weekend.",
  },
  {
    title: "Tommy's second chance",
    text: "Rescued from the streets, Tommy is now a therapy dog visiting a children's hospital.",
  },
];

const PawIcon = () => (
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
);

function SuccessStories() {
  return (
    <section className="success-section">
      <div className="success-container">
        <div className="success-header">
          <span className="section-label">ADOPTION SUCCESS STORIES</span>

          <h1>
            Happy endings,
            <span> one paw at a time</span>
          </h1>

          <p className="section-description">
            Real stories of rescued pets finding loving homes and new
            beginnings.
          </p>
        </div>

        <div className="stories-grid">
          {stories.map((story, index) => (
            <article className="story-card" key={story.title}>
              <div className="card-top">
                <div className="story-badge">
                  <span className="badge-icon">
                    <PawIcon />
                  </span>
                  Success Story
                </div>

                <span className="story-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="story-content">
                <h2>{story.title}</h2>
                <p>{story.text}</p>
              </div>

              <div className="card-bottom">
                <span className="line"></span>
                <span className="adopted-text">A new beginning</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SuccessStories;