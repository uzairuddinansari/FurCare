import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../style/Emergency.css";

gsap.registerPlugin(ScrollTrigger);

const emergencyData = [
  {
    id: 1,
    category: "EMERGENCY VET",
    title: "24/7 Emergency Vet",
    number: "+92 300 111 3222",
    location: "Available nationwide",
    image:
      "https://images.unsplash.com/photo-1733783489145-f3d3ee7a9ccf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "POISON CONTROL",
    title: "Pet Poison Helpline",
    number: "+92 51 999 8888",
    location: "Immediate assistance",
    image:
      "https://images.unsplash.com/photo-1725409796872-8b41e8eca929?q=80&w=1171&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "ANIMAL AMBULANCE",
    title: "Animal Ambulance",
    number: "+92 300 555 6666",
    location: "Rapid response service",
    image:
      "https://images.unsplash.com/photo-1613743146922-6634a6706684?q=80&w=765&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "RESCUE SERVICE",
    title: "Local Shelter Rescue",
    number: "+92 51 777 4444",
    location: "Rescue & shelter support",
    image:
      "https://images.unsplash.com/photo-1601758003453-6c950f17727d?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "URGENT CARE",
    title: "Animal Urgent Care",
    number: "+92 321 444 9090",
    location: "Emergency consultations",
    image:
      "https://images.unsplash.com/photo-1770836037275-38b44e4b101f?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "PET HOSPITAL",
    title: "24 Hour Pet Hospital",
    number: "+92 300 777 1111",
    location: "Emergency hospital care",
    image:
      "https://images.unsplash.com/photo-1713013523571-5fd4d7fb72a4?q=80&w=1074&auto=format&fit=crop",
  },
  {
    id: 7,
    category: "VET CLINIC",
    title: "Emergency Vet Clinic",
    number: "+92 321 888 2222",
    location: "Fast veterinary support",
    image:
      "https://images.unsplash.com/photo-1654895716780-b4664497420d?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: 8,
    category: "PET RESCUE",
    title: "Animal Rescue Team",
    number: "+92 300 444 7777",
    location: "Rapid rescue response",
    image:
      "https://images.unsplash.com/photo-1671639565522-3895c8eb076f?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: 9,
    category: "NIGHT CARE",
    title: "Night Pet Care",
    number: "+92 311 555 8888",
    location: "Open throughout the night",
    image:
      "https://images.unsplash.com/photo-1774128718029-5c4d2e947a76?q=80&w=1198&auto=format&fit=crop",
  },
  {
    id: 10,
    category: "CRITICAL CARE",
    title: "Critical Animal Care",
    number: "+92 333 666 9999",
    location: "Critical emergency support",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85",
  },
];

function EmergencyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="emergency-icon"
    >
      <path
        d="M12 3.5L20 7.8V16.2L12 20.5L4 16.2V7.8L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 8V13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="0.9" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon({ direction = "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={
        direction === "left" ? "arrow-icon arrow-left" : "arrow-icon"
      }
    >
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M13.5 6.5L19 12L13.5 17.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="phone-icon"
    >
      <path
        d="M7.2 4.5L9.4 3.8C10 3.6 10.6 3.9 10.8 4.5L12 8C12.2 8.5 12 9.1 11.6 9.4L10.1 10.5C11.1 12.6 12.7 14.3 14.8 15.3L15.9 13.8C16.2 13.4 16.8 13.2 17.3 13.4L20.8 14.6C21.4 14.8 21.7 15.4 21.5 16L20.8 18.2C20.5 19.1 19.7 19.7 18.8 19.6C10.9 18.7 5.3 13.1 4.4 5.2C4.3 4.3 4.9 3.5 5.8 3.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const infiniteCards = [
  ...emergencyData,
  ...emergencyData,
  ...emergencyData,
];

