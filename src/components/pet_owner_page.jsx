import React, { useState ,useEffect} from 'react'
import Nav2 from './Nav2';
import PetProfile from './PetProfile';
import Grooming from './Grooming';
import Footer from './Footer';
import Contact from './contact';
import LiveLocation from './livelocation';
import PetChatbot from './Chatbot';


const Pet_owner_page = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const savedUsers = localStorage.getItem("petData");
  
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      }
    }, []);

  console.log((users.Age));
  
  return (
    <>
    <PetChatbot />
    <LiveLocation />
    <Nav2 />
    <PetProfile />
    <Grooming />
    <Contact />
    <Footer />
    </>
  )
}

export default Pet_owner_page
