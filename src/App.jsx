import { Route, Routes } from "react-router-dom"; 
import Main_login from "./components/main_login"; 
import Petowner from "./components/Petowner"; 
import Veterinarian from "./components/Veterinarian"; 
import Animal_Shelter from "./components/Animal_Shelter"; 
import Veterinarian_page from "./components/Veterinarian_page"; 
import "./App.css"; 
import Pet_owner_page from "./components/pet_owner_page"; 
import Feedback from "./components/feedback"; 
import Product from "./components/Product"; 
import Healt from "./components/Healt"; 
import NotFound from "./components/NotFound"; 
import FurCareLoader from "./components/FurcareLoader"; 
import { useEffect, useRef, useState } from "react"; 
import Lenis from "lenis"; 
import gsap from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import PageToast from "./components/Toaster"; 
import Checkout from "./components/Checkout"; 
import VoiceAssistant from "./components/voiceassistant";
 
gsap.registerPlugin(ScrollTrigger); 
 
const App = () => { 
  const lenisRef = useRef(null); 
 
  const [loading, setLoading] = useState(() => { 
    return localStorage.getItem("furcare-loader-seen") !== "true"; 
  }); 
 
  useEffect(() => { 
    const isMobile = window.matchMedia("(max-width: 850px)").matches; 
 
    if (isMobile) { 
      document.documentElement.classList.add("mobile-native-scroll"); 
      document.body.classList.add("mobile-native-scroll"); 
 
      return () => { 
        document.documentElement.classList.remove("mobile-native-scroll"); 
        document.body.classList.remove("mobile-native-scroll"); 
      }; 
    } 
 
    const lenis = new Lenis({ 
      duration: 1.15, 
      smoothWheel: true, 
      smoothTouch: false, 
      wheelMultiplier: 0.85, 
      touchMultiplier: 1, 
      syncTouch: false 
    }); 
 
    window.lenis = lenis; 
    lenisRef.current = lenis; 
 
    const raf = (time) => { 
      lenis.raf(time * 1000); 
    }; 
 
    gsap.ticker.add(raf); 
    gsap.ticker.lagSmoothing(0); 
 
    if (loading) { 
      lenis.stop(); 
    } 
 
    return () => { 
      gsap.ticker.remove(raf); 
      lenis.destroy(); 
      window.lenis = null; 
      lenisRef.current = null; 
    }; 
  }, [loading]); 
 
  const handleLoaderComplete = () => { 
    localStorage.setItem("furcare-loader-seen", "true"); 
    setLoading(false); 
 
    requestAnimationFrame(() => { 
      if (lenisRef.current) { 
        lenisRef.current.start(); 
      } 
 
      ScrollTrigger.refresh(); 
    }); 
  }; 
 
  return ( 
    <> 
      {loading && ( 
        <FurCareLoader onComplete={handleLoaderComplete} /> 
      )} 
      
     <PageToast /> 
      <Routes> 
        <Route path="/" element={<Main_login />} /> 
        <Route path="/Petowner" element={<Petowner />} /> 
        <Route path="/Veterinarian" element={<Veterinarian />} /> 
        <Route path="/Veterinarian/page" element={<Veterinarian_page />}/> 
        <Route path="/Animal_Shelter" element={<Animal_Shelter />}/> 
        <Route path="/Pet_owner_home" element={<Pet_owner_page />}/> 
        <Route path="/Pet_owner_feedback" element={<Feedback />}/> 
        <Route path="/Pet_owner_products" element={<Product />} /> 
        <Route path="/Pet_owner_health" element={<Healt />}/> 
        <Route path="/Pet_owner_Checkout" element={<Checkout />}/> 
        <Route path="*" element={<NotFound />} /> 
      </Routes> 
      <VoiceAssistant /> 
    </> 
  ); 
}; 
 
export default App;