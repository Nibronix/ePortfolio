import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer'

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
      </div>
      <Footer />
    </>
  );
}

export default App
