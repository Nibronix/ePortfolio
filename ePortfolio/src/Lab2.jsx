import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'

function Lab2() {    const [showGradient, setShowGradient] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showGradient && <div className="gradient-background-lab2" />}
            <Nav />
            <div className="content" style={{ display: 'grid'}}>
                <h1 className="fade-in" style={{marginTop: '-30vh'}}>Lab 2<br/>Guess the Number</h1>

                <div style={{ marginTop: '-10vh' , marginBottom: '20vh' }}>
                    <p className="fade-in delay-1s" style={{ fontSize: '24px' }}>Guess a number between 1 and 99! 🦭
                    </p>

                    <input
                        type="text"
                        className="Lab2-text-field fade-in delay-2s"
                        placeholder="🐳 Type your guess here 🐬"
                        />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Lab2;
