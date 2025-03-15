import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'
import VR_Headset from './assets/VR_Headset.png'
import './Hw2.css'

function Hw2() {
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
            {showGradient && <div className="gradient-background-hw2" />}
            <Nav />
            <div className="content">
                <h1 className="fade-in" style={{marginTop: "5rem"}}>Homework 2 <br/>A US Geography Quiz</h1>

                <div className="fade-in delay-1s" style={{marginTop: "2rem"}}>
                    

                </div>

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
            </div>
            <Footer />
        </>
    );
}

export default Hw2;
