import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'
import VR_Headset from './assets/VR_Headset.png'

function Hw1() {
    const [showGradient, setShowGradient] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const HistoryButton = () => {
        window.location.href = '/hw1_1';
    };

    const TodayButton = () => {
        window.location.href = '/hw1_2';
    };

    const FutureButton = () => {
        window.location.href = '/hw1_3';
    };

    return (
        <>
            {showGradient && <div className="gradient-background-hw1" />}
            <Nav />
            <div className="content">
                <h1 className="fade-in" style={{marginTop: "5rem"}}>Homework 1 <br/>Virtual Reality</h1>

                <img
                        src = {VR_Headset}
                        alt = "Wow!"
                        className = "fade-in delay-2s"
                        style = {{ width: '20%', height: 'auto', borderRadius: '10px', marginTop: '2vh', marginBottom: '2vh'}}
                    />

                <p className="fade-in delay-1s" style={{ fontSize: '24px' }}>Virtual Reality (VR) is a technology that emphasizes on immersing users
                    in digital environments, fundamentally changing the way users interact with content. While VR has been around for years, the last 
                    decade has shown a resurgence in the technology.
                </p>

                <div className="VR-button-container">

                    <button
                        onClick={HistoryButton}
                        className="fade-in delay-2s"
                        style={{
                            marginLeft: '0rem'
                        }}>
                            HISTORY
                    </button>

                    <button
                        onClick={TodayButton}
                        className="fade-in delay-2s"
                        style={{
                            marginCenter: 'auto'
                        }}>
                            TODAY'S WORLD
                    </button>

                    <button
                        onClick={FutureButton}
                        className="fade-in delay-2s"
                        >
                            FOVEATED RENDERING
                    </button>

                </div>

                <div className="contact-container fade-in delay">
                    
                
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Hw1;
