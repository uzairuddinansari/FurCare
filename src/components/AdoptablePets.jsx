import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import "../style/adobtable.css";
import "../style/footer.css"

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M16 16L20 20"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M13.5 6.5L19 12L13.5 17.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M20.8 8.8C20.8 13.4 12 19 12 19S3.2 13.4 3.2 8.8C3.2 6.1 5.2 4 7.8 4C9.5 4 11 4.9 12 6.2C13 4.9 14.5 4 16.2 4C18.8 4 20.8 6.1 20.8 8.8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const PawIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M8.2 14.2C6.8 14.2 5.6 15.2 5.6 16.7C5.6 18.5 7.3 19.7 9.1 19.2C10.1 18.9 10.9 18.1 12 18.1C13.1 18.1 13.9 18.9 14.9 19.2C16.7 19.7 18.4 18.5 18.4 16.7C18.4 15.2 17.2 14.2 15.8 14.2C14.1 14.2 13.6 12.3 12 12.3C10.4 12.3 9.9 14.2 8.2 14.2Z"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <circle cx="7" cy="9" r="1.7" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="11" cy="6.5" r="1.7" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="17" cy="9" r="1.7" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M7 9L12 14L17 9"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function PetCard({ pet, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const image = card.querySelector(".pet-card-image img");
    const action = card.querySelector(".pet-card-action");

    const enter = () => {
      gsap.to(image, {
        scale: 1.06,
        duration: 0.7,
        ease: "power3.out"
      });

      gsap.to(action, {
        x: 5,
        duration: 0.35,
        ease: "power2.out"
      });
    };

    const leave = () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.7,
        ease: "power3.out"
      });

      gsap.to(action, {
        x: 0,
        duration: 0.35,
        ease: "power2.out"
      });
    };

    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);

    return () => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className={`pet-card ${index === 0 ? "pet-card-featured" : ""}`}
    >
      <div className="pet-card-image">
        <img src={pet.image} alt={`${pet.name} - ${pet.breed}`} />

        <div className="pet-image-shade"></div>

        <div className="pet-top-row">
          <span className="pet-status">
            <span className="status-dot"></span>
            {pet.status}
          </span>

          <button className="favorite-button" aria-label={`Favorite ${pet.name}`}>
            <HeartIcon />
          </button>
        </div>

        <div className="pet-image-caption">
          <span>{pet.species}</span>
          <span className="caption-line"></span>
          <span>{pet.size}</span>
        </div>
      </div>

      <div className="pet-card-body">
        <div className="pet-card-heading">
          <div>
            <h3>{pet.name}</h3>
            <p>{pet.breed}</p>
          </div>

          <span className="pet-age">{pet.age}</span>
        </div>

        <div className="pet-meta">
          <span>{pet.location}</span>
          <span className="meta-divider"></span>
          <span>{pet.gender}</span>
        </div>

        <p className="pet-description">{pet.description}</p>

        <div className="pet-tags">
          {pet.personality.slice(0, 2).map((trait) => (
            <span key={trait}>{trait}</span>
          ))}
        </div>

        <button className="pet-card-action">
          <span>Meet {pet.name}</span>
          <span className="action-arrow">
            <ArrowIcon />
          </span>
        </button>
      </div>
    </article>
  );
}

