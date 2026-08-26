import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/VoiceAssistant.css";

const MicIcon = ({ listening }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="8" y="3" width="8" height="12" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 11.5a7 7 0 0 0 14 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 18.5V22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9 22h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const recognitionRef = useRef(null);
  const listeningRef = useRef(false);
  const timeoutRef = useRef(null);

  const [listening, setListening] = useState(false);
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState("Click mic and speak");

  const supported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

 const normalizeCommand = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?؟،؛:]/g, "")
    .replace(/\bthe\b/g, "")
    .replace(/\bplease\b/g, "")
    .replace(/\s+/g, " ")
    .replace(/shelters/g, "shelter")
    .replace(/sheltar/g, "shelter")
    .replace(/shilter/g, "shelter")
    .replace(/shelterr/g, "shelter")
    .trim();
};

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = /[\u0600-\u06FF]/.test(text) ? "ur-PK" : "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const containsAny = (text, words) => {
    return words.some((word) => {
      const value = normalizeCommand(word);
      return text === value || text.includes(value);
    });
  };

  const scoreMatch = (text, words) => {
    const value = normalizeCommand(text);
    let score = 0;
    words.forEach((word) => {
      const target = normalizeCommand(word);
      if (value === target) score += 100;
      else if (value.includes(target)) score += target.length;
      else {
        const parts = target.split(" ");
        parts.forEach((part) => {
          if (part.length > 2 && value.includes(part)) score += 2;
        });
      }
    });
    return score;
  };

  const go = (path, response) => {
    if (location.pathname !== path) {
      navigate(path);
    }
    setStatus(response);
    speak(response);
  };

  const scrollDown = (amount = 0.8) => {
    window.scrollBy({
      top: window.innerHeight * amount,
      behavior: "smooth"
    });
  };

  const scrollUp = (amount = 0.8) => {
    window.scrollBy({
      top: -window.innerHeight * amount,
      behavior: "smooth"
    });
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  };

  const dispatchVoiceAction = (action, extra = {}) => {
    window.dispatchEvent(
      new CustomEvent("voice-command", {
        detail: {
          action,
          ...extra
        }
      })
    );
  };

  const getAllInputs = () => {
    return Array.from(
      document.querySelectorAll(
        "input, textarea, select, button"
      )
    );
  };

  const getElementText = (element) => {
    return [
      element.name,
      element.id,
      element.placeholder,
      element.getAttribute("aria-label"),
      element.getAttribute("type"),
      element.getAttribute("name")
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  };

  const findInput = (keywords) => {
    const elements = getAllInputs().filter(
      (element) =>
        element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA" ||
        element.tagName === "SELECT"
    );

    let best = null;
    let bestScore = 0;

    elements.forEach((element) => {
      const text = getElementText(element);
      const score = scoreMatch(text, keywords);

      if (score > bestScore) {
        bestScore = score;
        best = element;
      }
    });

    return bestScore > 0 ? best : null;
  };

  const setInputValue = (element, value) => {
    if (!element) return false;

    element.focus();

    const prototype =
      element.tagName === "TEXTAREA"
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype;

    const setter = Object.getOwnPropertyDescriptor(
      prototype,
      "value"
    )?.set;

    if (setter) {
      setter.call(element, value);
    } else {
      element.value = value;
    }

    element.dispatchEvent(
      new Event("input", {
        bubbles: true
      })
    );

    element.dispatchEvent(
      new Event("change", {
        bubbles: true
      })
    );

    element.blur();

    return true;
  };

  const extractValue = (text, patterns) => {
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match?.[1]) {
        return match[1]
          .trim()
          .replace(/\s+(please|pls|thanks|thank you)$/i, "")
          .trim();
      }
    }

    return "";
  };

  const cleanName = (value) => {
    return value
      .replace(/\b(my name is|name is|mera naam|mera name|naam hai|naam he)\b/gi, "")
      .replace(/\b(please|pls|enter|fill|likho|laga do|daal do)\b/gi, "")
      .trim();
  };

  const cleanPhone = (value) => {
    return value.replace(/[^\d+]/g, "");
  };

  const cleanEmail = (value) => {
    return value
      .replace(/\s+at\s+/gi, "@")
      .replace(/\s+dot\s+/gi, ".")
      .replace(/\s+/g, "")
      .trim();
  };

  const handleFormCommand = (text) => {
    const nameValue = extractValue(text, [
      /(?:my\s+)?name\s+(?:is|=)\s+(.+)/i,
      /enter\s+(?:the\s+)?name\s+(.+)/i,
      /fill\s+(?:the\s+)?name\s+(?:with\s+)?(.+)/i,
      /put\s+(?:my\s+)?name\s+(?:as\s+)?(.+)/i,
      /mera\s+naam\s+(.+)/i,
      /mera\s+name\s+(.+)/i,
      /naam\s+(.+)\s+hai/i,
      /naam\s+(.+)/i
    ]);

    if (nameValue) {
      const input = findInput([
        "name",
        "full name",
        "your name",
        "user name",
        "naam"
      ]);

      if (setInputValue(input, cleanName(nameValue))) {
        setStatus("Name entered");
        speak("Name entered");
        return true;
      }
    }

    const emailValue = extractValue(text, [
      /(?:my\s+)?email\s+(?:is|=)\s+(.+)/i,
      /enter\s+(?:the\s+)?email\s+(.+)/i,
      /fill\s+(?:the\s+)?email\s+(?:with\s+)?(.+)/i,
      /put\s+(?:my\s+)?email\s+(?:as\s+)?(.+)/i,
      /email\s+(.+)/i
    ]);

    if (emailValue) {
      const input = findInput([
        "email",
        "email address",
        "e-mail"
      ]);

      if (setInputValue(input, cleanEmail(emailValue))) {
        setStatus("Email entered");
        speak("Email entered");
        return true;
      }
    }

    const phoneValue = extractValue(text, [
      /(?:my\s+)?phone\s+(?:number\s+)?(?:is|=)\s+(.+)/i,
      /(?:my\s+)?mobile\s+(?:number\s+)?(?:is|=)\s+(.+)/i,
      /enter\s+(?:the\s+)?phone\s+(.+)/i,
      /enter\s+(?:the\s+)?mobile\s+(.+)/i,
      /fill\s+(?:the\s+)?phone\s+(.+)/i,
      /phone\s+(.+)/i
    ]);

    if (phoneValue) {
      const input = findInput([
        "phone",
        "phone number",
        "mobile",
        "mobile number",
        "contact"
      ]);

      if (setInputValue(input, cleanPhone(phoneValue))) {
        setStatus("Phone number entered");
        speak("Phone number entered");
        return true;
      }
    }

    const petNameValue = extractValue(text, [
      /(?:my\s+)?pet\s+name\s+(?:is|=)\s+(.+)/i,
      /pet\s+name\s+(.+)/i,
      /(?:mere|mera)\s+pet\s+(?:ka\s+)?naam\s+(.+)/i,
      /(?:mere|mera)\s+pet\s+(?:ka\s+)?name\s+(.+)/i
    ]);

    if (petNameValue) {
      const input = findInput([
        "pet name",
        "petname",
        "pet",
        "animal name"
      ]);

      if (setInputValue(input, petNameValue)) {
        setStatus("Pet name entered");
        speak("Pet name entered");
        return true;
      }
    }

    const ageValue = extractValue(text, [
      /(?:my\s+)?(?:pet\s+)?age\s+(?:is|=)\s+(.+)/i,
      /enter\s+(?:the\s+)?(?:pet\s+)?age\s+(.+)/i,
      /age\s+(.+)/i,
      /umar\s+(.+)/i
    ]);

    if (ageValue) {
      const input = findInput([
        "age",
        "pet age",
        "animal age",
        "umar"
      ]);

      if (setInputValue(input, ageValue.replace(/[^\d.]/g, ""))) {
        setStatus("Age entered");
        speak("Age entered");
        return true;
      }
    }

    const weightValue = extractValue(text, [
      /(?:my\s+)?(?:pet\s+)?weight\s+(?:is|=)\s+(.+)/i,
      /enter\s+(?:the\s+)?(?:pet\s+)?weight\s+(.+)/i,
      /weight\s+(.+)/i,
      /wazan\s+(.+)/i
    ]);

    if (weightValue) {
      const input = findInput([
        "weight",
        "pet weight",
        "animal weight",
        "wazan"
      ]);

      if (setInputValue(input, weightValue.replace(/[^\d.]/g, ""))) {
        setStatus("Weight entered");
        speak("Weight entered");
        return true;
      }
    }

    return false;
  };

  const clickElement = (keywords) => {
    const elements = getAllInputs();

    let best = null;
    let bestScore = 0;

    elements.forEach((element) => {
      if (element.tagName !== "BUTTON") return;

      const text = [
        element.innerText,
        element.textContent,
        element.getAttribute("aria-label"),
        element.getAttribute("title"),
        element.id,
        element.name,
        element.value
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const score = scoreMatch(text, keywords);

      if (score > bestScore) {
        bestScore = score;
        best = element;
      }
    });

    if (best && bestScore > 0) {
      best.click();
      return true;
    }

    return false;
  };

  const handleVoiceCommand = (rawCommand) => {
    const text = normalizeCommand(rawCommand);

    console.log("Voice Command:", text);

    if (!text) return;

    if (
  containsAny(text, [
    "animal shelter",
    "animal shelters",
    "open animal shelter",
    "open animal shelters",
    "open the animal shelter",
    "open the animal shelters",
    "animal shelter kholo",
    "animal shelters kholo",
    "animal shelter open karo",
    "animal shelters open karo",
    "animal shelter page",
    "animal shelter page kholo",
    "animal shelter par jao",
    "animal shelters par jao",
    "shelter kholo",
    "shelter open karo",
    "shelter page kholo",
    "shelter par jao",
    "shelter open",
    "go to animal shelter",
    "go animal shelter",
    "take me to animal shelter",
    "mujhe animal shelter le jao",
    "animal shelter pe jao",
    "animal shelter par le jao",
    "animal shelter dikhao",
    "animal shelter dikha do",
    "animal shelter khol do",
    "animal shelter khol",
    "animal shelter show karo",
    "animal shelter show",
    "اینیمل شیلٹر",
    "اینیمل شیلٹر کھولو",
    "اینیمل شیلٹر پر جاؤ"
  ])
) {
  go("/Animal_Shelter", "Opening Animal Shelter");
  return;
}

    if (
      containsAny(text, [
        "scroll down",
        "scroll downward",
        "scroll lower",
        "go down",
        "move down",
        "down karo",
        "neeche jao",
        "neeche scroll",
        "scroll neeche",
        "neeche le jao",
        "neeche le chalo",
        "neeche karo",
        "thoda neeche",
        "aur neeche",
        "neeche",
        "نیچے جاؤ",
        "نیچے کرو"
      ])
    ) {
      scrollDown();
      setStatus("Scrolling down");
      speak("Scrolling down");
      return;
    }

    if (
      containsAny(text, [
        "scroll up",
        "scroll upward",
        "go up",
        "move up",
        "up karo",
        "upar jao",
        "upar scroll",
        "scroll upar",
        "upar le jao",
        "upar le chalo",
        "upar karo",
        "thoda upar",
        "aur upar",
        "upar",
        "اوپر جاؤ",
        "اوپر کرو"
      ])
    ) {
      scrollUp();
      setStatus("Scrolling up");
      speak("Scrolling up");
      return;
    }

    if (
      containsAny(text, [
        "go top",
        "go to top",
        "top par jao",
        "top pe jao",
        "top kholo",
        "page top",
        "start par jao",
        "upar sab se",
        "sab se upar jao",
        "اوپر جاؤ"
      ])
    ) {
      scrollTop();
      setStatus("Going to top");
      speak("Going to the top");
      return;
    }

    if (
      containsAny(text, [
        "go bottom",
        "go to bottom",
        "bottom par jao",
        "bottom pe jao",
        "page bottom",
        "sab se neeche jao",
        "end par jao",
        "last par jao"
      ])
    ) {
      scrollBottom();
      setStatus("Going to bottom");
      speak("Going to the bottom");
      return;
    }

    if (
      containsAny(text, [
        "go back",
        "go backward",
        "back",
        "back jao",
        "peeche jao",
        "wapas jao",
        "wapas le jao",
        "previous page",
        "previous",
        "pichle page par jao",
        "واپس جاؤ"
      ])
    ) {
      navigate(-1);
      setStatus("Going back");
      speak("Going back");
      return;
    }

    if (
      containsAny(text, [
        "pet owner",
        "open pet owner",
        "pet owner kholo",
        "pet owner select karo",
        "select pet owner",
        "choose pet owner",
        "pet owner page",
        "pet owner wala page",
        "pet owner option",
        "owner option",
        "owner kholo",
        "owner select karo",
        "pet owner dashboard"
      ])
    ) {
      go("/Petowner", "Opening Pet Owner");
      return;
    }

    if (
      containsAny(text, [
        "veterinarian",
        "veterinary",
        "vet",
        "open veterinarian",
        "open vet",
        "veterinarian kholo",
        "vet kholo",
        "vet page",
        "vet wala page",
        "doctor page",
        "doctor kholo",
        "veterinarian option",
        "select veterinarian",
        "choose veterinarian"
      ])
    ) {
      go("/Veterinarian", "Opening Veterinarian");
      return;
    }

    if (
      containsAny(text, [
        "animal shelter",
        "open animal shelter",
        "animal shelter kholo",
        "shelter kholo",
        "shelter page",
        "animal shelter page",
        "shelter wala page",
        "shelter option",
        "select animal shelter",
        "choose animal shelter",
        "adoption shelter"
      ])
    ) {
      go("/Animal_Shelter", "Opening Animal Shelter");
      return;
    }

    if (
      containsAny(text, [
        "dashboard",
        "open dashboard",
        "dashboard kholo",
        "dashboard par jao",
        "home kholo",
        "open home",
        "pet owner home",
        "pet owner dashboard",
        "my dashboard",
        "main dashboard",
        "home page",
        "home par jao"
      ])
    ) {
      go("/Pet_owner_home", "Opening Dashboard");
      return;
    }

    if (
      containsAny(text, [
        "feedback",
        "open feedback",
        "feedback kholo",
        "feedback open karo",
        "feedback par jao",
        "feedback page",
        "feedback wala page",
        "give feedback",
        "feedback form",
        "review page",
        "review kholo"
      ])
    ) {
      go("/Pet_owner_feedback", "Opening Feedback");
      return;
    }

    if (
      containsAny(text, [
        "products",
        "product",
        "open products",
        "products kholo",
        "product kholo",
        "products par jao",
        "product par jao",
        "product page",
        "products page",
        "shopping",
        "shop kholo",
        "shop open karo",
        "pet shop",
        "pet products",
        "shopping page",
        "store kholo",
        "store open karo"
      ])
    ) {
      go("/Pet_owner_products", "Opening Products");
      return;
    }

    if (
      containsAny(text, [
        "health",
        "health care",
        "health and care",
        "open health",
        "health kholo",
        "health and care kholo",
        "health care kholo",
        "health par jao",
        "health page",
        "care page",
        "pet health",
        "pet care",
        "wellness page"
      ])
    ) {
      go("/Pet_owner_health", "Opening Health and Care");
      return;
    }

    if (
      containsAny(text, [
        "checkout",
        "open checkout",
        "checkout kholo",
        "checkout par jao",
        "checkout open karo",
        "checkout page",
        "order page",
        "order kholo",
        "place order",
        "order karna hai",
        "buy karna hai"
      ])
    ) {
      go("/Pet_owner_Checkout", "Opening Checkout");
      return;
    }

    if (
      containsAny(text, [
        "appointment",
        "appointments",
        "appointment kholo",
        "appointments kholo",
        "open appointments",
        "open appointment",
        "appointment slots",
        "appointment slot kholo",
        "appointment page",
        "appointment wala section",
        "booking slots",
        "booking slot",
        "doctor appointment",
        "vet appointment",
        "appointments dikhao"
      ])
    ) {
      setStatus("Opening appointment slots");
      speak("Opening appointment slots");
      dispatchVoiceAction("OPEN_APPOINTMENTS");
      return;
    }

    if (
      containsAny(text, [
        "emergency",
        "emergency directory",
        "emergency directory kholo",
        "open emergency directory",
        "emergency kholo",
        "emergency directory page",
        "emergency section",
        "emergency contacts",
        "emergency numbers",
        "urgent help"
      ])
    ) {
      setStatus("Opening emergency directory");
      speak("Opening emergency directory");
      dispatchVoiceAction("OPEN_EMERGENCY_DIRECTORY");
      return;
    }

    if (
      containsAny(text, [
        "adopted pets",
        "adopted pet",
        "adopted pets kholo",
        "open adopted pets",
        "adopted pet kholo",
        "adopted pets page",
        "adoption page",
        "adoption pets",
        "pets for adoption",
        "adoptable pets"
      ])
    ) {
      setStatus("Opening adopted pets");
      speak("Opening adopted pets");
      dispatchVoiceAction("OPEN_ADOPTED_PETS");
      return;
    }

    if (
      containsAny(text, [
        "happy ending",
        "happy endings",
        "happy ending kholo",
        "happy ending stories kholo",
        "open happy ending",
        "happy ending stories",
        "happy ending page",
        "success stories",
        "success story",
        "adoption stories",
        "happy stories"
      ])
    ) {
      setStatus("Opening happy ending stories");
      speak("Opening happy ending stories");
      dispatchVoiceAction("OPEN_HAPPY_ENDINGS");
      return;
    }

    if (
      containsAny(text, [
        "events",
        "event",
        "events kholo",
        "open events",
        "event kholo",
        "events par jao",
        "events page",
        "event page",
        "event section",
        "upcoming events",
        "pet events"
      ])
    ) {
      setStatus("Opening events");
      speak("Opening events");
      dispatchVoiceAction("OPEN_EVENTS");
      return;
    }

    if (
      containsAny(text, [
        "select pet owner",
        "choose pet owner",
        "pet owner choose karo",
        "pet owner select karo",
        "owner select karo"
      ])
    ) {
      if (
        clickElement([
          "pet owner",
          "petowner",
          "owner"
        ])
      ) {
        setStatus("Pet Owner selected");
        speak("Pet Owner selected");
        return;
      }
    }

    if (
      containsAny(text, [
        "select veterinarian",
        "choose veterinarian",
        "veterinarian select karo",
        "vet select karo",
        "select vet",
        "choose vet"
      ])
    ) {
      if (
        clickElement([
          "veterinarian",
          "veterinary",
          "vet"
        ])
      ) {
        setStatus("Veterinarian selected");
        speak("Veterinarian selected");
        return;
      }
    }

    if (
      containsAny(text, [
        "select animal shelter",
        "choose animal shelter",
        "animal shelter select karo",
        "shelter select karo",
        "select shelter"
      ])
    ) {
      if (
        clickElement([
          "animal shelter",
          "shelter"
        ])
      ) {
        setStatus("Animal Shelter selected");
        speak("Animal Shelter selected");
        return;
      }
    }

    if (
      containsAny(text, [
        "next",
        "next page",
        "next karo",
        "aage jao",
        "aage barho",
        "aagay jao",
        "aagay barho",
        "continue",
        "continue karo",
        "proceed",
        "proceed karo",
        "agla page",
        "aglay page par jao",
        "next button",
        "next dabao",
        "aage le jao"
      ])
    ) {
      if (
        clickElement([
          "next",
          "continue",
          "proceed",
          "aage",
          "agla"
        ])
      ) {
        setStatus("Going next");
        speak("Going next");
        return;
      }

      setStatus("Next action not found");
      speak("I could not find the next button");
      return;
    }

    if (
      containsAny(text, [
        "submit",
        "submit form",
        "form submit karo",
        "submit karo",
        "send form",
        "send karo",
        "bhej do",
        "form bhej do",
        "done",
        "finish",
        "complete form",
        "order submit karo",
        "place order"
      ])
    ) {
      if (
        clickElement([
          "submit",
          "send",
          "place order",
          "order",
          "finish",
          "complete",
          "done"
        ])
      ) {
        setStatus("Form submitted");
        speak("Form submitted");
        return;
      }

      setStatus("Submit button not found");
      speak("I could not find the submit button");
      return;
    }

    if (
      containsAny(text, [
        "close",
        "close it",
        "close this",
        "band karo",
        "band kar do",
        "popup close",
        "modal close",
        "window close",
        "close popup"
      ])
    ) {
      if (
        clickElement([
          "close",
          "cancel",
          "cross",
          "x"
        ])
      ) {
        setStatus("Closed");
        speak("Closed");
        return;
      }

      setStatus("Close button not found");
      speak("I could not find the close button");
      return;
    }

    if (handleFormCommand(text)) {
      return;
    }

    if (
      containsAny(text, [
        "show me",
        "dikhao",
        "dikhana",
        "show",
        "open",
        "kholo",
        "khol do",
        "page dikhao"
      ])
    ) {
      if (containsAny(text, ["product", "products", "shop", "shopping"])) {
        go("/Pet_owner_products", "Opening Products");
        return;
      }

      if (containsAny(text, ["feedback", "review"])) {
        go("/Pet_owner_feedback", "Opening Feedback");
        return;
      }

      if (containsAny(text, ["health", "care", "wellness"])) {
        go("/Pet_owner_health", "Opening Health and Care");
        return;
      }

      if (containsAny(text, ["checkout", "order"])) {
        go("/Pet_owner_Checkout", "Opening Checkout");
        return;
      }

      if (containsAny(text, ["dashboard", "home"])) {
        go("/Pet_owner_home", "Opening Dashboard");
        return;
      }

      if (containsAny(text, ["vet", "veterinarian"])) {
        go("/Veterinarian", "Opening Veterinarian");
        return;
      }

      if (containsAny(text, ["shelter"])) {
        go("/Animal_Shelter", "Opening Animal Shelter");
        return;
      }
    }

    if (
      containsAny(text, [
        "refresh",
        "refresh page",
        "page refresh karo",
        "reload",
        "reload page",
        "dobara load karo"
      ])
    ) {
      window.location.reload();
      return;
    }

    const fillFormField = (rawText) => {
  const text = normalizeCommand(rawText);

  const patterns = [
    /^enter (.+?) (?:as|is|with) (.+)$/i,
    /^fill (.+?) (?:as|is|with) (.+)$/i,
    /^type (.+?) (?:as|is|with) (.+)$/i,
    /^put (.+?) (?:as|is|with) (.+)$/i,
    /^write (.+?) (?:as|is|with) (.+)$/i,
    /^enter (.+?) (.+)$/i,
    /^fill (.+?) (.+)$/i,
    /^type (.+?) (.+)$/i,
    /^put (.+?) (.+)$/i,
    /^write (.+?) (.+)$/i,
    /^(.+?) is (.+)$/i,
    /^(.+?) = (.+)$/i
  ];

  let fieldName = "";
  let value = "";

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match) {
      fieldName = match[1].trim();
      value = match[2].trim();
      break;
    }
  }

  if (!fieldName || !value) return false;

  const cleanFieldName = fieldName
    .replace(/\bthe\b/g, "")
    .replace(/\bfield\b/g, "")
    .replace(/\binput\b/g, "")
    .replace(/\bbox\b/g, "")
    .trim();

  const inputs = Array.from(
    document.querySelectorAll(
      "input, textarea, select"
    )
  );

  const normalize = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

  const wanted = normalize(cleanFieldName);

  let target = null;

  for (const input of inputs) {
    const candidates = [];

    if (input.name) {
      candidates.push(input.name);
    }

    if (input.id) {
      candidates.push(input.id);
    }

    if (input.placeholder) {
      candidates.push(input.placeholder);
    }

    if (input.getAttribute("aria-label")) {
      candidates.push(
        input.getAttribute("aria-label")
      );
    }

    const labels = Array.from(
      document.querySelectorAll(
        `label[for="${input.id}"]`
      )
    );

    labels.forEach((label) => {
      candidates.push(label.innerText);
    });

    const parentLabel =
      input.closest("label");

    if (parentLabel) {
      candidates.push(parentLabel.innerText);
    }

    const matchFound = candidates.some(
      (candidate) => {
        const normalizedCandidate =
          normalize(candidate);

        return (
          normalizedCandidate === wanted ||
          normalizedCandidate.includes(wanted) ||
          wanted.includes(normalizedCandidate)
        );
      }
    );

    if (matchFound) {
      target = input;
      break;
    }
  }

  if (!target) {
    setStatus(
      `Field "${cleanFieldName}" not found`
    );

    speak(
      `I could not find the ${cleanFieldName} field`
    );

    return true;
  }

  if (
    target.tagName.toLowerCase() === "select"
  ) {
    const options = Array.from(
      target.options
    );

    const wantedValue = normalize(value);

    const option = options.find(
      (item) => {
        const optionText =
          normalize(item.textContent);

        const optionValue =
          normalize(item.value);

        return (
          optionText === wantedValue ||
          optionValue === wantedValue ||
          optionText.includes(wantedValue) ||
          wantedValue.includes(optionText)
        );
      }
    );

    if (option) {
      target.value = option.value;
    } else {
      setStatus(
        `Option "${value}" not found`
      );

      speak(
        `I could not find ${value} in ${cleanFieldName}`
      );

      return true;
    }
  } else {
    const setter =
      Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
      )?.set ||
      Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        "value"
      )?.set;

    if (setter) {
      setter.call(target, value);
    } else {
      target.value = value;
    }
  }

  target.dispatchEvent(
    new Event("input", {
      bubbles: true
    })
  );

  target.dispatchEvent(
    new Event("change", {
      bubbles: true
    })
  );

  target.focus();

  setStatus(
    `Filled ${cleanFieldName}`
  );

  speak(
    `${cleanFieldName} filled successfully`
  );

  return true;
};
if (fillFormField(text)) {
  return;
}

    setStatus("Command not recognized");
    speak("Sorry, I did not understand that command");
  };

  useEffect(() => {
    if (!supported) return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 5;

    recognition.onstart = () => {
      listeningRef.current = true;
      setListening(true);
      setStatus("Listening...");
      setCommand("");
    };

    recognition.onresult = (event) => {
      let bestText = "";

      const result =
        event.results?.[0];

      if (result) {
        for (let i = 0; i < result.length; i++) {
          const transcript =
            result[i]?.transcript?.trim();

          if (transcript) {
            bestText = transcript;
            break;
          }
        }
      }

      if (bestText) {
        setCommand(bestText);
        handleVoiceCommand(bestText);
      }
    };

    recognition.onerror = (event) => {
      console.error(
        "Voice Recognition Error:",
        event.error
      );

      listeningRef.current = false;
      setListening(false);

      if (event.error === "not-allowed") {
        setStatus("Microphone permission denied");
      } else if (event.error === "no-speech") {
        setStatus("I didn't hear anything");
      } else if (event.error === "network") {
        setStatus("Speech recognition network error");
      } else {
        setStatus("Voice recognition error");
      }
    };

    recognition.onend = () => {
      listeningRef.current = false;
      setListening(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setStatus("Click mic and speak");
      }, 1800);
    };

    recognitionRef.current = recognition;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      try {
        recognition.stop();
      } catch {}

      recognitionRef.current = null;
    };
  }, []);

  const toggleListening = () => {
    if (!supported) {
      setStatus(
        "Voice recognition is not supported in this browser"
      );
      return;
    }

    if (listeningRef.current) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      return;
    }

    try {
      window.speechSynthesis?.cancel();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.start();
    } catch (error) {
      console.error(error);
    }
  };

  if (!supported) {
    return null;
  }

  return (
    <div className="voice-assistant">
      <div
        className={`voice-assistant-status ${
          listening ? "active" : ""
        }`}
      >
        <span className="voice-assistant-status-dot"></span>

        <div className="voice-assistant-status-text">
          <strong>
            {listening
              ? "Listening..."
              : "Voice Assistant"}
          </strong>

          <small>
            {command || status}
          </small>
        </div>
      </div>

      <button
        type="button"
        className={`voice-assistant-button ${
          listening ? "listening" : ""
        }`}
        onClick={toggleListening}
        aria-label={
          listening
            ? "Stop voice assistant"
            : "Start voice assistant"
        }
      >
        <span className="voice-assistant-ring"></span>

        <span className="voice-assistant-icon">
          <MicIcon listening={listening} />
        </span>
      </button>
    </div>
  );
};

export default VoiceAssistant;