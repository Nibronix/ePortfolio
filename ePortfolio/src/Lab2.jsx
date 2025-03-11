import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'
import './Lab2.css'

function Lab2() {
    const [showGradient, setShowGradient] = useState(false);
    const [guess, setGuess] = useState(0);
    const [targetNumber] = useState(Math.floor(Math.random() * 99) + 1); // Random number between 1 and 99
    const [message, setMessage] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [gameWon, setGameWon] = useState(false);

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

        setAttempts(prev => prev + 1);

        if (userGuess === targetNumber) {
            setMessage(`Congratulations! You guessed the number in ${attempts + 1} attempts! 🎉`);
            setGameWon(true);

        } else if (userGuess < targetNumber) {
            setMessage("Too low! Try again! 🐠");

        // TODO: Fix this
        } else if (attempts === 6) {
            setMessage("You lost! The number was " + targetNumber + " 🐷");
            setGameWon(true);
        } else {
            setMessage("Too high! Try again! 🐟");
        }

        useEffect(() => {
            if (gameWon) {
              const resetTimer = setTimeout(() => {
                resetGame();
              }, 3000);
              
              return () => clearTimeout(resetTimer);
            }
          }, [gameWon]);            

        setGuess("");
    };

    const resetGame = () => {
        window.location.reload();
    }

    return (
        <>
            {showGradient && <div className="gradient-background-lab2" />}
            <Nav />
            <div className="content" style={{ display: 'grid'}}>
                <h1 className="fade-in" style={{marginTop: '-30vh'}}>Lab 2<br/>Guess the Number</h1>

                <div style={{ marginTop: '-10vh' , marginBottom: '20vh' }}>
                    <p className="fade-in delay-1s" style={{ fontSize: '24px' }}>Guess a number between 1 and 99! 🦭
                    </p>

                        <form onSubmit={handleGuess} className="Lab2-container">
                            <input
                                type="text"
                                className="Lab2-text-field fade-in delay-2s"
                                placeholder="🐳"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value)}
                                disabled={gameWon}
                            />
                            <button
                                type="submit"
                                className="Lab2-guess-button fade-in delay-2s"
                                style={{}}
                            >
                                Guess
                            </button>
                        </form>

                        {attempts > 0 && (
                            <p className="fade-in" style={{  }}>
                                Attempts: {attempts}
                            </p>
                        )}

                        {message && (
                            <p className="fade-in" style={{  }}>
                                {message}
                            </p>
                        )}
                
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Lab2;