export default function AdoptablePets() {
  const pageRef = useRef(null);
  const cardsRef = useRef(null);

  const [pets, setPets] = useState([]);
  const [species, setSpecies] = useState("All Species");
  const [age, setAge] = useState("All Ages");
  const [location, setLocation] = useState("All Locations");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadPets = async () => {
      try {
        const response = await fetch("data/adoptablePets.json");

        if (!response.ok) {
          throw new Error("Unable to load pets");
        }

        const data = await response.json();

        if (mounted) {
          setPets(data);
        }
      } catch (err) {
        if (mounted) {
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPets();

    return () => {
      mounted = false;
    };
  }, []);

  const speciesOptions = useMemo(
    () => ["All Species", ...new Set(pets.map((pet) => pet.species))],
    [pets]
  );

  const ageOptions = useMemo(
    () => ["All Ages", ...new Set(pets.map((pet) => pet.ageGroup))],
    [pets]
  );

  const locationOptions = useMemo(
    () => ["All Locations", ...new Set(pets.map((pet) => pet.location))],
    [pets]
  );

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSpecies =
        species === "All Species" || pet.species === species;

      const matchesAge =
        age === "All Ages" || pet.ageGroup === age;

      const matchesLocation =
        location === "All Locations" || pet.location === location;

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        pet.name.toLowerCase().includes(searchValue) ||
        pet.breed.toLowerCase().includes(searchValue) ||
        pet.location.toLowerCase().includes(searchValue);

      return (
        matchesSpecies &&
        matchesAge &&
        matchesLocation &&
        matchesSearch
      );
    });
  }, [pets, species, age, location, search]);

  useEffect(() => {
    if (!pageRef.current) return;

    const context = gsap.context(() => {
      gsap.from(".shelter-kicker", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
      });

      gsap.from(".shelter-title", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.1,
        ease: "power3.out"
      });

      gsap.from(".shelter-description", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.25,
        ease: "power3.out"
      });

      gsap.from(".shelter-stat", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: "power3.out"
      });
    }, pageRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!cardsRef.current || loading) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".pet-card",
        {
          y: 35,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out"
        }
      );
    }, cardsRef);

    return () => context.revert();
  }, [loading, species, age, location, search]);

  const clearFilters = () => {
    setSpecies("All Species");
    setAge("All Ages");
    setLocation("All Locations");
    setSearch("");
  };

  return (
    <main ref={pageRef} className="shelter-page">

      <section className="pets-section">

        <div className="section-heading">

          <div>
            <span className="section-kicker">ADOPTABLE PETS</span>

            <h2>
              Meet your future
              <br />
              <span>best friend.</span>
            </h2>
          </div>

          <div className="section-intro">
            <p>
              Browse our available pets and discover the personality
              that feels like home.
            </p>

            <div className="available-count">
              <span></span>
              {filteredPets.length} companions available
            </div>
          </div>

        </div>

        <div className="filter-area">

          <div className="search-box">
            <SearchIcon />

            <input
              type="text"
              placeholder="Search by name or breed"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="select-group">

            <label>
              <span>Species</span>

              <div className="select-wrapper">
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                >
                  {speciesOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <ChevronIcon />
              </div>
            </label>

            <label>
              <span>Age</span>

              <div className="select-wrapper">
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                >
                  {ageOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <ChevronIcon />
              </div>
            </label>

            <label>
              <span>Location</span>

              <div className="select-wrapper">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locationOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <ChevronIcon />
              </div>
            </label>

          </div>

        </div>

        {loading && (
          <div className="pets-loading">
            <div className="loading-ring"></div>
            <span>Finding companions...</span>
          </div>
        )}

        {error && (
          <div className="pets-error">
            <h3>We couldn't load the adoption gallery.</h3>
            <p>Please refresh the page and try again.</p>
          </div>
        )}

        {!loading && !error && filteredPets.length > 0 && (
          <div className="pets-grid" ref={cardsRef}>
            {filteredPets.map((pet, index) => (
              <PetCard
                key={pet.id}
                pet={pet}
                index={index}
              />
            ))}
          </div>
        )}

        {!loading && !error && filteredPets.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <SearchIcon />
            </div>

            <h3>No matches found.</h3>

            <p>
              Try changing your filters or searching for another companion.
            </p>

            <button onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}

      </section>

      <section className="adoption-banner">

        <div className="banner-shape"></div>

        <div className="banner-content">

          <div className="banner-mark">
            <HeartIcon />
          </div>

          <div>
            <span className="banner-kicker">
              THE NEXT CHAPTER
            </span>

            <h2>
              Someone out there
              <br />
              is waiting for <em>you.</em>
            </h2>

            <p>
              Adoption is more than giving a home.
              It is giving a second beginning.
            </p>
          </div>

          <button className="banner-button">
            <span>Start your adoption journey</span>
            <ArrowIcon />
          </button>

        </div>

      </section>
    </main>
    
  );
}