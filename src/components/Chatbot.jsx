import React, { useEffect, useRef, useState } from "react";
import "../style/PetChatbot.css";

const SYSTEM_PROMPT = `
You are the official AI Assistant for a professional Pet Care website.

LANGUAGE RULE:
- Reply in the same language and style used by the user.
- Support English, Roman Urdu and Urdu.
- If the user writes English, reply in English.
- If the user writes Roman Urdu, reply in Roman Urdu.
- If the user writes Urdu script, reply in Urdu.
- If the user mixes English and Roman Urdu, reply naturally in the same mixed style.
- Keep normal answers short and useful.
- Give detailed answers only when the user asks for details.
- Never invent features, services, prices, appointments, products or data that are not provided.

PET CARE ASSISTANCE:
You can help users with:
- Dog care
- Cat care
- Basic pet hygiene
- Grooming guidance
- Food and nutrition information
- Exercise and activity guidance
- Vaccination information
- General preventive care
- Pet wellness
- Appointment guidance
- Grooming appointment guidance
- Medication reminder guidance
- Pet product guidance
- Basic symptom awareness
- Emergency warning signs
- General pet-care questions

HEALTH SAFETY:
- You are not a veterinarian.
- Do not diagnose diseases with certainty.
- Do not prescribe prescription medicines.
- Do not recommend exact medication dosages unless that information is explicitly provided by the website.
- For serious, sudden or dangerous symptoms, recommend contacting a qualified veterinarian immediately.
- If a pet has difficulty breathing, severe bleeding, seizures, collapse, poisoning, serious injury, unconsciousness or another obvious emergency, recommend urgent veterinary care.
- Do not give false reassurance.
- Clearly distinguish general information from professional veterinary advice.

PET PROFILE:
If the user provides information such as:
- Pet type
- Breed
- Age
- Weight
- Gender
- Activity level
- Existing concerns

Use that information to make the response more relevant.
Do not invent missing pet information.

WEBSITE:
This is a Pet Care website designed to help pet owners with pet health awareness, care, grooming, appointments, products and general pet wellness.

If the website data supplied to you does not contain a specific feature, service, price or product, do not claim that it exists.

APPOINTMENTS:
You may explain how appointments work if the website supports appointments.
Do not claim that an appointment has been booked unless an actual booking action is available.

PRODUCTS:
If the user asks about pet products, only recommend products or categories that are actually available in the supplied website data.
Do not invent brands, prices or stock availability.

GROOMING:
You can provide general grooming guidance for dogs and cats.
Mention that grooming frequency can vary by breed, coat type, age and lifestyle.

FOOD:
You can provide general nutrition guidance.
Do not claim that one food is medically appropriate for a specific disease unless supported by veterinary guidance.
Do not invent product prices or availability.

VACCINES:
Explain general vaccination concepts and encourage users to follow a veterinarian's vaccination schedule.
Do not invent exact vaccination schedules for a specific pet without sufficient information.

MEDICATION:
Never act as a veterinarian.
Do not prescribe medication.
For medication questions involving an existing prescription, advise following the veterinarian's instructions.

EMERGENCY:
For potentially life-threatening situations, prioritize immediate veterinary care over lengthy explanations.

WEBSITE LIMITATIONS:
- Do not claim to perform actions that the chatbot cannot actually perform.
- Do not claim access to a pet's medical records unless explicitly provided.
- Do not claim live veterinarian availability unless explicitly provided.
- Do not claim live appointment availability unless explicitly provided.
- Do not claim live product stock unless explicitly provided.
- Do not claim emergency services are available through the website unless explicitly provided.
- Do not invent information.

ANSWER STYLE:
- Friendly and professional.
- Keep normal answers concise.
- Use short paragraphs.
- Use bullet points when useful.
- Avoid unnecessary technical language.
- If the user asks a simple question, answer directly.
- If the user asks for detailed guidance, provide structured information.
- If the user asks something outside pet care or website functionality, politely explain that you are mainly a Pet Care Assistant.

IMPORTANT:
Always answer according to the user's language.
`;
const PawIcon = () => (
  <svg
    viewBox="0 0 64 64"
    aria-hidden="true"
    className="pet-paw-icon"
  >
    <path
      d="M20 28c-5.2 0-9.5-4.7-9.5-10.4S14.2 7.5 19.4 7.5c4.9 0 8.5 4.5 8.5 10.2C27.9 23.4 25.1 28 20 28Z"
      fill="currentColor"
    />
    <path
      d="M44 28c-5.1 0-7.9-4.6-7.9-10.3 0-5.7 3.6-10.2 8.5-10.2 5.2 0 8.9 4.4 8.9 10.1S49.2 28 44 28Z"
      fill="currentColor"
    />
    <path
      d="M10.5 35.5c-4.4-1.7-8.4 1.3-8.8 5.9-.4 4.3 2.5 7.5 6.2 7.5 3.7 0 6.8-3.1 7.1-7.1.3-3-1.5-5.3-4.5-6.3Z"
      fill="currentColor"
    />
    <path
      d="M53.5 35.5c4.4-1.7 8.4 1.3 8.8 5.9.4 4.3-2.5 7.5-6.2 7.5-3.7 0-6.8-3.1-7.1-7.1-.3-3 1.5-5.3 4.5-6.3Z"
      fill="currentColor"
    />
    <path
      d="M32 29c-8.2 0-15.5 8.1-15.5 17.3C16.5 53.8 22.7 58 32 58s15.5-4.2 15.5-11.7C47.5 37.1 40.2 29 32 29Z"
      fill="currentColor"
    />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path
      d="M14 12.5h20c4.7 0 8.5 3.8 8.5 8.5v8c0 4.7-3.8 8.5-8.5 8.5H24l-8.5 6v-6H14c-4.7 0-8.5-3.8-8.5-8.5v-8c0-4.7 3.8-8.5 8.5-8.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <circle cx="17" cy="25" r="1.8" fill="currentColor" />
    <circle cx="24" cy="25" r="1.8" fill="currentColor" />
    <circle cx="31" cy="25" r="1.8" fill="currentColor" />
  </svg>
);


