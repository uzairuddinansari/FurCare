import "../style/healt&Tips.css";
import Nav2 from "./Nav2";

const habits = [
  {
    title: "Healthy Diet",
    text: "Feed balanced meals rich in nutrients suitable for their age and size.",
  },
  {
    title: "Regular Exercise",
    text: "Daily walks and play time keep them fit, active and stress-free.",
  },
  {
    title: "Routine Checkups",
    text: "Regular vet visits help detect issues early and keep them in top shape.",
  },
  {
    title: "Oral Care",
    text: "Brush teeth 2–3 times weekly to prevent dental problems.",
  },
  {
    title: "Hydration",
    text: "Fresh water always keeps them hydrated and healthy.",
  },
];

const concerns = [
  ["Scratching", "Excessively"],
  ["Loss of", "Appetite"],
  ["Lethargy", ""],
  ["Vomiting", ""],
  ["Diarrhea", ""],
  ["Bad Breath", ""],
];

const calendar = [
  ["Vaccination", "Every 6–12", "Months"],
  ["Deworming", "Every 3", "Months"],
  ["Flea & Tick", "Prevention", "Monthly"],
  ["Dental Checkup", "Every 6", "Months"],
  ["Weight Check", "Monthly", ""],
];

function Healt() {
  return (
    <main className="page">
     <Nav2 />
      <section className="htHero">
  <div className="htHeroInner">

    {/* LEFT CONTENT */}
    <div className="htHeroContent">
      <span className="htHeroLabel">PET HEALTH & WELLNESS</span>

      <h1 className="htHeroTitle">
        Health Tips for
        <br />
        Happy, Healthy Pets
      </h1>

      <p className="htHeroLead">
        Small daily care. Big lifetime impact.
      </p>

      <p className="htHeroDescription">
        Explore expert tips to keep your furry friend
        <br className="htDesktopBreak" />
        healthy, active and full of life.
      </p>

      <button className="htHeroButton">
        <span>Explore Tips</span>
        <i>↗</i>
      </button>
    </div>

    {/* RIGHT VISUAL */}
    <div className="htHeroVisual">

      <div className="htHeroGlow"></div>

      <div className="htHeroCircle"></div>

      {/* DOG */}
      <div className="htDogFrame">
        <img
          src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=90"
          alt="Golden Retriever"
        />
      </div>

      {/* CAT */}
      <div className="htCatFrame">
        <img
          src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=700&q=90"
          alt="Cat"
        />
      </div>

      {/* DECORATIONS */}
      <div className="htPaw htPawOne">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="60" r="25" />
          <circle cx="25" cy="31" r="10" />
          <circle cx="48" cy="21" r="10" />
          <circle cx="72" cy="31" r="10" />
        </svg>
      </div>

      <div className="htHeart">
        <svg viewBox="0 0 100 100">
          <path d="M50 82S12 59 12 32C12 16 32 10 43 24l7 9 7-9c11-14 31-8 31 8 0 27-38 50-38 50z" />
        </svg>
      </div>

      <div className="htMiniCircle"></div>

    </div>
  </div>
</section>

      <section className="stats">
        <div className="stats-inner">

          <div className="stat">
            <div className="stat-number">3K+</div>
            <div className="stat-info">
              <strong>Pets Helped</strong>
              <span>Happy companions</span>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat">
            <div className="stat-number">120+</div>
            <div className="stat-info">
              <strong>Health Articles</strong>
              <span>Useful pet knowledge</span>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat">
            <div className="stat-number">50+</div>
            <div className="stat-info">
              <strong>Vet Tips</strong>
              <span>Professional guidance</span>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat">
            <div className="stat-number">100%</div>
            <div className="stat-info">
              <strong>Trusted Care</strong>
              <span>Made for pet parents</span>
            </div>
          </div>

        </div>
      </section>

      <section className="habits">
        <div className="section-heading">
          <span>EVERYDAY WELLNESS</span>

          <h2>
            Daily Habits,
            <em> Lifelong Benefits</em>
          </h2>

          <p>
            Simple habits can make a big difference in your pet's
            health and happiness.
          </p>
        </div>

        <div className="habit-grid">
          {habits.map((item, index) => (
            <article className="habit-card" key={item.title}>

              <div className="habit-top">
                <span>0{index + 1}</span>

                <div className="habit-shape">
                  <div></div>
                </div>
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              <div className="card-arrow">↗</div>

            </article>
          ))}
        </div>
      </section>

  
      <section className="concerns">

        <div className="concern-inner">

          <div className="concern-left">

            <span className="section-label">KNOW THE SIGNS</span>

            <h2>
              Common
              <br />
              Health Concerns
            </h2>

            <p>
              Watch for these signs and consult your vet
              if noticed.
            </p>

            <div className="concern-grid">
              {concerns.map((item, index) => (
                <div className="concern" key={index}>
                  <span className="concern-number">
                    0{index + 1}
                  </span>

                  <strong>{item[0]}</strong>

                  {item[1] && <span>{item[1]}</span>}
                </div>
              ))}
            </div>

          </div>

          <div className="doctor-image">

            <div className="doctor-frame"></div>

            <img
              src="https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=900&q=90"
              alt="Veterinarian checking puppy"
            />

            <div className="doctor-caption">
              <span>VETERINARY CARE</span>
              <strong>Early care matters.</strong>
            </div>

          </div>

        </div>
      </section>


      <section className="preventive">

        <div className="preventive-inner">

          <div className="preventive-content">

            <div className="preventive-title">
              <span className="section-label">
                STAY AHEAD
              </span>

              <h2>
                Preventive
                <br />
                <em>Care Calendar</em>
              </h2>

              <p>
                Stay ahead with this simple care routine.
              </p>
            </div>

            <div className="timeline">

              {calendar.map((item, index) => (
                <div className="timeline-item" key={index}>

                  <div className="timeline-dot">
                    <span>0{index + 1}</span>
                  </div>

                  <h3>{item[0]}</h3>

                  <span>{item[1]}</span>
                  <span>{item[2]}</span>

                </div>
              ))}

            </div>

          </div>

          <aside className="vet-card">

            <span className="vet-label">EXPERT NOTE</span>

            <div className="vet-line"></div>

            <h2>Vet Advice</h2>

            <p>
              Every pet is unique. When in doubt,
              always consult your veterinarian.
            </p>

            <button className="white-btn">
              <span>Book Appointment</span>
              <b>↗</b>
            </button>

          </aside>

        </div>
      </section>

   
      <section className="bottom-cta">

        <div className="bottom-inner">

          <div className="bottom-pets">
            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=90"
              alt="Dog"
            />
          </div>

          <div className="bottom-title">
            <span>FUREVER CARE</span>

            <h2>
              Your Pet Deserves
              <br />
              <em>the Best Care.</em>
            </h2>
          </div>

          <div className="bottom-text">
            <p>
              A few minutes of care today can
              <br />
              add years of joy tomorrow.
            </p>
          </div>

          <button className="bottom-btn">
            <span>Explore More Tips</span>
            <b>↗</b>
          </button>

        </div>

      </section>

    </main>
  );
}

export default Healt;