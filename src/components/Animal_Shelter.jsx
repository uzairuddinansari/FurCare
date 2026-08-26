import AdoptablePets from "./AdoptablePets"
import PetChatbot from "./Chatbot"
import Events from "./Events"
import Footer from "./Footer"
import LiveLocation from "./livelocation"
import ShelterHero from "./ShelterHero"
import SuccessStories from "./Stories"



const Animal_Shelter = () => {
  return (
    <>
    <PetChatbot />
    <LiveLocation />
    <ShelterHero />
     <AdoptablePets />
     <Events />
     <SuccessStories />
     <Footer />
    </>
  )
}

export default Animal_Shelter
