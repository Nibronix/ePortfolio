import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hw2.css'
import { choiceQuestions, blankQuestions, trueFalseQuestions, matchingQuestions, checkQuestions } from './Hw2_questions.js';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Xarrow from 'react-xarrows';
import React from 'react';
import Good from './assets/good.png';
import Sad from './assets/sad.png';


function Hw2() {
    const [showGradient, setShowGradient] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizEnded, setQuizEnded] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [showNextButton, setShowNextButton] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [image, setImage] = useState(null);
    const finalScore = Math.round((score / questions.length) * 100);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        if (currentQuestion < 5 && questions[currentQuestion]) {
            setShuffledOptions([...questions[currentQuestion].options].sort(() => Math.random() - 0.5))
        }
    }, [currentQuestion, questions]);

    // Quiz attempts
    const [totalAttempts, setTotalAttempts] = useState(() => {
        const savedAttempts = localStorage.getItem('quizAttempts');
        return savedAttempts ? parseInt(savedAttempts) : 0;
    });

    useEffect(() => {
        if (quizEnded) {
            const newAttempts = totalAttempts + 1;
            setTotalAttempts(newAttempts);
            localStorage.setItem('quizAttempts', newAttempts.toString());
        }
    }, [quizEnded]);

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
            handleAnswer(newConnections);
        }
    }
    
    const NextButton = ({ showNextButton, onClick, children}) => {
        return (
            <div className="btn-wrap">
                {showNextButton && (
                    <button className="btn-hw2" onClick={onClick}>
                        {children || "Next Question"}
                    </button>
                )}
            </div>
        );
    };

    useEffect(() => {
        if (quizEnded) {
            if (finalScore >= 80) {
                setImage(Good);
            } else {
                setImage(Sad);
            }
        }
    }, [quizEnded]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const shuffledChoice = [...choiceQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
        const shuffledBlank = [...blankQuestions].sort(() => Math.random() - 0.5).slice(0, 2);
        const shuffledTrueFalse = [...trueFalseQuestions].sort(() => Math.random() - 0.5).slice(0, 1);
        const shuffledCheck = [...checkQuestions].sort(() => Math.random() - 0.5).slice(0, 1);
        const matchingQuestion = matchingQuestions[0];

        const initialQuestions = [
            ...shuffledChoice,
            ...shuffledBlank,
            ...shuffledTrueFalse,
            ...shuffledCheck,
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
        // 6-7: Fill in the Blank
        // 8: True/False
        // 9: Check
        // 10: Matching
        if (currentQuestion < 5) {
            isCorrect = answer === currentQ.answer;
        } else if (currentQuestion < 7) {
            isCorrect = answer.toLowerCase() === currentQ.answer.toLowerCase();
        } else if (currentQuestion < 8) {
            isCorrect = answer === currentQ.answer;
        } else if (currentQuestion < 9) {
            isCorrect = Array.isArray(answer) &&
            answer.length === currentQ.answer.length && 
            answer.every((val, index) => val === currentQ.answer[index]);
        } else {
            isCorrect = answer.every((pair, index) =>
                pair.state === currentQ.answer[index].state &&
                pair.city === currentQ.answer[index].city
            );
        }

        if (isCorrect) {
            setScore(score + 1);
            setFeedback(currentQ.feedback.correct);
            setImage(Good);
        }
        else {
            setFeedback(currentQ.feedback.incorrect);
            setImage(Sad);
        }

        setShowNextButton(true);
    };

    const nextQuestion = () => {
        if (currentQuestion === questions.length - 1) {
            setQuizEnded(true);
        } else {
            const radioButtons = document.getElementsByName(`question-${currentQuestion}`);
            radioButtons.forEach(radio => radio.checked = false);

            setCurrentQuestion(currentQuestion + 1);
            setFeedback('');
            setConnections([]);
            setShowNextButton(false);
            setInputValue('');
            setImage(null);
        }
    };

    const renderQuestion = () => {
        const currentQ = questions[currentQuestion];

        // First 5 questions are multiple choice
        if (currentQuestion < 5) {
            const currentQ = questions[currentQuestion];

            return (
                <div className="card-hw2 p-4">
                    <h4 className="mb-4">Question: {currentQuestion + 1}</h4>
                    <p className="mb-3">{currentQ.question}</p>

                    <div className="d-grid gap-2">
                        {shuffledOptions.map((option, index) => (
                            <label 
                            key={index}
                            className={`btn-hw2 ${showNextButton ? 'disabled' : ''}`}
                        >
                            <input
                                type="radio"
                                name={`question-${currentQuestion}`}
                                value={option}
                                onChange={() => handleAnswer(option)}
                                disabled={showNextButton}
                            />
                            {' '}{option}
                        </label>
                        ))}
                    </div>
                    {feedback && <p>{feedback}</p>}
                    <NextButton showNextButton={showNextButton} onClick={nextQuestion} />
                </div>
            );

        // Questions 6-7 are fill in the blank
        } else if (currentQuestion < 7) {
            return (
                <div className="card-hw2 p-4">
                    <h4 className="mb-4">Question: {currentQuestion + 1}</h4>
                    <p className="mb-3">{currentQ.question}</p>

                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control-hw2"
                            placeholder="🐁"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={showNextButton}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !showNextButton) {
                                    handleAnswer(e.target.value);
                                }
                            }
                        }
                        />
                        <div className="btn-wrap">
                            <button
                                className={`btn-hw2 ${showNextButton ? 'disabled' : ''}`}
                                onClick={(e) => {
                                    const input = e.target.closest('.input-group').querySelector('input');
                                    handleAnswer(input.value);
                                }}
                                disabled={showNextButton}
                            >
                                ➡️
                            </button>
                        </div>
                    </div>
                    {feedback && <p>{feedback}</p>}
                    <NextButton showNextButton={showNextButton} onClick={nextQuestion} />
                </div>
            );

        // Questions 8 is true/false
        } else if (currentQuestion < 8) {
            return (
                <div className="card-hw2 p-4">
                    <h4 className="mb-4">Question {currentQuestion + 1}</h4>
                    <p className="mb-3">{currentQ.question}</p>

                    <div className="d-grid gap-2">
                    <label className={`btn-hw2 ${showNextButton ? 'disabled' : ''}`}>
                        <input 
                            type="radio"
                            name={`question-${currentQuestion}`}
                            value="true"
                            onChange={() => handleAnswer(true)}
                            disabled={showNextButton}
                        />
                        {' '}True
                    </label>
                    <label className={`btn-hw2 ${showNextButton ? 'disabled' : ''}`}>
                        <input 
                            type="radio"
                            name={`question-${currentQuestion}`}
                            value="false"
                            onChange={() => handleAnswer(false)}
                            disabled={showNextButton}
                        />
                        {' '}False
                    </label>
                    </div>
                    {feedback && <p>{feedback}</p>}
                    <NextButton
                        showNextButton={showNextButton}
                        onClick={nextQuestion}
                    >
                        {currentQuestion === questions.length - 1 ? "Finish" : "Next Question"}
                    </NextButton>
                </div>
            );
        // Question 9 is a checkbox question
        } else if (currentQuestion < 9) {
            return (
                <div className="card-hw2 p-4">
                    <h4 className="mb-4">Question {currentQuestion + 1}</h4>
                    <p className="mb-3">{currentQ.question}</p>
    
                    <div className="d-grid gap-2">
                        {currentQ.options.map((option, index) => (
                            <label key={index} className={`btn-hw2 ${showNextButton ? 'disabled' : ''}`}>
                                <input
                                    type="checkbox"
                                    name={`question-${currentQuestion}`}
                                    value={option}
                                    onChange={(e) => {
                                        const selected = e.target.checked;
                                        setSelectedOptions(prev => selected ? [...prev, option] : prev.filter(opt => opt !== option));
                                    }}
                                    disabled={showNextButton}
                                />
                                {' '}{option}
                            </label>
                        ))}
                        <div className="btn-wrap">
                            <button
                                className={`btn-hw2 ${showNextButton ? 'disabled' : ''}`}
                                onClick={() => handleAnswer(selectedOptions)}
                                disabled={showNextButton}
                            >
                                ➡️
                            </button>
                        </div>
                    </div>
                    {feedback && <p>{feedback}</p>}
                    <NextButton showNextButton={showNextButton} onClick={nextQuestion} />
                </div>
            );
        // Final (10th) question is a matching.
        } else {
            return (
                <div className="card-hw2 p-4">
                    <h4 className="mb-4">Question {currentQuestion + 1}</h4>
                    <p className="mb-3">{currentQ.question}</p>
                        <div className="matching-container">
                            <div className="matching-columns">
                                <div className="states-column">
                                    {currentQ.options.map((item, index) => (
                                        <div
                                            id={`state-${item.state}`}
                                            key={`state-${index}`}
                                            className={`state-item ${selectedState === item.state ? 'selected' : ''} ${showNextButton ? 'disabled' : ''}`}
                                            onClick={() => !showNextButton && setSelectedState(item.state)}
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
                                            className={`matching-item city-item ${showNextButton ? 'disabled' : ''}`}
                                            onClick={() => {
                                                if (selectedState && !showNextButton) {
                                                    handleMatch(selectedState, city);
                                                }
                                            }}
                                        >
                                            {city}
                                        </div>
                                    ))}
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
                            {feedback && <p>{feedback}</p>}
                            <NextButton 
                                showNextButton={showNextButton} 
                                onClick={nextQuestion}
                            >
                                Finish
                            </NextButton>
                        </div>
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
                        <div className="btn-wrap">
                            <button
                                className="btn-hw2"
                                onClick={startQuiz}
                            >
                                BEGIN
                            </button>
                        </div>
                    ) : quizEnded ? (
                        <div className="card-hw2 p-4">
                            <h2>🎉 Quiz Complete! 🎉</h2>
                            <p>Score: {finalScore}%</p>
                            {finalScore >= 80 && <p>🔥 Wow! Nice score! 🔥</p>}
                            <p>Attempts: {totalAttempts}</p>

                            <div className="btn-wrap">
                                <button
                                    className="btn-hw2"
                                    onClick={() => window.location.reload()}
                                >
                                    RESTART
                                </button>
                            </div>
                        </div>
                    ) : (
                        renderQuestion()
                    )}
                </div>
            </div>
            <img className="image-hw2"
                src={image}
            />
            <Footer />
        </>
    );
}

export default Hw2;
