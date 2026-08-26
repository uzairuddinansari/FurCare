import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import "../style/FurCareLoader.css";

const FurCareLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const counter = { value: 0 };

   const tl = gsap.timeline({
  onComplete: () => {
    if (onComplete) onComplete();
  },
});

gsap.to(counter, {
  value: 100,
  duration: 3.8,
  ease: "power2.inOut",
  onUpdate: () => {
    setProgress(Math.round(counter.value));
  },
});

tl.from(".fc-loader-logo", {
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power4.out",
})
  .from(
    ".fc-loader-ring",
    {
      scale: 0.7,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
    },
    "-=0.6"
  )
  .from(
    ".fc-loader-paw",
    {
      scale: 0,
      rotate: -25,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(1.7)",
    },
    "-=0.5"
  )
  .from(
    ".fc-loader-bottom",
    {
      y: 20,
      opacity: 0,
      duration: 0.7,
    },
    "-=0.3"
  )
  .to(".fc-loader-paw", {
    scale: 1.08,
    duration: 0.7,
    repeat: 2,
    yoyo: true,
    ease: "sine.inOut",
  })
  .to(
    ".fc-loader-ring-progress",
    {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.inOut",
    },
    "<"
  )
  .to(".fc-loader-content", {
    scale: 0.92,
    opacity: 0,
    duration: 0.65,
    ease: "power3.in",
  })
  .to(
    ".fc-loader",
    {
      clipPath: "inset(0 0 100% 0)",
      duration: 1.1,
      ease: "power4.inOut",
    },
    "-=0.15"
  );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="fc-loader">
      <div className="fc-loader-noise"></div>

      <div className="fc-loader-orbit fc-orbit-one"></div>
      <div className="fc-loader-orbit fc-orbit-two"></div>

      <div className="fc-loader-content">
        <div className="fc-loader-brand">
          <span>FUR</span>
          <span>CARE</span>
        </div>

        <div className="fc-loader-ring">
          <svg viewBox="0 0 220 220">
            <circle
              className="fc-loader-ring-bg"
              cx="110"
              cy="110"
              r="92"
            />

            <circle
              className="fc-loader-ring-progress"
              cx="110"
              cy="110"
              r="92"
            />
          </svg>

          <div className="fc-loader-center">
            <div className="fc-loader-paw">
              <span className="fc-paw-main">●</span>
              <span className="fc-paw-dot fc-dot-one">●</span>
              <span className="fc-paw-dot fc-dot-two">●</span>
              <span className="fc-paw-dot fc-dot-three">●</span>
              <span className="fc-paw-dot fc-dot-four">●</span>
            </div>
          </div>
        </div>

        <div className="fc-loader-bottom">
          <div className="fc-loader-status">
            <span>CARING FOR EVERY PAW</span>
            <strong>{progress}%</strong>
          </div>

          <div className="fc-loader-line">
            <span style={{ width: `${progress}%` }}></span>
          </div>
        </div>
      </div>

      <div className="fc-loader-corner fc-corner-top">
        <span>F</span>
        <span>C</span>
      </div>

      <div className="fc-loader-corner fc-corner-bottom">
        <span>PET</span>
        <span>HEALTH</span>
      </div>
    </div>
  );
};

export default FurCareLoader;