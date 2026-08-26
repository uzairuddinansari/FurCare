import { useEffect, useState } from "react";
import Pic from "./card_data";
import { useNavigate } from "react-router-dom";
import "../style/veterinanian.css"
import AppointmentSlots from "./Appoitment";
import vid from "../video/hero.mp4"
import Nav from "./Nav";
import Footer from "./Footer";
import EmergencyDirectory from "./EmergencyDirectory";
import LiveLocation from "./livelocation";
import PetChatbot from "./Chatbot";

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const deleteUser = (index) => {
    const updatedUsers = users.filter(
      (_, idx) => idx !== index
    );

    setUsers(updatedUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );
  };

  const updateUser = (index) => {
    const user = users[index];

    localStorage.setItem(
      "editUser",
      JSON.stringify({
        ...user,
        index,
      })
    );

    navigate("/Veterinarian");
  };

  const addNewUser = () => {
    localStorage.removeItem("editUser");
    navigate("/Veterinarian");
  };

  const featuredUser = users[0];

  return (
    <>
    <PetChatbot />
    <LiveLocation />
    <Nav/>
    <main className="veterinarian-page">

      <section className="veterinarian-hero">

        <video
          className="veterinarian-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src={vid}
            type="video/mp4"
          />
        </video>

        <div className="veterinarian-hero-overlay"></div>

        <div className="veterinarian-hero-content">

          <div className="veterinarian-hero-left">
            <span className="veterinarian-eyebrow">
              VETERINARY CARE
            </span>

            <h1>
              Exceptional care
              <em>for every companion.</em>
            </h1>

            <p>
              Manage your pet's veterinary care
              information in one beautiful place.
            </p>

            <button
              className="veterinarian-add-btn"
              onClick={addNewUser}
            >
              <span>+ Add New</span>
              <b>↗</b>
            </button>
          </div>

          {featuredUser && (
            <div className="veterinarian-doctor-card">

              <span className="doctor-card-label">
                YOUR VETERINARIAN
              </span>

              <div className="doctor-card-line"></div>

              <div className="doctor-card-content">

                <div className="doctor-card-image">
                  <img
                    src={featuredUser.image}
                    alt={featuredUser.name}
                  />
                </div>

                <div className="doctor-card-info">
                  <span>DR.</span>

                  <h2>
                    {featuredUser.name}
                  </h2>

                  <p>
                    {featuredUser.doctorType}
                  </p>

                  <small>
                    SPECIALIST
                  </small>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="hero-bottom-info">
          <span>PREMIUM VETERINARY CARE</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>

      </section>

      <section className="veterinarian-profiles">

        <div className="profiles-heading">

          <div>
            <span className="profiles-eyebrow">
              OUR PROFILES
            </span>

            <h2>
              Veterinarian
              <em>profiles.</em>
            </h2>
          </div>

          <p>
            Keep your veterinary information
            organized and easily accessible.
          </p>

        </div>

        <div className="cards-container">

          {users.map((user, idx) => (
            <Pic
              key={idx}
              name={user.name}
              age={user.age}
              image={user.image}
              doctorType={user.doctorType}
              deleteUser={() => deleteUser(idx)}
              updateUser={() => updateUser(idx)}
            />
          ))}

        </div>

      </section>
      <AppointmentSlots/>
      <EmergencyDirectory />
    </main>
    <Footer/>
    </>
  );
};

export default DisplayUsers;