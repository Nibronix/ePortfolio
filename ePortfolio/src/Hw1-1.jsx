import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'
import VirtualBoy from './assets/VirtualBoy.jpg'

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
                <h1 className="fade-in" style={{marginTop: "-10rem"}}>Virtual Reality <br/>History</h1>

                <p className="fade-in delay-1s" style={{ fontSize: '24px' }}>No company has made such an explosive introduction to Virtual Reality 
                    than Nintendo did back in 1995 with the release of the Virtual Boy. A 32-bit tabletop console that showcased a dynamic 3D experience.
                </p>

                <img
                    src = {VirtualBoy}
                    alt = "My Latina Princess"
                    className = "fade-in delay-4s"
                    style = {{ width: '30%', height: 'auto', borderRadius: '10px'}}
                />
                
                <div className="contact-container fade-in delay">
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Hw1;
