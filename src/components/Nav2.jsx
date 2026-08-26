import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "../style/nav2.css";
import logo from "../assets/nav/nav2.png";
import video from "../video/nav.mp4"

const Nav2 = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.set(menuRef.current, {
      autoAlpha: 0,
      pointerEvents: "none",
    });

    gsap.set(leftPanelRef.current, {
      xPercent: -100,
    });

    gsap.set(rightPanelRef.current, {
      xPercent: 100,
    });

    gsap.set(leftContentRef.current, {
      x: -50,
      opacity: 0,
    });

    gsap.set(rightContentRef.current, {
      x: 50,
      opacity: 0,
    });
  }, []);

  const openMenu = () => {
    setIsOpen(true);

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();

    tl.set(menuRef.current, {
      autoAlpha: 1,
      pointerEvents: "auto",
    })
      .to(
        leftPanelRef.current,
        {
          xPercent: 0,
          duration: 0.9,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        rightPanelRef.current,
        {
          xPercent: 0,
          duration: 0.9,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        leftContentRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        0.55
      )
      .to(
        rightContentRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        0.65
      );
  };

  const closeMenu = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        document.body.style.overflow = "";
      },
    });

    tl.to(leftContentRef.current, {
      x: -40,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(
        rightContentRef.current,
        {
          x: 40,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "<"
      )
      .to(
        leftPanelRef.current,
        {
          xPercent: -100,
          duration: 0.75,
          ease: "power4.inOut",
        },
        "-=0.05"
      )
      .to(
        rightPanelRef.current,
        {
          xPercent: 100,
          duration: 0.75,
          ease: "power4.inOut",
        },
        "<"
      )
      .set(menuRef.current, {
        autoAlpha: 0,
        pointerEvents: "none",
      });
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const handleNavigate = (path) => {
    closeMenu();

    setTimeout(() => {
      navigate(path);
    }, 650);
  };

  return (
    <>
      <nav className="nav2">
        <div className="nav2-logo" onClick={() => navigate("/")}>
            <img src={logo} alt="PetCare" className="nav-logo" />
          <div>
            
          </div>
        </div>

        <button
          ref={buttonRef}
          className={`nav2-menu-button ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="nav2-button-text">
            {isOpen ? "CLOSE" : "MENU"}
          </span>

          <span className="nav2-button-icon">
            <span />
            <span />
          </span>
        </button>
      </nav>

      <div
        ref={menuRef}
        className="nav2-shutter"
        aria-hidden={!isOpen}
      >
        <div
          ref={leftPanelRef}
          className="nav2-shutter-panel nav2-shutter-left"
        >
          <div
            ref={leftContentRef}
            className="nav2-shutter-left-content"
          >
            <div className="nav2-menu-top">
              <span>FurEverCare / MENU</span>
              <span>01 — 07</span>
            </div>

            <div className="nav2-links">
              <button onClick={() => handleNavigate("/")}>
                <span>01</span>
                <strong>Home</strong>
                <i>↗</i>
              </button>


              <button onClick={() => handleNavigate("/Pet_owner_feedback")}>
                <span>02</span>
                <strong>Feedback</strong>
                <i>↗</i>
              </button>


              <button onClick={() => handleNavigate("/Pet_owner_products")}>
                <span>03</span>
                <strong>Products</strong>
                <i>↗</i>
              </button>

              <button onClick={() => handleNavigate("/Pet_owner_health")}>
                <span>04</span>
                <strong>Health & Tips</strong>
                <i>↗</i>
              </button>

            </div>

            <div className="nav2-left-footer">
              <span>CARE / CONNECT / PROTECT</span>
              <span>© 2026 FurEverCare</span>
            </div>
          </div>
        </div>

        <div
          ref={rightPanelRef}
          className="nav2-shutter-panel nav2-shutter-right"
        >
          <div
            ref={rightContentRef}
            className="nav2-shutter-right-content"
          >
            <div className="nav2-video-label">
              <span>FurEverCare</span>
              <span>CARE IN MOTION</span>
            </div>

            <div className="nav2-video-wrapper">
              <video
                className="nav2-video"
                src={video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />

              <div className="nav2-video-overlay" />

              <div className="nav2-video-caption">
                <span>BETTER CARE STARTS HERE</span>
                <h2>
                  Every life deserves
                  <em>better care.</em>
                </h2>
              </div>
            </div>

            <div className="nav2-video-footer">
              <span>FUREVERCARE</span>
              <span>PETS / PEOPLE / CARE</span>
            </div>
          </div>
        </div>

        <div className="nav2-center-line" />
      </div>
    </>
  );
};

export default Nav2;