import { useEffect, useRef, useState } from "react";

import "../style/nav.css";
import "../style/form_petowner.css";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Nav from "./Nav";
import PetChatbot from "./Chatbot";

const Petowner = () => {
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const formRef = useRef(null);
  const bgRefs = useRef([]);

  const [petData, setPetData] = useState({
    Petname: "",
    Species: "Dog",
    Breed: "",
    Age: "",
    Vaccination: "",
    Notes: "",
  });

  const [errors, setErrors] = useState({});

  const backgroundImages = [
    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=2000&q=90",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=2000&q=90",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=90",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(bgRefs.current, {
        opacity: 0,
        scale: 1.08,
      });

      gsap.set(bgRefs.current[0], {
        opacity: 1,
        scale: 1,
      });

      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      intro
        .from(".pet-owner-page", {
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".pet-form-card",
          {
            x: -70,
            opacity: 0,
            duration: 1,
          },
          "-=0.3"
        )
        .from(
          ".pet-form-eyebrow",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.55"
        )
        .from(
          ".pet-form-title",
          {
            y: 35,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".pet-form-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.4"
        )
        .from(
          ".pet-form-field",
          {
            y: 18,
            opacity: 0,
            stagger: 0.07,
            duration: 0.5,
          },
          "-=0.2"
        )
        .from(
          ".pet-submit-btn",
          {
            y: 15,
            opacity: 0,
            scale: 0.96,
            duration: 0.6,
            ease: "back.out(1.5)",
          },
          "-=0.2"
        )
        .from(
          ".pet-side-content",
          {
            x: 60,
            opacity: 0,
            duration: 1,
          },
          "-=0.75"
        );

      const imageTimeline = gsap.timeline({
        repeat: -1,
      });

      backgroundImages.forEach((_, index) => {
        const next = (index + 1) % backgroundImages.length;

        imageTimeline
          .to({}, {
            duration: 4,
          })
          .to(bgRefs.current[index], {
            opacity: 0,
            scale: 1.05,
            duration: 2,
            ease: "power2.inOut",
          })
          .to(
            bgRefs.current[next],
            {
              opacity: 1,
              scale: 1,
              duration: 2,
              ease: "power2.inOut",
            },
            "<"
          );
      });

      gsap.to(formRef.current, {
        y: -4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const downloadJSON = (data) => {
    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "furevercareData.json";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      nameErr: "",
      SpeciesErr: "",
      BreedErr: "",
      AgeErr: "",
      VaccinationErr: "",
      NotesErr: "",
    };

    if (!petData.Petname.trim()) {
      newErrors.nameErr = "Pet name is required";
    }

    if (!petData.Species) {
      newErrors.SpeciesErr = "Please select species";
    }

    if (!petData.Breed.trim()) {
      newErrors.BreedErr = "Breed is required";
    }

    if (!petData.Age.trim()) {
      newErrors.AgeErr = "Age is required";
    }

    if (!petData.Vaccination.trim()) {
      newErrors.VaccinationErr =
        "Vaccination information is required";
    }

    if (!petData.Notes.trim()) {
      newErrors.NotesErr = "Please enter some notes";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) => error !== ""
    );

    if (hasErrors) return;

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    const existingData = JSON.parse(
      localStorage.getItem("furevercareData") || "[]"
    );

    const ownerData = {
      id: Date.now(),
      userName: currentUser.name || "",
      role: "petOwner",
      pet: {
        Petname: petData.Petname.trim(),
        Species: petData.Species,
        Breed: petData.Breed.trim(),
        Age: petData.Age.trim(),
        Vaccination: petData.Vaccination.trim(),
        Notes: petData.Notes.trim(),
      },
    };

    const updatedData = [
      ...existingData,
      ownerData,
    ];

    localStorage.setItem(
      "furevercareData",
      JSON.stringify(updatedData)
    );

    localStorage.setItem(
      "petData",
      JSON.stringify(petData)
    );

    downloadJSON(updatedData);

    navigate("/Pet_owner_home");
  };

  const dataHandler = (e) => {
    setPetData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Nav />
      <PetChatbot />
      <main
        className="pet-owner-page"
        ref={pageRef}
      >
        <div className="pet-background-layer">
          {backgroundImages.map((image, index) => (
            <div
              key={image}
              ref={(el) =>
                (bgRefs.current[index] = el)
              }
              className="pet-background-image"
              style={{
                backgroundImage: `url("${image}")`,
              }}
            />
          ))}

          <div className="pet-background-overlay" />
        </div>

        <div className="pet-owner-content">
          <section className="pet-form-area">
            <div
              className="pet-form-card"
              ref={formRef}
            >
              <div className="pet-form-header">
                <span className="pet-form-eyebrow">
                  PET PROFILE
                  <i />
                  01
                </span>

                <h1 className="pet-form-title">
                  Tell us about
                  <br />
                  <em>your companion.</em>
                </h1>

                <p className="pet-form-description">
                  Create your pet profile so we can personalize their care
                  and keep their information in one place.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="pet-form-grid">
                  <div className="pet-field pet-form-field">
                    <label>Pet Name</label>

                    <input
                      type="text"
                      name="Petname"
                      placeholder="Bruno"
                      value={petData.Petname}
                      onChange={dataHandler}
                    />

                    {errors.nameErr && (
                      <span className="pet-error-message">
                        {errors.nameErr}
                      </span>
                    )}
                  </div>

                  <div className="pet-field pet-form-field">
                    <label>Species</label>

                    <select
                      name="Species"
                      value={petData.Species}
                      onChange={dataHandler}
                    >
                      <option value="">
                        Select Species
                      </option>

                      <option value="Dog">
                        Dog
                      </option>

                      <option value="Cat">
                        Cat
                      </option>

                      <option value="Bird">
                        Bird
                      </option>

                      <option value="Rabbit">
                        Rabbit
                      </option>
                    </select>

                    {errors.SpeciesErr && (
                      <span className="pet-error-message">
                        {errors.SpeciesErr}
                      </span>
                    )}
                  </div>

                  <div className="pet-field pet-form-field">
                    <label>Breed</label>

                    <input
                      type="text"
                      name="Breed"
                      placeholder="Labrador Retriever"
                      value={petData.Breed}
                      onChange={dataHandler}
                    />

                    {errors.BreedErr && (
                      <span className="pet-error-message">
                        {errors.BreedErr}
                      </span>
                    )}
                  </div>

                  <div className="pet-field pet-form-field">
                    <label>Age</label>

                    <input
                      type="text"
                      name="Age"
                      placeholder="2 years"
                      value={petData.Age}
                      onChange={dataHandler}
                    />

                    {errors.AgeErr && (
                      <span className="pet-error-message">
                        {errors.AgeErr}
                      </span>
                    )}
                  </div>

                  <div className="pet-field pet-field-full pet-form-field">
                    <label>
                      Vaccination Information
                    </label>

                    <input
                      type="text"
                      name="Vaccination"
                      placeholder="Rabies, DHPP — up to date"
                      value={petData.Vaccination}
                      onChange={dataHandler}
                    />

                    {errors.VaccinationErr && (
                      <span className="pet-error-message">
                        {errors.VaccinationErr}
                      </span>
                    )}
                  </div>

                  <div className="pet-field pet-field-full pet-form-field">
                    <label>Other Notes</label>

                    <textarea
                      name="Notes"
                      placeholder="Allergies, temperament, favorite treats..."
                      value={petData.Notes}
                      onChange={dataHandler}
                    />

                    {errors.NotesErr && (
                      <span className="pet-error-message">
                        {errors.NotesErr}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pet-form-bottom pet-form-field">
                  <div className="pet-form-step">
                    <span>01</span>
                    <div />
                    <span>02</span>
                  </div>

                  <button
                    type="submit"
                    className="pet-submit-btn"
                  >
                    <span>
                      Go to my Dashboard
                    </span>

                    <b>↗</b>
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section className="pet-side-content">
            <span className="pet-side-eyebrow">
              WELCOME TO YOUR PET'S JOURNEY
            </span>

            <h2>
              Better care
              <br />
              begins with
              <br />
              <em>knowing them.</em>
            </h2>

            <p>
              Tell us about your companion, their needs, and the little
              things that make them special. We'll use their profile to make
              every care experience more personal.
            </p>

            <div className="pet-side-line" />

            <span className="pet-side-count">
              PET CARE / 01
            </span>
          </section>
        </div>
      </main>
    </>
  );
};

export default Petowner;