import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer'
import Crunch from './assets/Crunch.jpg'

function App() {
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
      <div className="content">
        <h1 className="fade-in">Hello!</h1>
        <p className="fade-in delay">I'm Nicholas Marolla, a student at CSU Monterey Bay.</p>
        <p className="fade-in delay-4s" style = {{ marginTop: '5rem'}}>Cat tax.</p>
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

export default App
