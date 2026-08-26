import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "../style/NotFound.css";

const NotFound = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".nf-number",
      {
        y: 80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      }
    )
      .fromTo(
        ".nf-title",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .fromTo(
        ".nf-text",
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
        },
        "-=0.4"
      )
      .fromTo(
        ".nf-btn",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .fromTo(
        ".nf-circle",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.8"
      );
  }, []);

  return (
    <main className="nf-page">
      <div className="nf-glow nf-glow-one"></div>
      <div className="nf-glow nf-glow-two"></div>

      <div className="nf-content">
        <div className="nf-number-wrap">
          <span className="nf-circle"></span>
          <h1 className="nf-number">404</h1>
        </div>

        <h2 className="nf-title">
          Page <span>Not Found</span>
        </h2>

        <p className="nf-text">
          Looks like this page wandered off. The page you're looking for
          doesn't exist or may have been moved.
        </p>

        <Link to="/" className="nf-btn">
          <span>Back to Home</span>
          <span className="nf-arrow">↗</span>
        </Link>
      </div>

      <div className="nf-bottom">
        <span>NEFBAAR</span>
        <span>ERROR 404</span>
      </div>
    </main>
  );
};

export default NotFound;