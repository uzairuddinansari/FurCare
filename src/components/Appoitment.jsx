import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../style/appoitment.css";

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M8 3V7M16 3V7M3 10H21"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M12 7V12L15.5 14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PawIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="16" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="5.5" cy="13" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="18.5" cy="13" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M12 12.2C9.8 12.2 7.5 14.1 7.5 16.5C7.5 18.5 9.2 20 12 20C14.8 20 16.5 18.5 16.5 16.5C16.5 14.1 14.2 12.2 12 12.2Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M20 10C20 15 12 21 12 21C12 21 4 15 4 10C4 5.6 7.6 3 12 3C16.4 3 20 5.6 20 10Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle
      cx="12"
      cy="10"
      r="2.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12H19M13 6L19 12L13 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function AppointmentSlots() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/data/appointmentData.json");

        if (!response.ok) {
          throw new Error(
            `Failed to load appointments: ${response.status}`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Appointment data must be an array.");
        }

        setAppointments(data);
      } catch (err) {
        console.error("Appointment JSON Error:", err);
        setError("Unable to load appointment slots.");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);



  useEffect(() => {
    if (!appointments.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".appointment-heading",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [appointments]);

  const handleMouseEnter = (index) => {
    const card = cardsRef.current[index];

    if (!card) return;

    gsap.to(card, {
      y: -6,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];

    if (!card) return;

    gsap.to(card, {
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });
  };


  const handleBooking = (appointment) => {
    console.log("Selected NafCare Appointment:", appointment);


  };



  if (loading) {
    return (
      <section className="appointment-section" ref={sectionRef}>
        <div className="appointment-container">
          <div className="appointment-loading">
            <span></span>
            <p>Loading appointment slots...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="appointment-section" ref={sectionRef}>
        <div className="appointment-container">
          <div className="appointment-error">
            <h3>Appointments unavailable</h3>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="appointment-section" ref={sectionRef}>
      <div className="appointment-container">



        <div className="appointment-heading">

          <div className="heading-badge">
            <span className="badge-dot"></span>
            Flexible Scheduling
          </div>

          <h1>
            Choose Your
            <span>Appointment Slot</span>
          </h1>

          <p>
            Select a convenient time for your pet's care and let
            NafCare take care of the rest.
          </p>

        </div>

  

        <div className="appointment-grid">

          {appointments.map((appointment, index) => {

            const isAlmostFull =
              appointment.status?.toLowerCase() === "almost full";

            return (
              <article
                className="appointment-card"
                key={appointment.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >

                <div className="card-glow"></div>

                {/* CARD TOP */}

                <div className="card-top">

                  <div className="date-box">

                    <span>{appointment.month}</span>

                    <strong>{appointment.date}</strong>

                    <small>{appointment.day}</small>

                  </div>

                  <div
                    className={`availability ${
                      isAlmostFull ? "almost-full" : ""
                    }`}
                  >
                    <span></span>
                    {appointment.status}
                  </div>

                </div>

                {/* SERVICE HEADER */}

                <div className="service-header">

                  <div>
                    <span className="service-label">
                      NafCare Service
                    </span>

                    <h2>{appointment.service}</h2>
                  </div>

                  <div className="paw-icon">
                    <PawIcon />
                  </div>

                </div>

                {/* PET PROFILE */}

                <div className="pet-profile">

                  <div className="pet-avatar">
                    <PawIcon />
                  </div>

                  <div>

                    <span>
                      Pet
                    </span>

                    <strong>
                      {appointment.petType}
                    </strong>

                    <small>
                      {appointment.petBreed}
                    </small>

                  </div>

                </div>

                {/* DETAILS */}

                <div className="appointment-details">

                  <div className="detail-row">

                    <div className="detail-icon">
                      <ClockIcon />
                    </div>

                    <div>

                      <span>Time</span>

                      <strong>
                        {appointment.startTime} -{" "}
                        {appointment.endTime}
                      </strong>

                    </div>

                  </div>

                  <div className="detail-row">

                    <div className="detail-icon">
                      <CalendarIcon />
                    </div>

                    <div>

                      <span>Date</span>

                      <strong>
                        {appointment.day},{" "}
                        {appointment.date}{" "}
                        {appointment.month}
                      </strong>

                    </div>

                  </div>

                  <div className="detail-row">

                    <div className="detail-icon">
                      <LocationIcon />
                    </div>

                    <div>

                      <span>Location</span>

                      <strong>
                        {appointment.location}
                      </strong>

                    </div>

                  </div>

                </div>

                {/* BOOK BUTTON */}

                <button
                  className="book-button"
                  type="button"
                  onClick={() => handleBooking(appointment)}
                  disabled={isAlmostFull}
                >

                  <span>
                    {isAlmostFull
                      ? "Almost Full"
                      : "Book Appointment"}
                  </span>

                  {!isAlmostFull && (
                    <div className="button-arrow">
                      <ArrowIcon />
                    </div>
                  )}

                </button>

                <div className="card-shine"></div>

              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default AppointmentSlots;