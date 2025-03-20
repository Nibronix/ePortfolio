import { useEffect } from 'react';
import './App.css';
import Footer from './footer.jsx';
import Nav from './Nav.jsx';

function Hw1() {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = '/';
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Nav />
            <div className="content">
                <h1 className="fade-in" style={{ marginTop: "5rem" }}>Welcome! Thank you for signing up.</h1>
            </div>
            <Footer />
        </>
    );
}

export default Hw1;