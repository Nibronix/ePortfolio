import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Crunch from './assets/Crunch.jpg'
import Nav from './Nav.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './About.jsx'
import Contact from './Contact.jsx'
import Hw1 from './Hw1.jsx'
import Hw1_1 from './Hw1_1.jsx'
import Hw1_2 from './Hw1_2.jsx'
import Hw1_3 from './Hw1_3.jsx'
import Lab2 from './Lab2.jsx'
import Hw2 from './Hw2.jsx'
import Signup from './Signup.jsx'
import Welcome from './Welcome.jsx'
import Hw3 from './Hw3.jsx'

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
      <div>
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
        <Route path="/hw1_2" element={<Hw1_2 />} />
        <Route path="/hw1_3" element={<Hw1_3 />} />
        <Route path="/lab2" element={<Lab2 />} />
        <Route path="/hw2" element={<Hw2 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/hw3" element={<Hw3 />} />
      </Routes>
    </Router>
  );
}

export default App
