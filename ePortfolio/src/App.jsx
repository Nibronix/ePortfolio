import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer'
import Crunch from './assets/Crunch.jpg'
import Nav from './Nav.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './About.jsx'
import Contact from './Contact.jsx'
import Hw1 from './hw1.jsx'
import Hw1_1 from './Hw1_1.jsx'

function Home() {
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGradient(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showGradient && <div className="gradient-background" />}
      <Nav />
      <div className="content">
        <h1 className="fade-in">Hello!</h1>
        <p className="fade-in delay" style={{ fontSize: '24px' }}>Welcome to my website. I'm Nicholas Marolla, a student at CSU Monterey Bay.</p>
        <p className="fade-in delay-4s" style={{ marginTop: '5rem', fontSize: '16px' }}>Cat tax.</p>
        <img
          src = {Crunch}
          alt = "My Latina Princess"
          className = "fade-in delay-4s"
          style = {{ width: '30%', height: 'auto', borderRadius: '10px'}}
        />
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hw1" element={<Hw1 />} />
        <Route path="/hw1_1" element={<Hw1_1 />} />
      </Routes>
    </Router>
  );
}

export default App
