import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'
import './Hw2.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { choiceQuestions, blankQuestions, trueFalseQuestions, matchingQuestions } from './Hw2_questions.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Xarrow from 'react-xarrows';

function Hw2() {
    const [showGradient, setShowGradient] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizEnded, setQuizEnded] = useState(false);
    const [questions, setQuestions] = useState([]);
    
    // For the final matching question
    const [connections, setConnections] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [shuffledCities, setShuffledCities] = useState([]);

    const handleMatch = (state, city) => {
        const newConnections = connections.filter(conn => conn.state !== state);

        newConnections.push({ state, city });
        setConnections(newConnections);
        setSelectedState(null);

        // Once all states are connected, check for answer
        const currentQ = questions[currentQuestion];
        if (newConnections.length === currentQ.options.length) {
            const answer = newConnections.map(conn => ({
                state: conn.state,
                match: conn.city
            }));
            handleAnswer(answer);
        }
    }
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const shuffledChoice = [...choiceQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
        const shuffledBlank = [...blankQuestions].sort(() => Math.random() - 0.5).slice(0, 2);
        const shuffledTrueFalse = [...trueFalseQuestions].sort(() => Math.random() - 0.5).slice(0, 2);
        const matchingQuestion = matchingQuestions[0];

        const initialQuestions = [
            ...shuffledChoice,
            ...shuffledBlank,
            ...shuffledTrueFalse,
            matchingQuestion
        ].slice(0, 10);

        setQuestions(initialQuestions);

        const shuffledCities = [...matchingQuestion.options]
            .map(item => item.city)
            .sort(() => Math.random() - 0.5);

        setShuffledCities(shuffledCities);
    }, []);

    const startQuiz = () => {
        setQuizStarted(true);
    };

    const handleAnswer = (answer) => {
        const currentQ = questions[currentQuestion];
        let isCorrect = false;

        // Questions Order:
        // 1-5: Multiple Choice
        // 6-7: True/False
        // 8-9: Fill in the Blank
        // 10: Matching
        if (currentQuestion < 5) {
            isCorrect = answer === currentQ.answer;
        } else if (currentQuestion < 7) {
            isCorrect = answer.toLowerCase() === currentQ.answer.toLowerCase();
        } else if (currentQuestion < 9) {
            isCorrect = answer === currentQ.answer;
        } else {
            isCorrect = answer.every((pair, index) =>
                pair.match === currentQ.answer[index].match);
        }

        if (isCorrect) setScore(score + 1);

        if (currentQuestion === questions.length - 1) {
            setQuizEnded(true);
        } else {
            setCurrentQuestion(currentQuestion + 1);
            setConnections([]);
        }
    };

    const renderQuestion = () => {
        const currentQ = questions[currentQuestion];

        // First 5 questions are multiple choice
        if (currentQuestion < 5) {
            return (
                <div className="card p-4">
                    <h4 className="mb-4">Question: {currentQuestion + 1}</h4>
                    <p className="mb-3">{currentQ.question}</p>

                    <div className="d-grid gap-2">
                        {currentQ.options.map((option, index) => (
                            <button
                                key={index}
                                className="btn btn-primary"
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            );

        // Questions 6-7 are fill in the blank
        } else if (currentQuestion < 7) {
            return (
                <div className="card p-4">
                    <h4 className="mb-4">Question: {currentQuestion + 1}</h4>
                    <p className="mb-3">{currentQ.question}</p>

                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="🐁"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleAnswer(e.target.value);
                                }
                            }}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                const input = e.target.previousElementSibling;
                                handleAnswer(input.value);
                            }}
                        >
                            ➡️
                        </button>
                    </div>
                </div>
            );

        // Questions 8-9 are true/false
        } else if (currentQuestion < 9) {
            return (
                <div className="card p-4">
                    <h4 className="mb-4">Question {currentQuestion + 1}</h4>
                    <p className="mb-3">{currentQ.question}</p>

                    <div className="d-grid gap-2">
                        <button
                            className="btn btn-outline-success"
                            onClick={() => handleAnswer(true)}
                        >
                            True
                        </button>
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => handleAnswer(false)}
                        >
                            False
                        </button>
                    </div>
                </div>
            );
        // Final (10th) question is a matching.
        } else {
            return (
                <div className="card p-4">
                    <h4 className="mb-4">Question {currentQuestion + 1}</h4>
                    <p className="mb-3">{currentQ.question}</p>

                    <DndProvider backend={HTML5Backend}>
                        <div className="matching-container">
                            <div className="matching-columns">
                                <div className="states-column">
                                    {currentQ.options.map((item, index) => (
                                        <div
                                            id={`state-${item.state}`}
                                            key={`state-${index}`}
                                            className={`state-item ${selectedState === item.state ? 'selected' : ''}`}
                                            onClick={() => setSelectedState(item.state)}
                                        >
                                            {item.state}
                                        </div>
                                    ))}
                                </div>

                                <div className="cities-column">
                                    {shuffledCities.map((city, index) => (
                                        <div
                                            id={`city-${city}`}
                                            key={`city-${index}`}
                                            className="matching-item city-item"
                                            onClick={() => {
                                                if (selectedState) {
                                                    handleMatch(selectedState, city);
                                                }
                                            }}
                                        >
                                            {city}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAnswer(connections)}
                                    >
                                        ➡️
                                    </button>
                                </div>
                            {connections.map((conn, index) => (
                                <Xarrow
                                    key={index}
                                    start={`state-${conn.state}`}
                                    end={`city-${conn.city}`}
                                    color="orange"
                                    strokeWidth={4}
                                    path="straight"
                                />
                            ))}
                            </div>
                        </div>
                    </DndProvider>
                </div>
            );
        }
    };

    return (
        <>
            {showGradient && <div className="gradient-background-hw2" />}
            <Nav />
            <div className="content mt-5">
                <h1 className="fade-in" style={{marginTop: "-10rem"}}>Homework 2 <br/>A US Geography Quiz</h1>

                <div className="fade-in delay-1s" style={{marginTop: "2rem"}}>
                    {!quizStarted ? (
                        <div className="text-center">
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={startQuiz}
                            >
                                BEGIN
                            </button>
                        </div>
                    ) : quizEnded ? (
                        <div className="card p-4 text-center">
                            <h2>Quiz Complete!</h2>
                            <p>Score: {Math.round((score / questions.length) * 100)}%</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => window.location.reload()}
                            >
                                RESTART
                            </button>
                        </div>
                    ) : (
                        renderQuestion()
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Hw2;
