import { useEffect, useRef, useState } from "react";
import "../style/nav2.css";
import "../style/pet_profile.css";
import gsap from "gsap";
import Nav2 from "./Nav2";


const Pet_owner_home = () => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const [petData, setPetData] = useState({
    Petname: "",
    Species: "",
    Breed: "",
    Age: "",
    Vaccination: "",
    Notes: "",
  });

  const [userName, setUserName] = useState("Pet Owner");

  useEffect(() => {
    const savedPetData = JSON.parse(
      localStorage.getItem("petData") || "{}"
    );

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    setPetData({
      Petname: savedPetData.Petname || "",
      Species: savedPetData.Species || "",
      Breed: savedPetData.Breed || "",
      Age: savedPetData.Age || "",
      Vaccination: savedPetData.Vaccination || "",
      Notes: savedPetData.Notes || "",
    });

    setUserName(
      currentUser.name ||
        localStorage.getItem("userName") ||
        "Pet Owner"
    );
  }, []);

  const getPetImage = () => {
    const species = petData.Species?.toLowerCase().trim();

    if (species === "cat") {
      return "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1600&q=90";
    }

    if (species === "bird") {
      return "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }

    if (species === "rabbit") {
      return "https://images.unsplash.com/photo-1756789347830-1958ed8caa34?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }

    return "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  };

  useEffect(() => {
    if (!petData.Petname) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(".pet-home-page", {
        opacity: 0,
        duration: 0.7,
      })
        .from(
          ".pet-home-eyebrow",
          {
            y: 25,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.35"
        )
        .from(
          ".pet-home-title",
          {
            y: 70,
            opacity: 0,
            duration: 1,
          },
          "-=0.35"
        )
        .from(
          ".pet-home-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.55"
        )
        .from(
          ".pet-home-image",
          {
            scale: 0.88,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.65"
        )
        .from(
          ".pet-profile-card",
          {
            y: 60,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.65"
        )
        .from(
          ".pet-info-item",
          {
            y: 25,
            opacity: 0,
            stagger: 0.08,
            duration: 0.55,
          },
          "-=0.45"
        );

      gsap.to(imageRef.current, {
        y: -8,
        scale: 1.025,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(cardRef.current, {
        y: -5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, [petData.Petname]);

  return (
    <>
      <Nav2 />
      
      <main
        className="pet-home-page"
        ref={pageRef}
      >
        <section
          className="pet-home-hero"
          ref={heroRef}
        >
          <div className="pet-home-content">
            <span className="pet-home-eyebrow">
              FUREVERCARE / PET PROFILE
            </span>

            <h1 className="pet-home-title">
              Welcome,
              <br />
              <em>{userName}.</em>
            </h1>

            <p className="pet-home-description">
              Your companion's care profile is ready. Everything
              important about your pet is organized here in one calm
              and simple space.
            </p>

            <div className="pet-home-meta">
              <span>PROFILE / 01</span>
              <span>FUREVERCARE / 2026</span>
            </div>
          </div>

          <div className="pet-home-visual">
            <div className="pet-home-image-wrap">
              <img
                ref={imageRef}
                className="pet-home-image"
                src={getPetImage()}
                alt={petData.Petname || "Pet"}
              />

              <div className="pet-home-image-overlay" />

              <div className="pet-image-caption">
                <span>YOUR COMPANION</span>

                <strong>
                  {petData.Petname || "Your Pet"}
                </strong>
              </div>

              <div className="pet-image-number">
                01
              </div>
            </div>
          </div>
        </section>

        <section className="pet-profile-section">
          <div className="pet-profile-heading">
            <span>PET PROFILE</span>

            <h2>
              Everything about
              <br />
              <em>your companion.</em>
            </h2>
          </div>

          <div
            className="pet-profile-card"
            ref={cardRef}
          >
            <div className="pet-profile-card-top">
              <div>
                <span className="pet-card-label">
                  PROFILE NAME
                </span>

                <h3>
                  {petData.Petname || "Your Pet"}
                </h3>
              </div>

              <div className="pet-status">
                <span />
                PROFILE ACTIVE
              </div>
            </div>

            <div className="pet-info-grid">
              <div className="pet-info-item">
                <span>SPECIES</span>

                <strong>
                  {petData.Species || "Not available"}
                </strong>
              </div>

              <div className="pet-info-item">
                <span>BREED</span>

                <strong>
                  {petData.Breed || "Not available"}
                </strong>
              </div>

              <div className="pet-info-item">
                <span>AGE</span>

                <strong>
                  {petData.Age || "Not available"}
                </strong>
              </div>

              <div className="pet-info-item">
                <span>VACCINATION</span>

                <strong>
                  {petData.Vaccination || "Not available"}
                </strong>
              </div>

              <div className="pet-info-item pet-info-full">
                <span>OTHER NOTES</span>

                <strong>
                  {petData.Notes ||
                    "No additional notes."}
                </strong>
              </div>
            </div>

            <div className="pet-profile-footer">
              <span>
                FUREVERCARE / PERSONALIZED CARE
              </span>

              <span>
                {petData.Species || "PET"} / 01
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Pet_owner_home;