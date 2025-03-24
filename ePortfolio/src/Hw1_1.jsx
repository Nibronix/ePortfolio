import { useState, useEffect } from 'react';
import './App.css'
import Footer from './Footer.jsx'
import Nav from './Nav.jsx'
import VirtualBoy from './assets/VirtualBoy.jpg'
import Stereoscopic from './assets/Stereoscopic.jpg'
import Sword from './assets/Sword.jpg'
import Oculus from './assets/Oculus.jpg'

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

    const SourceButton = () => {
        window.location.href = 'https://www.vrs.org.uk/virtual-reality/history.html';
    }

    return (
        <>
            {showGradient && <div className="gradient-background-hw1" />}
            <Nav />
            <div className="content" style={{ display: 'grid'}}>
                <h1 className="fade-in" style={{marginTop: '200vh'}}>Virtual Reality <br/>History</h1>

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
                    <p className="fade-in delay-1s" style={{ fontSize: '24px' }}>Virtural Reality began with the introduction of stereoscopic photos
                        back in 1838, when Charles Wheatstone's research demonstrated that the brain processes two different 2D images into a single
                        3D image.
                    </p>

                    <img
                        src = {Stereoscopic}
                        alt = "A stereoscopic image"
                        className = "fade-in delay-2s"
                        style = {{ width: '50%', height: 'auto', borderRadius: '10px', marginTop: '2vh', marginBottom: '2vh'}}
                    />

                    <p className="fade-in delay-2s" style={{ fontSize: '24px' }}>
                        Over time, scientists and engineers have developed many devices to simulate a virtual environment. But the concept of virtual reality began
                        to really take off in the 1900s with the introduction of computers.
                    </p>
                </div>

                <div>
                    <img
                        src = {Sword}
                        alt = "A horror device"
                        className = "fade-in delay-2s"
                        style = {{ width: '50%', height: 'auto', borderRadius: '10px', marginLeft: '30rem', marginTop: '10vh'}}
                    />

                    <h2 className="fade-in delay-2s" style={{width: '40%', marginLeft: '5vh', marginTop: '-40vh', fontSize: '20px'}}>
                        1968
                    </h2>
                    <p className="fade-in delay-2s" style={{width: '40%', marginLeft: '5vh', marginTop: '5vh', fontSize: '20px', marginBottom: '30vh'}}>
                        The Sword of Damocles was the first VR device that connected to a computer. It was absolutely huge and heavy, thus it was suspended from 
                        the ceiling. The computer graphics were wireframe rooms and objects.
                    </p>
                </div>
                
                <div>
                    <img
                        src = {VirtualBoy}
                        alt = "A legendary contender..."
                        className = "fade-in delay-2s"
                        style = {{ width: '30%', height: 'auto', borderRadius: '10px', marginLeft: '-80vh', marginTop: '2vh'}}
                    />

                    <div>
                        <h2 className="fade-in delay-2s" style={{width: '40%', marginLeft: '70vh', marginTop: '-50vh', fontSize: '20px'}}>
                            1995
                        </h2>

                        <p className="fade-in delay-2s" style={{width: '40%', marginLeft: '70vh', marginTop: '5vh', fontSize: '20px', marginBottom: '30vh'}}>
                            The Virtual Boy was Nintendo's first console capable of displaying "true 3D" graphics. Using a parallax effect, 
                            the console created the illusion of depth, but only being able to display in red and black colors. While it was revolutionary,
                            Nintendo's Virtual Boy was a commercial failure.
                        </p>
                    </div>
                </div>

                <div>
                    <img
                        src = {Oculus}
                        alt = "The first commercial success"
                        className = "fade-in delay-2s"
                        style = {{ width: '40%', height: 'auto', borderRadius: '10px', marginLeft: '75vh', marginTop: '2vh'}}
                    />

                    <div>
                        <h2 className="fade-in delay-2s" style={{width: '40%', marginLeft: '10vh', marginTop: '-35vh', fontSize: '20px'}}>
                            2012
                        </h2>

                        <p className="fade-in delay-2s" style={{width: '40%', marginLeft: '10vh', marginTop: '5vh', fontSize: '20px', marginBottom: '30vh'}}>
                            Palmer Lucky launched a Kickstarter campaign to fund the development and product of his VR headset, the Oculus Rift. His campaign
                            raised 2.5 million dollars, marking a clear divide between the commercial failures of the past and a new age for Virtual Reality.
                        </p>
                    </div>
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

export default Hw1_1;
