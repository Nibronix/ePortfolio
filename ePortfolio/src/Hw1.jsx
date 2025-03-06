import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'

function Hw1() {
    const [showGradient, setShowGradient] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showGradient && <div className="gradient-background-hw1" />}
            <Nav />
            <div className="content">
                <h1 className="fade-in" style={{marginTop: "-10rem"}}>Homework 1 <br/>Virtual Reality</h1>

                <p className="fade-in delay-1s" style={{ fontSize: '24px' }}>Virtual Reality (VR) is a technology that emphasizes on immersing users
                    in digital environments, fundamentally changing the way users interact with content. While VR has been around for years, the last 
                    decade has shown a resurgence in the technology.
                </p>

                

                <div className="contact-container fade-in delay">
                    
                
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Hw1;
