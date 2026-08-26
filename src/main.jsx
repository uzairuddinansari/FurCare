import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import "./App.css"
import "./assets/fonts/Sentient_Complete/Sentient_Complete/Fonts/WEB/css/sentient.css"

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
)
