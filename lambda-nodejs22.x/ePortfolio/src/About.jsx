import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'

function About() {
    const [showGradient, setShowGradient] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // TODO: Finish this
    return (
        <> 
        {showGradient && <div className="gradient-background" />}
        <Nav />
        <div className = "content">
            <h1 className = "fade-in">About Me</h1>

            <div className = "about-content fade-in delay">
                <h2 className = "fade-in delay-2s"
            </div>
        </div>
    )
}