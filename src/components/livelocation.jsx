import { useEffect, useState } from "react";
import "../style/liveLocation.css";

export default function LiveLocation() {
  const [location, setLocation] = useState("Locating...");
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Location unavailable");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
          );

          const data = await response.json();
          const address = data.address || {};

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.suburb ||
            "Unknown location";

          const country = address.country || "";

          setLocation(
            country ? `${city}, ${country}` : city
          );
        } catch {
          setLocation("Location detected");
        }
      },
      () => {
        setLocation("Location permission denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  return (
    <div className="location-peek">
      <div className="location-peek-inner">

        <div className="location-time">
          <span className="location-live-dot"></span>

          <div>
            <strong>{time}</strong>
            <span>LOCAL TIME</span>
          </div>
        </div>

        <div className="location-place">

          <div className="location-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx="12"
                cy="9"
                r="2.3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div>
            <strong>{location}</strong>
            <span>LIVE LOCATION</span>
          </div>

        </div>

      </div>
    </div>
  );
}