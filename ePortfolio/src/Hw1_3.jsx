import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'
import FOV from './assets/FOV.jpg'
import FOV2 from './assets/FOV2.jpg'

function Hw1_3() {    const [showGradient, setShowGradient] = useState(false);

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
        window.location.href = 'https://www.tobii.com/blog/what-is-foveated-rendering';
    }

    return (
        <>
            {showGradient && <div className="gradient-background-hw1" />}
            <Nav />
            <div className="content" style={{ display: 'grid'}}>
                <h1 className="fade-in" style={{marginTop: '100vh'}}>Virtual Reality <br/>Foveated Rendering</h1>

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
                    <p className="fade-in delay-1s" style={{ fontSize: '24px' }}>Foveated rendering is a modern technique for VR devices that
                        allows high-resolution rendering for the focused area of the user's vision, while reducing the resolution of the peripheral areas.
                    </p>

                    <img
                        src = {FOV}
                        alt = "A VR device and an eye"
                        className = "fade-in delay-2s"
                        style = {{ width: '80%', height: 'auto', borderRadius: '10px', marginTop: '2vh', marginBottom: '2vh'}}
                    />

                    <p className="fade-in delay-2s" style={{ fontSize: '24px' }}>
                        VR applications are more realistic when rendering at high FPS and high resolution.
                         With the help of dynamic resolutions and upscaling/downscaling technologies, foveated rendering can significantly improve performance
                        for VR applications.
                    </p>
                </div>

                <div>
                    <img
                        src = {FOV2}
                        alt = "Dynamic foveated rendering"
                        className = "fade-in delay-2s"
                        style = {{ width: '50%', height: 'auto', borderRadius: '10px', marginRight: '35rem', marginTop: '10vh'}}
                    />

                    <p className="fade-in delay-2s" style={{width: '40%', marginLeft: '80vh', marginTop: '-40vh', fontSize: '20px', marginBottom: '30vh'}}>
                        While many VR devices have "static" foveated rendering, where the main focal point is fixed at the center of the lenses, a more 
                        intuitive approach is dynamic foveated rendering, where the focal point is adjusted based on the user's eyes. Newer VR devices like
                        the Apple Vision Pro support dynamic foveated rendering, supporting a crisp and clear view of the digital environment.
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

export default Hw1_3;
