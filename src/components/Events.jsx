import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../style/Events.css";
import pic from "../assets/hh.jpg"
import pic1 from "../assets/1st.jpg"

gsap.registerPlugin(ScrollTrigger);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 10.2C19 15.1 12 20 12 20S5 15.1 5 10.2C5 6.3 8.1 3.5 12 3.5s7 2.8 7 6.7Z" />
    <circle cx="12" cy="10" r="2.2" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4" y="5.5" width="16" height="15" rx="1.5" />
    <path d="M8 3.5V7M16 3.5V7M4 9h16" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 8h16M4 16h16" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export default function Events() {
  const pageRef = useRef(null);
  const [data, setData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch("/data/events.json");

        if (!response.ok) {
          throw new Error("Events data could not be loaded");
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };

    getEvents();
  }, []);

  useEffect(() => {
    if (!data || !pageRef.current) return;

    const context = gsap.context(() => {
      const introTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out"
        }
      });

      introTimeline
        .from(".events-navbar", {
          y: -20,
          opacity: 0,
          duration: 0.55
        })
        .from(
          ".intro-eyebrow",
          {
            y: 18,
            opacity: 0,
            duration: 0.45
          },
          "-=.2"
        )
        .from(
          ".intro-title",
          {
            y: 30,
            opacity: 0,
            duration: 0.65
          },
          "-=.15"
        )
        .from(
          ".intro-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.5
          },
          "-=.25"
        );

      gsap.from(".featured-photo", {
        opacity: 0,
        scale: 1.05,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".featured-event",
          start: "top 78%",
          once: true
        }
      });

      gsap.from(".featured-details", {
        opacity: 0,
        x: 30,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".featured-event",
          start: "top 78%",
          once: true
        }
      });

      gsap.from(".event-card", {
        opacity: 0,
        y: 30,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".events-grid",
          start: "top 82%",
          once: true
        }
      });

      gsap.from(".community-content", {
        opacity: 0,
        y: 25,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".community-section",
          start: "top 82%",
          once: true
        }
      });

      gsap.from(".stat-box", {
        opacity: 0,
        y: 25,
        duration: 0.55,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".community-stats",
          start: "top 85%",
          once: true
        }
      });

      gsap.to(".featured-photo img", {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: ".featured-event",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      });
    }, pageRef);

    return () => context.revert();
  }, [data]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (!data) {
    return (
      <div className="events-loader">
        <span></span>
        <p>Loading events</p>
      </div>
    );
  }

  return (
    <div className="events-page" ref={pageRef}>
      
      <div
        className={`navigation-overlay ${
          menuOpen ? "overlay-visible" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <main>

        <section className="events-introduction">

          <div className="intro-eyebrow">
            <span></span>
            {data.intro.eyebrow}
          </div>

          <div className="intro-content">

            <h1
              className="intro-title"
              dangerouslySetInnerHTML={{
                __html: data.intro.title
              }}
            />

            <p className="intro-description">
              {data.intro.description}
            </p>

          </div>

          <div className="intro-bottom">
            <span>UPCOMING EVENTS</span>
            <span>FUREVER CARE / 2026</span>
          </div>

        </section>

        <section className="featured-event">

          <div className="featured-photo">

            <img
              src={data.featured.image}
              alt={data.featured.title.replace(/<[^>]+>/g, "")}
            />

            <div className="photo-shade"><img src={pic} alt="" /></div>

            <div className="featured-date">
              <span>{data.featured.month}</span>
              <strong>{data.featured.date}</strong>
            </div>

            <div className="featured-category">
              {data.featured.category}
            </div>

          </div>

          <div className="featured-details">

            <div className="featured-topline">
              <span>{data.featured.number}</span>
              <span>FEATURED EVENT</span>
            </div>

            <h2
              dangerouslySetInnerHTML={{
                __html: data.featured.title
              }}
            />

            <p className="featured-description">
              {data.featured.description}
            </p>

            <div className="featured-information">

              <div className="information-item">
                <ClockIcon />
                <div>
                  <small>TIME</small>
                  <span>{data.featured.time}</span>
                </div>
              </div>

              <div className="information-item">
                <LocationIcon />
                <div>
                  <small>LOCATION</small>
                  <span>{data.featured.location}</span>
                </div>
              </div>

            </div>

            <a
              href="#upcoming-events"
              className="featured-button"
            >
              <span>{data.featured.button}</span>
              <ArrowIcon />
            </a>

          </div>

        </section>

        <section
          className="upcoming-events"
          id="upcoming-events"
        >

          <div className="section-heading">

            <div>
              <span className="section-eyebrow">
                COMING UP
              </span>

              <h2>
                Something good is
                <br />
                always <em>happening.</em>
              </h2>
            </div>

            <p>
              Explore the gatherings, workshops and community
              experiences waiting for you and your furry friends.
            </p>

          </div>

          <div className="events-grid">

            {data.events.map((event) => (
              <article
                className="event-card"
                key={event.id}
              >

                <div className="event-image">

                  <img
                    src={event.image}
                    alt={event.title}
                  />

                  <div className="event-image-shade">
                      <img src={pic1} alt="" />
                  </div>

                  <div className="event-date-small">
                    <span>{event.month}</span>
                    <strong>{event.date}</strong>
                  </div>

                  <span className="event-type">
                    {event.category}
                  </span>

                </div>

                <div className="event-card-content">

                  <div className="event-card-number">
                    {event.number}
                  </div>

                  <h3>{event.title}</h3>

                  <p>{event.description}</p>

                  <div className="event-card-info">

                    <span>
                      <ClockIcon />
                      {event.time}
                    </span>

                    <span>
                      <LocationIcon />
                      {event.location}
                    </span>

                  </div>

                  <a
                    href="#event-details"
                    className="event-card-link"
                  >
                    View event
                    <ArrowIcon />
                  </a>

                </div>

              </article>
            ))}

          </div>

        </section>

        <section className="community-section">

          <div className="community-content">

            <div className="community-copy">

              <span className="section-eyebrow">
                {data.community.eyebrow}
              </span>

              <h2
                dangerouslySetInnerHTML={{
                  __html: data.community.title
                }}
              />

              <p>
                {data.community.description}
              </p>

            </div>

            <div className="community-symbol">
              <CalendarIcon />
            </div>

          </div>

          <div className="community-stats">

            {data.community.stats.map((stat) => (
              <div
                className="stat-box"
                key={stat.label}
              >
                <strong>{stat.number}</strong>
                <span>{stat.label}</span>
              </div>
            ))}

          </div>

        </section>

      </main>
    </div>
  );
}