export default function EmergencyDirectory() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const autoTimerRef = useRef(null);

  const [index, setIndex] = useState(emergencyData.length);
  const [visibleCards, setVisibleCards] = useState(5);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateVisibleCards = () => {
    if (window.innerWidth <= 600) {
      setVisibleCards(1);
    } else if (window.innerWidth <= 900) {
      setVisibleCards(2);
    } else if (window.innerWidth <= 1200) {
      setVisibleCards(3);
    } else if (window.innerWidth <= 1500) {
      setVisibleCards(4);
    } else {
      setVisibleCards(5);
    }
  };

  useEffect(() => {
    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const topline = section.querySelector(".heading-topline");
      const title = section.querySelector(".heading-main h2");
      const description = section.querySelector(".heading-main p");
      const status = section.querySelector(".heading-status");
      const cards = section.querySelectorAll(".emergency-card");

      if (topline) {
        gsap.fromTo(
          topline,
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      if (title) {
        gsap.fromTo(
          title,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      if (description) {
        gsap.fromTo(
          description,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      if (status) {
        gsap.fromTo(
          status,
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      if (cards.length) {
        gsap.fromTo(
          cards,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 55%",
              once: true,
            },
          }
        );
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const cards = track.querySelectorAll(".emergency-card");

    if (!cards.length) return;

    const firstCard = cards[0];

    const moveToIndex = (newIndex, duration = 0.7) => {
      if (!track || !firstCard) return;

      const cardWidth = firstCard.getBoundingClientRect().width;

      const computedStyle = window.getComputedStyle(track);

      const gap = parseFloat(
        computedStyle.columnGap || computedStyle.gap || "0"
      );

      const position = (cardWidth + gap) * newIndex;

      setIsAnimating(true);

      gsap.to(track, {
        x: -position,
        duration,
        ease: "power3.inOut",
        overwrite: true,
        onComplete: () => {
          setIsAnimating(false);

          if (newIndex >= emergencyData.length * 2) {
            const resetIndex = emergencyData.length;
            const resetPosition =
              (cardWidth + gap) * resetIndex;

            gsap.set(track, {
              x: -resetPosition,
            });

            setIndex(resetIndex);
          } else if (newIndex <= 0) {
            const resetIndex = emergencyData.length;
            const resetPosition =
              (cardWidth + gap) * resetIndex;

            gsap.set(track, {
              x: -resetPosition,
            });

            setIndex(resetIndex);
          }
        },
      });

      setIndex(newIndex);
    };

    const nextSlide = () => {
      if (isAnimating) return;

      moveToIndex(index + 1);
    };

    const previousSlide = () => {
      if (isAnimating) return;

      moveToIndex(index - 1);
    };

    window.emergencyNext = nextSlide;
    window.emergencyPrev = previousSlide;

    return () => {
      delete window.emergencyNext;
      delete window.emergencyPrev;
    };
  }, [index, isAnimating, visibleCards]);

  useEffect(() => {
    const startAutoSlide = () => {
      clearInterval(autoTimerRef.current);

      autoTimerRef.current = setInterval(() => {
        if (window.emergencyNext) {
          window.emergencyNext();
        }
      }, 4500);
    };

    startAutoSlide();

    return () => {
      clearInterval(autoTimerRef.current);
    };
  }, []);

  const restartAutoSlide = () => {
    clearInterval(autoTimerRef.current);

    autoTimerRef.current = setInterval(() => {
      if (window.emergencyNext) {
        window.emergencyNext();
      }
    }, 4500);
  };

  const handleNext = () => {
    clearInterval(autoTimerRef.current);

    if (window.emergencyNext) {
      window.emergencyNext();
    }

    restartAutoSlide();
  };

  const handlePrevious = () => {
    clearInterval(autoTimerRef.current);

    if (window.emergencyPrev) {
      window.emergencyPrev();
    }

    restartAutoSlide();
  };

  return (
    <section
      className="emergency-directory"
      ref={sectionRef}
    >
      <div className="emergency-container">

        <div className="emergency-heading">
          <div className="heading-topline">
            <span className="heading-line"></span>

            <span className="heading-label">
              EMERGENCY DIRECTORY
            </span>
          </div>

          <div className="heading-main">
            <div>
              <h2>
                Help when your pet
                <br />
                <span>needs it most.</span>
              </h2>

              <p>
                Keep essential emergency contacts close.
                <br />
                Fast access can make all the difference.
              </p>
            </div>

            <div className="heading-status">
              <span className="status-dot"></span>
              <span>Emergency contacts</span>
            </div>
          </div>
        </div>

        <div className="emergency-slider">
          <div
            className="emergency-track"
            ref={trackRef}
          >
            {infiniteCards.map((item, cardIndex) => (
              <article
                className="emergency-card"
                key={`${item.id}-${cardIndex}`}
              >
                <div className="card-image">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />

                  <div className="image-overlay"></div>

                  <div className="card-category">
                    <EmergencyIcon />
                    <span>{item.category}</span>
                  </div>

                  <div className="card-number">
                    {item.number}
                  </div>
                </div>

                <div className="card-content">
                  <div>
                    <h3>{item.title}</h3>

                    <p className="card-location">
                      {item.location}
                    </p>
                  </div>

                  <a
                    href={`tel:${item.number.replace(/\s/g, "")}`}
                    className="call-button"
                    aria-label={`Call ${item.title}`}
                  >
                    <PhoneIcon />

                    <span>Call now</span>

                    <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="emergency-footer">
          <div className="slider-progress">
            <span></span>
          </div>

          <p>
            Slide over the cards to explore emergency services
          </p>

          <div className="slider-arrows">
            <button
              type="button"
              aria-label="Previous"
              onClick={handlePrevious}
            >
              <ArrowIcon direction="left" />
            </button>

            <button
              type="button"
              aria-label="Next"
              onClick={handleNext}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}