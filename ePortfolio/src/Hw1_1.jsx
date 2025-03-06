import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'
import VirtualBoy from './assets/VirtualBoy.jpg'

function Hw1_1() {    const [showGradient, setShowGradient] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const BackButton = () => {
        window.location.href = '/hw1';
    };

    return (
        <>
            {showGradient && <div className="gradient-background-hw1" />}
            <Nav />
            <div className="content">
                <h1 className="fade-in" style={{marginTop: "20rem"}}>Virtual Reality <br/>History</h1>

                <div className="VR-button-container">
                    <button 
                        className="VR-button-container"
                        onClick={BackButton}
                        style={{
                            position: 'relative',
                            marginTop: '2rem',
                            display: 'block',
                            margin: '2rem auto',
                            width: '10rem'
                        }}
                        >
                        BACK
                        </button>
                </div>

                <p className="fade-in delay-1s" style={{ fontSize: '24px' }}>No company has made such an explosive introduction to Virtual Reality 
                    than Nintendo did back in 1995 with the release of the Virtual Boy. A 32-bit tabletop console that showcased a dynamic 3D experience.
                </p>

                <img
                    src = {VirtualBoy}
                    alt = "A legendary contender..."
                    className = "fade-in delay-2s"
                    style = {{ width: '30%', height: 'auto', borderRadius: '10px', marginLeft: '-30rem', marginTop: '2rem'}}
                />

                <p className="fade-in delay-2s" style={{width: '40%', marginLeft: '35rem', marginTop: '-20rem', fontSize: '20px', marginBottom: '10rem'}}>
                    The Virtual Boy was Nintendo's first console capable of displaying "true 3D" graphics. Using a parallax effect, 
                    the console created the illusion of depth, but only being able to display in red and black colors. While it was revolutionary,
                    Nintendo's Virtual Boy was a commercial failure.
                </p>                                
                
                <div className="contact-container fade-in delay">
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Hw1_1;
