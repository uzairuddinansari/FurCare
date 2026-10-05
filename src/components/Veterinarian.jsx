import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "../style/form_veterinanian.css";
import Nav from "./Nav";
import PetChatbot from "./Chatbot";

// import Nav from "./Nav2";
const Picturedata = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const cardRef = useRef(null);
  const bgRefs = useRef([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);
  const [doctorType, setDoctorType] = useState("");
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [recordId, setRecordId] = useState(null);
  const backgroundImages = [
    "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=2200&q=90",
    "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=2200&q=90",
    "https://images.unsplash.com/photo-1711654783635-c65873cdae66?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  useEffect(() => {
    const editUser = localStorage.getItem("editUser");
    if (editUser) {
      const user = JSON.parse(editUser);
      setName(user.name || "");
      setAge(user.age || "");
      setDoctorType(user.doctorType || "");
      setImage(user.image || null);
      setEditIndex(user.index ?? null);
      setRecordId(user.id ?? null);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(bgRefs.current, {
        opacity: 0,
        scale: 1.12,
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
        .from(".vet-picture-page", {
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".vet-picture-card",
          {
            x: -70,
            opacity: 0,
            duration: 1,
          },
          "-=0.3"
        )
        .from(
          ".vet-picture-eyebrow",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.55"
        )
        .from(
          ".vet-picture-title",
          {
            y: 35,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".vet-picture-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.4"
        )
        .from(
          ".vet-picture-field",
          {
            y: 18,
            opacity: 0,
            stagger: 0.08,
            duration: 0.5,
          },
          "-=0.2"
        )
        .from(
          ".vet-picture-submit",
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
          ".vet-picture-side",
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
            duration: 5,
          })
          .to(bgRefs.current[index], {
            opacity: 0,
            scale: 1.08,
            duration: 2.4,
            ease: "power2.inOut",
          })
          .to(
            bgRefs.current[next],
            {
              opacity: 1,
              scale: 1,
              duration: 2.4,
              ease: "power2.inOut",
            },
            "<"
          );
      });

      gsap.to(cardRef.current, {
        y: -4,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      nameErr: "",
      ageErr: "",
      doctorErr: "",
      imageErr: "",
    };

    if (!name.trim()) {
      newErrors.nameErr = "Pet name is required";
    }

    if (!age.trim()) {
      newErrors.ageErr = "Age is required";
    }

    if (!doctorType) {
      newErrors.doctorErr = "Please select veterinarian type";
    }

    if (!image) {
      newErrors.imageErr = "Please select an image";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) => error !== ""
    );

    if (hasErrors) return;

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    const existingUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const existingData = JSON.parse(
      localStorage.getItem("furevercareData") || "[]"
    );

    const newId = recordId || Date.now();

    const veterinarian = {
      id: newId,
      name: name.trim(),
      age: age.trim(),
      doctorType,
      image,
    };

    let updatedUsers = [...existingUsers];
    let updatedData = [...existingData];

    if (editIndex !== null) {
      updatedUsers[editIndex] = veterinarian;

      const dataIndex = updatedData.findIndex(
        (item) =>
          item.role === "veterinarian" &&
          item.id === recordId
      );

      const veterinarianData = {
        id: newId,
        userName: currentUser.name || "",
        role: "veterinarian",
        veterinarian,
      };

      if (dataIndex !== -1) {
        updatedData[dataIndex] = veterinarianData;
      } else {
        updatedData.push(veterinarianData);
      }

      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );

      localStorage.setItem(
        "furevercareData",
        JSON.stringify(updatedData)
      );

      localStorage.removeItem("editUser");

      navigate("/Veterinarian/page");

      return;
    }

    updatedUsers.push(veterinarian);

    updatedData.push({
      id: newId,
      userName: currentUser.name || "",
      role: "veterinarian",
      veterinarian,
    });

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    localStorage.setItem(
      "furevercareData",
      JSON.stringify(updatedData)
    );

    navigate("/Veterinarian/page");
  };

  return (
    <>
      <Nav />
       
      <main className="vet-picture-page" ref={pageRef}>

        <PetChatbot />
        <div className="vet-picture-background">
          {backgroundImages.map((image, index) => (
            <div
              key={image}
              ref={(el) => (bgRefs.current[index] = el)}
              className="vet-picture-bg-image"
              style={{
                backgroundImage: `url("${image}")`,
              }}
            />
          ))}

          <div className="vet-picture-overlay" />
          <div className="vet-picture-glow" />
        </div>

        <div className="vet-picture-content">
          <section className="vet-picture-form-area">
            <div
              className="vet-picture-card"
              ref={cardRef}
            >
              <header className="vet-picture-header">
                <span className="vet-picture-eyebrow">
                  VETERINARY PROFILE
                  <i />
                  {editIndex !== null ? "EDIT" : "02"}
                </span>

                <h1 className="vet-picture-title">
                  {editIndex !== null ? (
                    <>
                      Update your
                      <br />
                      <em>pet's care.</em>
                    </>
                  ) : (
                    <>
                      Tell us about
                      <br />
                      <em>your pet's care.</em>
                    </>
                  )}
                </h1>

                <p className="vet-picture-description">
                  Add a few details about your companion so we can connect
                  them with the right veterinary care and keep their profile
                  organized.
                </p>
              </header>

              <form
                onSubmit={handleSubmit}
                className="vet-picture-form"
              >
                <div className="vet-picture-field">
                  <label>PET NAME</label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Bruno"
                  />

                  {errors.nameErr && (
                    <span className="vet-picture-error">
                      {errors.nameErr}
                    </span>
                  )}
                </div>

                <div className="vet-picture-field">
                  <label>AGE</label>

                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="2"
                    min="0"
                  />

                  {errors.ageErr && (
                    <span className="vet-picture-error">
                      {errors.ageErr}
                    </span>
                  )}
                </div>

                <div className="vet-picture-field">
                  <label>VETERINARY SPECIALTY</label>

                  <select
                    value={doctorType}
                    onChange={(e) => setDoctorType(e.target.value)}
                  >
                    <option value="">Select Veterinary Type</option>
                    <option value="General Practice">
                      General Practice
                    </option>
                    <option value="Surgery">Surgery</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Dentistry">Dentistry</option>
                    <option value="Exotic Animals">
                      Exotic Animals
                    </option>
                  </select>

                  {errors.doctorErr && (
                    <span className="vet-picture-error">
                      {errors.doctorErr}
                    </span>
                  )}
                </div>

                <div className="vet-picture-field vet-picture-upload-field">
                  <label>PET PORTRAIT</label>

                  <div className="vet-picture-upload">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                    />

                    <div className="vet-picture-upload-content">
                      <span className="vet-picture-upload-icon">
                        +
                      </span>

                      <div>
                        <strong>
                          {image
                            ? "Change pet photo"
                            : "Upload pet photo"}
                        </strong>

                        <small>JPG, PNG or WEBP</small>
                      </div>
                    </div>
                  </div>

                  {image && (
                    <span className="vet-picture-selected">
                      ✓ Image selected
                    </span>
                  )}

                  {errors.imageErr && (
                    <span className="vet-picture-error">
                      {errors.imageErr}
                    </span>
                  )}
                </div>

                <div className="vet-picture-bottom">
                  <div className="vet-picture-step">
                    <span>
                      {editIndex !== null ? "EDIT" : "02"}
                    </span>

                    <div />

                    <span>03</span>
                  </div>

                  <button
                    type="submit"
                    className="vet-picture-submit"
                  >
                    <span>
                      {editIndex !== null
                        ? "Update Veterinarian"
                        : "Continue to Veterinarian"}
                    </span>

                    <b>↗</b>
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section className="vet-picture-side">
            <span className="vet-picture-side-eyebrow">
              PERSONALIZED PET CARE
            </span>

            <h2>
              The right care
              <br />
              starts with
              <br />
              <em>the right details.</em>
            </h2>

            <p>
              Give us a little more information about your companion. Their
              age, photo and care preference help create a more personalized
              veterinary experience.
            </p>

            <div className="vet-picture-line" />

            <span className="vet-picture-count">
              VETERINARY CARE / 02
            </span>
          </section>
        </div>
      </main>
    </>
  );
};

export default Picturedata;