import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../style/ShelterHero.css";
import Nav from "./Nav"
import pic from "../assets/animal_shulter.jpeg"
const shelterGallery = [
  "https://i.pinimg.com/736x/01/df/1b/01df1bd93f91721addf71ed0aeb1103a.jpg",
  "https://i.pinimg.com/1200x/16/88/d7/1688d79b9e71470570d3b2f2d3bec734.jpg",
  "https://i.pinimg.com/736x/b2/3e/a7/b23ea72d40173d1abf7c9c886fcffadd.jpg",
  "https://i.pinimg.com/736x/22/4d/ef/224def9706d65ff40ed481d757e72dc8.jpg",
  "https://i.pinimg.com/736x/8d/4c/ee/8d4ceebbcae7d162c83b7f0f033f2db6.jpg",
];

const ShelterHero = () => {
  const galleryRef = useRef(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const items = gallery.querySelectorAll(".nef-shelter-gallery-item");

    const handleEnter = (item) => {
      if (window.innerWidth <= 768) return;

      items.forEach((other) => {
        if (other !== item) {
          gsap.to(other, {
            flex: "0.55 1 0%",
            duration: 0.45,
            ease: "power3.out",
            overwrite: true,
          });
        }
      });

      gsap.to(item, {
        flex: "3.8 1 0%",
        duration: 0.6,
        ease: "power4.out",
        overwrite: true,
      });
    };

    const handleLeave = () => {
      if (window.innerWidth <= 768) return;

      gsap.to(items, {
        flex: "1 1 0%",
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
      });
    };

    items.forEach((item) => {
      item.addEventListener("mouseenter", () => handleEnter(item));
    });

    gallery.addEventListener("mouseleave", handleLeave);

    return () => {
      items.forEach((item) => {
        item.replaceWith(item.cloneNode(true));
      });

      gallery.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section className="nef-shelter-hero">
        <Nav />
      <div className="nef-shelter-glass"></div>

      <div className="nef-shelter-content">
        {/* LEFT SIDE */}
        <div className="nef-shelter-left">

          <div className="nef-shelter-intro">
            <span className="nef-shelter-kicker">
              A PLACE TO BELONG
            </span>

            <h1 className="nef-shelter-title">
              Every paw
              <br />
              deserves a
              <br />
              <em>safe home.</em>
            </h1>

            <p className="nef-shelter-description">
              Discover a caring shelter where rescued pets
              are given comfort, protection and another chance
              to find their forever family.
            </p>
          </div>

          {/* GALLERY */}
          <div
            className="nef-shelter-gallery"
            ref={galleryRef}
          >
            {shelterGallery.map((image, index) => (
              <div
                className="nef-shelter-gallery-item"
                key={image}
              >
                <img
                  src={image}
                  alt={`Shelter ${index + 1}`}
                />

                <div className="nef-shelter-image-number">
                  0{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="nef-shelter-feature">
          <img
            src={pic}
            alt="Pet shelter"
          />

          <div className="nef-shelter-feature-glass">
            <span>SHELTER</span>
            <span>01 — 05</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShelterHero;