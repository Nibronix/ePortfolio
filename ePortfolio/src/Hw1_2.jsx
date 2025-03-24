import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'
import VR_Stuff from './assets/VR_Stuff.jpg'
import VR_Stuff2 from './assets/VR_Stuff2.jpg'

function Hw1_2() {    const [showGradient, setShowGradient] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const BackButton = () => {
        window.location.href = '/hw1';
    };

    const SourceButton = () => {
        window.location.href = 'https://www.testdevlab.com/blog/the-state-of-virtual-reality-in-2023';
    }

    return (
        <>
            {showGradient && <div className="gradient-background-hw1" />}
            <Nav />
            <div className="content" style={{ display: 'grid'}}>
                <h1 className="fade-in" style={{marginTop: '100vh'}}>Virtual Reality <br/>Today's World</h1>

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

                <div>
                    <p className="fade-in delay-1s" style={{ fontSize: '24px' }}>As of 2023, the VR technology has grew to 170 million people worldwide. 
                    </p>

                    <img
                        src = {VR_Stuff}
                        alt = "A man playing VR"
                        className = "fade-in delay-2s"
                        style = {{ width: '50%', height: 'auto', borderRadius: '10px', marginTop: '2vh', marginBottom: '2vh'}}
                    />

                    <p className="fade-in delay-2s" style={{ fontSize: '24px' }}>
                        From headsets, controllers, gloves, and full-body trackers, VR technology has come a long way from its beginnings.
                        Many industries have adopted VR for their own purposes, mainly to improve user experience and streamline work.
                    </p>
                </div>

                <div>
                    <img
                        src = {VR_Stuff2}
                        alt = "Another dude playing VR"
                        className = "fade-in delay-2s"
                        style = {{ width: '50%', height: 'auto', borderRadius: '10px', marginLeft: '30rem', marginTop: '10vh'}}
                    />

                    <p className="fade-in delay-2s" style={{width: '40%', marginLeft: '5vh', marginTop: '-30vh', fontSize: '20px', marginBottom: '30vh'}}>
                        According to a PWC report, around 23 million jobs will be enhanced by VR by 2030, delivering a $1.81 trillion boost to the global economy.
                        While VR technology is still considered fairly niche, the technology is expected grow in the next coming decades.
                    </p>
                </div>
                

                <div className="VR-button-container">
                    <button 
                        className="VR-button-container"
                        onClick={SourceButton}
                        style={{
                            position: 'relative',
                            display: 'block',
                            margin: '2rem auto',
                            width: '10rem'
                        }}
                        >
                        SOURCE
                        </button>
                </div>
                
            </div>
            <Footer />
        </>
    );
}

export default Hw1_2;
