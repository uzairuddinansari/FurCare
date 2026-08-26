import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Main_login = () => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const pageRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const rolesRef = useRef(null);
  const formRef = useRef(null);
  const visualRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(eyebrowRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.7,
      })
        .from(
          titleRef.current,
          {
            y: 80,
            opacity: 0,
            duration: 1.1,
          },
          "-=0.35"
        )
        .from(
          descriptionRef.current,
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.65"
        )
        .from(
          rolesRef.current?.children,
          {
            y: 35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.45"
        )
        .from(
          formRef.current,
          {
            x: 80,
            opacity: 0,
            duration: 1,
          },
          "-=0.65"
        )
        .from(
          visualRef.current,
          {
            scale: 0.92,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        );

      // Floating visual animation
      gsap.to(".login-orb.one", {
        y: -18,
        x: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".login-orb.two", {
        y: 15,
        x: -12,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".visual-card", {
        y: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleRole = (role) => {
    setUserRole(role);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!userRole) {
      setError("Please select your role");
      return;
    }

    localStorage.setItem("currentUser",JSON.stringify({ name: userName.trim(), role: userRole})
);

    if (userRole === "petOwner") {
      navigate("/Petowner");
    } else if (userRole === "veterinarian") {
      navigate("/Veterinarian");
    } else {
      navigate("/Animal_Shelter");
    }
  };

  return (
    <main className="login-page" ref={pageRef}>
      {/* Decorative elements */}
      <div className="login-orb one"></div>
      <div className="login-orb two"></div>

      <section className="login-hero">
        {/* LEFT CONTENT */}
        <div className="login-content">
          <span className="login-eyebrow" ref={eyebrowRef}>
            FurEverCare / PET CARE PLATFORM
          </span>

          <h1 ref={titleRef}>
            Care for every
            <span> little friend.</span>
          </h1>

          <p className="login-description" ref={descriptionRef}>
            One calm place to connect pet owners, veterinarians and animal
            shelters — built around better care for every animal.
          </p>

          <div className="role-heading">
            <span>01</span>
            <p>Choose your role</p>
          </div>

          <div className="roles" ref={rolesRef}>
            <button
              type="button"
              className={userRole === "petOwner" ? "active" : ""}
              onClick={() => handleRole("petOwner")}
            >
              <span className="role-number">01</span>

              <span className="role-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm-7 9c0-3.3 3-6 7-6s7 2.7 7 6" />
                </svg>
              </span>

              <span className="role-name">
                Pet Owner
                <small>For your companion</small>
              </span>

              <span className="role-arrow">↗</span>
            </button>

            <button
              type="button"
              className={userRole === "veterinarian" ? "active" : ""}
              onClick={() => handleRole("veterinarian")}
            >
              <span className="role-number">02</span>

              <span className="role-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M7 10l5-7 5 7-5 4-5-4zM5 21h14" />
                </svg>
              </span>

              <span className="role-name">
                Veterinarian
                <small>For professional care</small>
              </span>

              <span className="role-arrow">↗</span>
            </button>

            <button
              type="button"
              className={userRole === "shelter" ? "active" : ""}
              onClick={() => handleRole("shelter")}
            >
              <span className="role-number">03</span>

              <span className="role-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M3 10l9-7 9 7v10H3z" />
                </svg>
              </span>

              <span className="role-name">
                Animal Shelter
                <small>For shelter communities</small>
              </span>

              <span className="role-arrow">↗</span>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-side">
          <div className="visual-area" ref={visualRef}>
            <div className="visual-label">
              <span>FurEverCare</span>
              <span>01 — 03</span>
            </div>

            <div className="visual-card">
              <div className="visual-image">
                <div className="image-overlay"></div>

                <div className="pet-symbol">
                  <span>F C</span>
                </div>

                <div className="visual-caption">
                  <span>CARE / CONNECT / PROTECT</span>
                  <strong>Every life deserves<br />better care.</strong>
                </div>
              </div>
            </div>

            <div className="visual-bottom">
              <span>BUILT FOR PETS</span>
              <span>EST. 2026</span>
            </div>
          </div>

          {/* FORM */}
          <div className="login-form" ref={formRef}>
            <div className="form-top">
              <span>WELCOME</span>

              <div className="form-dot"></div>
            </div>

            <h2>
              Let's get
              <br />
              started.
            </h2>

            <p className="form-description">
              Tell us your name and choose how you'll use FurEverCare.
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="user-name">YOUR NAME</label>

              <div className="input-wrap">
                <input
                  id="user-name"
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    setError("");
                  }}
                />

                <span>↗</span>
              </div>

              {error && <p className="error">{error}</p>}

              <button className="continue-btn" type="submit">
                <span>Continue to <br /> Fur Ever Care</span>
                <span className="continue-arrow">→</span>
              </button>
            </form>

            <div className="form-footer">
              <span>PRIVATE & SECURE</span>
              <span>FurEverCare © 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE SECTIONS CAN BE ADDED HERE */}
      <section className="login-next-section">
        <span>MORE FROM FurEverCare</span>
      </section>
    </main>
  );
};

export default Main_login;