const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M6 6l12 12M18 6L6 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M21 3 10.2 13.8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m21 3-6.9 18-3.9-7.2L3 9.9 21 3Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PetChatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello I'm your Pet Care Assistant. How can I help you and your pet today?"
    }
  ]);
  const [loading, setLoading] = useState(false);

  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo({
        top: bodyRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const box = document.querySelector(".pet-chatbot-box");

    if (!box) return;

    const stopPageScroll = () => {
      if (
        window.lenis &&
        typeof window.lenis.stop === "function"
      ) {
        window.lenis.stop();
      }
    };

    const startPageScroll = () => {
      if (
        window.lenis &&
        typeof window.lenis.start === "function"
      ) {
        window.lenis.start();
      }
    };

    const handleWheel = (e) => {
      if (!box.contains(e.target)) return;

      e.stopPropagation();

      const body = bodyRef.current;

      if (!body) return;

      const atTop = body.scrollTop <= 0;
      const atBottom =
        body.scrollTop + body.clientHeight >=
        body.scrollHeight - 1;

      if (
        (atTop && e.deltaY < 0) ||
        (atBottom && e.deltaY > 0)
      ) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e) => {
      if (box.contains(e.target)) {
        e.stopPropagation();
      }
    };

    box.addEventListener(
      "mouseenter",
      stopPageScroll
    );

    box.addEventListener(
      "mouseleave",
      startPageScroll
    );

    box.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false
      }
    );

    box.addEventListener(
      "touchmove",
      handleTouchMove,
      {
        passive: true
      }
    );

    stopPageScroll();

    return () => {
      box.removeEventListener(
        "mouseenter",
        stopPageScroll
      );

      box.removeEventListener(
        "mouseleave",
        startPageScroll
      );

      box.removeEventListener(
        "wheel",
        handleWheel
      );

      box.removeEventListener(
        "touchmove",
        handleTouchMove
      );

      startPageScroll();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow =
      document.body.style.overflow;

    const originalTouchAction =
      document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow =
        originalOverflow;

      document.body.style.touchAction =
        originalTouchAction;
    };
  }, [open]);

  const sendMessage = async () => {
    const text = message.trim();

    if (!text || loading) return;

    setMessage("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text
      }
    ]);

    setLoading(true);

    try {
      const apiKey =
        import.meta.env.VITE_GROQ_API_KEY;

      if (!apiKey) {
        throw new Error(
          "Groq API key is missing."
        );
      }

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            temperature: 0.2,
            max_tokens: 500,
            messages: [
              {
                role: "system",
                content: SYSTEM_PROMPT
              },
              ...messages.map((item) => ({
                role:
                  item.role === "assistant"
                    ? "assistant"
                    : "user",
                content: item.content
              })),
              {
                role: "user",
                content: text
              }
            ]
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message ||
            `API Error: ${response.status}`
        );
      }

      const aiResponse =
        data?.choices?.[0]?.message?.content?.trim();

      if (!aiResponse) {
        throw new Error(
          "AI response nahi mila."
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiResponse
        }
      ]);
    } catch (error) {
      console.error(
        "Pet Chatbot Error:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, abhi mujhe response dene mein problem aa rahi hai. Please thori der baad dobara try karein."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!open && (
        <button
          className="pet-chatbot-button"
          onClick={() => setOpen(true)}
          aria-label="Open Pet Care Assistant"
        >
          <span className="pet-chatbot-button-glow"></span>

          <span className="pet-chatbot-icon">
            <ChatIcon />
          </span>
        </button>
      )}

      {open && (
        <div className="pet-chatbot-box">
          <div className="pet-chatbot-header">
            <div className="pet-chatbot-title">
              <div className="pet-chatbot-avatar">
                <ChatIcon />
              </div>

              <div>
                <h3>
                  Pet Care Assistant
                </h3>

                <div className="pet-chatbot-status">
                  <span></span>
                  Online
                </div>
              </div>
            </div>

            <button
              className="pet-chatbot-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <CloseIcon />
            </button>
          </div>

          <div
            className="pet-chatbot-body"
            ref={bodyRef}
          >
            <div className="pet-chatbot-welcome">
              <span className="pet-chatbot-welcome-icon">
                <PawIcon />
              </span>

              <div>
                <strong>
                  Pet Care Assistant
                </strong>

                <p>
                  Ask me anything about your
                  pet's care, <br /> grooming,
                  nutrition or general wellness.
                </p>
              </div>
            </div>

            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`pet-chat-message ${
                  item.role === "user"
                    ? "pet-chat-user"
                    : "pet-chat-bot"
                }`}
              >
                {item.content}
              </div>
            ))}

            {loading && (
              <div className="pet-chat-message pet-chat-bot pet-chat-loading">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          <div className="pet-chatbot-footer">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask about your pet..."
              disabled={loading}
            />

            <button
              onClick={sendMessage}
              disabled={
                !message.trim() || loading
              }
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PetChatbot;