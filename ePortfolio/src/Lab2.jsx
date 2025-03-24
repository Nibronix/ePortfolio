import { useState, useEffect } from 'react';
import './App.css'
import Footer from './Footer.jsx'
import Nav from './Nav.jsx'
import './Lab2.css'

function Lab2() {
    const [showGradient, setShowGradient] = useState(false);
    const [guess, setGuess] = useState("");
    const [targetNumber] = useState(Math.floor(Math.random() * 99) + 1); // Random number between 1 and 99
    const [message, setMessage] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [gameEnd, setGameEnd] = useState(false);
    const [attemptsArray, setAttemptsArray] = useState([]);

    const [wins, setWins] = useState(() => {
        const storedWins = sessionStorage.getItem('Wins');
        return storedWins ? parseInt(storedWins) : 0;
    });

    const [losses, setLosses] = useState(() => {
        const storedLosses = sessionStorage.getItem('Losses');
        return storedLosses ? parseInt(storedLosses) : 0;
    });

    useEffect(() => {
        sessionStorage.setItem('Wins', wins.toString());
        sessionStorage.setItem('Losses', losses.toString());
    }, [wins, losses]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);  

    const handleGuess = (e) => {
        e.preventDefault();
        const userGuess = parseInt(guess);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 99) {
            setMessage("Please enter a number between 1 and 99 🐟");
            return;
        }

        if (attemptsArray.includes(userGuess)) {
            setMessage("You already guessed that number 🐢")
            setGuess("");
            return;
        }

        setAttempts(prev => prev + 1);
        setAttemptsArray(prev => [...prev, userGuess]);

        if (userGuess === targetNumber) {
            setMessage(<span style={{color: 'green'}}>🎉 Congrats!! 🎉 You guessed the number in {attempts + 1} attempts!</span>)
            setWins(wins + 1);
            setGameEnd(true);
        
        } else if (attempts >= 6) {
            setMessage(<span style={{color: 'red'}}>You lost! The number was {targetNumber} 🐷</span>)
            setLosses(losses + 1);
            setGameEnd(true);

        } else if (userGuess < targetNumber) {
            setMessage("Too low! Try again! 🐠");

        } else {
            setMessage("Too high! Try again! 🐟");
        }         

        setGuess("");
    };

    const handleReset = () => {
        window.location.reload();
        setAttemptsArray([]);
    };

    return (
        <>
            {showGradient && <div className="gradient-background-lab2" />}
            <Nav />
            <div className="content" style={{ display: 'grid'}}>
                <h1 className="fade-in" style={{marginTop: '0vh'}}>Lab 2<br/>Guess the Number</h1>

                <div className="Lab2-container" style={{ marginTop: '0vh' , marginBottom: '10vh' }}>
                    <p className="fade-in delay-1s">🦈 Guess a number between 1 and 99 🦭
                    </p>

                        <form onSubmit={handleGuess}>
                            <input
                                type="text"
                                className="Lab2-text-field fade-in delay-2s"
                                placeholder="🐳"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value)}
                                disabled={gameEnd}
                            />
                            {!gameEnd ? (
                                <button
                                type="submit"
                                className="Lab2-guess-button fade-in delay-2s"
                                disabled={gameEnd}
                            >
                                Guess
                            </button>
                            ) : (
                                <button
                                type="button"
                                className="Lab2-guess-button fade-in delay-2s"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                            )}
                        </form>

                        {attempts > 0 && (
                            <>
                                <p className="fade-in">
                                {attemptsArray.join(', ')}
                                </p>
                                <p className="fade-in">
                                    Attempts: {attempts}
                                </p>
                            </>
                        )}

                        {message && (
                            <p className="fade-in">
                                {message}
                            </p>
                        )}

                        <div className="Lab2-score fade-in delay-2s">
                            <p>{wins} {wins === 1 ? 'Win' : 'Wins'}</p>            
                            <p>{losses} {losses === 1 ? 'Loss' : 'Losses'}</p>
                        </div>
                
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Lab2;
