import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'

function About() {
    const [showGradient, setShowGradient] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <> 
        {showGradient && <div className="gradient-background-about" />}
        <Nav />
        <div className = "content">
            <h1 className="fade-in" style={{marginTop: "0rem"}}>About Me</h1>
            <div className = "about-content fade-in delay">
                <h2 className = "fade-in delay-1s">
                    My name is Nicholas Marolla. I'm a student in CSU Monterey Bay majoring in Computer Science and wannabe software developer. 
                     I enjoy all things tech related, diving in from an obsessive interest in video games.

                </h2>

        <div className="table-interests-container fade-in delay-2s">
            <table className="games-table fade-in delay-3s">
                <thead>
                    <tr>
                        <th>Favorite Games</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Undertale</td>
                    </tr>
                    <tr>
                        <td>Final Fantasy XIV</td>
                    </tr>
                    <tr>
                        <td>Skyrim</td>
                    </tr>
                    <tr>
                        <td>Baldur's Gate 3</td>
                    </tr>
                    <tr>
                        <td>Risk of Rain 1 and 2</td>
                    </tr>
                    <tr>
                        <td>Hades</td>
                    </tr>
                    <tr>
                        <td>Persona 5</td>
                    </tr>
                </tbody>
            </table>

            <div className="interests-section fade-in delay-4s">
                <h2>My Interests</h2>
                <ul>
                    <li>Video Games</li>
                    <li>Programming</li>
                    <li>Lifting</li>
                    <li>Reading</li>
                    <li>Cooking</li>
                    <li>Coffee</li>
                </ul>
            </div>
        </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default About;