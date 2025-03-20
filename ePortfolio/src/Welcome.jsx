import { useEffect, useState } from 'react';
import './App.css';
import Footer from './footer.jsx';
import Nav from './Nav.jsx';

function Welcome() {
    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {
        const timerID = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        const timeoutID = setTimeout(() => {
            window.location.href = '/';
        }, 5000);

        return () => {
            clearInterval(timerID);
            clearTimeout(timeoutID);
        }
    }, []);

    return (
        <>
            <Nav />
            <div className="content">
                <h1 className="fade-in" style={{ marginTop: "5rem" }}>Welcome! Thank you for signing up.</h1>
                <p className="fade-in">You will be redirected to the home page in {timeLeft} seconds.</p>
            </div>
            <Footer />
        </>
    );
}

export default Welcome;