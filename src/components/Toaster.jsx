import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../style/PageToast.css";

const WaveHandIcon = () => (
  <svg
    viewBox="0 0 64 64"
    className="page-toast-hand"
    aria-hidden="true"
  >
    <path
      d="M20.5 31.5V14.2c0-2.5 1.9-4.5 4.3-4.5s4.3 2 4.3 4.5v14.1V10.5c0-2.5 1.9-4.5 4.3-4.5s4.3 2 4.3 4.5v17.8V12.7c0-2.5 1.9-4.5 4.3-4.5s4.3 2 4.3 4.5v16.4l1.4-4.1c.8-2.3 3.2-3.5 5.5-2.7 2.3.8 3.5 3.2 2.7 5.5l-4.9 14.1c-2.3 6.7-8.6 11.2-15.7 11.2h-5.8c-6.7 0-12.7-3.9-15.4-10L8.4 32.8c-1-2.3.1-4.9 2.4-5.9 2.3-1 4.9.1-2.4 2.4l3.8 8.4V31.5Z"
      fill="currentColor"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="page-toast-close-icon"
    aria-hidden="true"
  >
    <path
      d="M6 6l12 12M18 6L6 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const pageMessages = {
  "/": {
    title: "Welcome",
    text: "Thanks for visiting FurEver Care. We're happy to have you here."
  },

  "/Petowner": {
    title: "Pet Owner",
    text: "Welcome to the Pet Owner section. Explore the care options available for your furry friend."
  },

  "/Veterinarian": {
    title: "Veterinarian",
    text: "Welcome to the Veterinarian section. Explore tools and information designed for veterinary care."
  },

  "/Veterinarian/page": {
    title: "Veterinarian Dashboard",
    text: "Thanks for visiting the Veterinarian page. Manage and explore your veterinary care experience."
  },

  "/Animal_Shelter": {
    title: "Animal Shelter",
    text: "Thanks for visiting our Animal Shelter section. Explore care and support for animals in need."
  },

  "/Pet_owner_home": {
    title: "Pet Care",
    text: "Welcome to your Pet Care home. Explore health, grooming, products and other helpful resources."
  },

  "/Pet_owner_feedback": {
    title: "Feedback",
    text: "Thanks for visiting our Feedback page. Your thoughts help us make FurEver Care better."
  },

  "/Pet_owner_products": {
    title: "Pet Products",
    text: "Thanks for visiting our Products page. Explore useful products for your beloved pet."
  },

  "/Pet_owner_health": {
    title: "Pet Health",
    text: "Thanks for visiting our Pet Health page. Explore helpful information for your pet's general wellness."
  }
};

const PageToast = () => {
  const location = useLocation();

  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    const name = localStorage.getItem("userName") || "";

    const info =
      pageMessages[location.pathname] || {
        title: "Welcome",
        text: "Thanks for visiting FurEver Care. Hope you have a great experience."
      };

    setUserName(name);
    setPageInfo(info);
    setVisible(false);

    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 700);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 6200);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  if (!visible || !pageInfo) {
    return null;
  }

  return (
    <div className="page-toast">
      <button
        className="page-toast-close"
        onClick={() => setVisible(false)}
        aria-label="Close notification"
      >
        <CloseIcon />
      </button>

      <div className="page-toast-content">
        <div className="page-toast-greeting">
          <span>Hello</span>
          <WaveHandIcon />
          {userName && <span>{userName}</span>}
        </div>

        <div className="page-toast-page">
          {pageInfo.title}
        </div>

        <p>{pageInfo.text}</p>
      </div>
    </div>
  );
};

export default PageToast;