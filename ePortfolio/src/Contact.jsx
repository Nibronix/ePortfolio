import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'

function Contact() {
    const [showGradient, setShowGradient] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
        {showGradient && <div className="gradient-background-contact" />}
        <Nav />
        <div className="content">
            <h1 className="fade-in" style={{marginTop: "-5rem"}}>Contact Me</h1>
            <div className="contact-container fade-in delay">
                <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLScV1I6U6VQKEiM-dfnXQC4HGeLeTtm_WXetJifBXxRZzoPQZQ/viewform?usp=header"
                    width="640" 
                    height="800" 
                    className="contact-form"
                >
                    Loading…
                </iframe>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Contact;
