import { useState, useEffect } from 'react';
import './App.css'
import Footer from './footer.jsx'
import Nav from './Nav.jsx'
import VR_Headset from './assets/VR_Headset.png'
import './Hw2.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { choiceQuestions, blankQuestions, trueFalseQuestions, matchingQuestions } from './Hw2_questions.js';

function Hw2() {
    const [showGradient, setShowGradient] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizEnded, setQuizEnded] = useState(false);
    const [questions, setQuestions] = useState([]);

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

        setQuestions([
            ...shuffledChoice,
            ...shuffledBlank,
            ...shuffledTrueFalse,
            matchingQuestion
        ]);
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
            isCorrrect = answer.toLowerCase() === currentQ.answer.toLowerCase();
        } else if (currentQuestion < 9) {
            isCorrect = answer === currentQ.answer;
        } else {
            isCorrect = answer.every((pair, index) =>
                pair === currentQ.answer[index].match);
        }

        if (isCorrect) setScore(score + 1);

        if (currentQuestion === questions.length - 1) {
            setQuizEnded(true);
        } else {
            setCurrentQuestion(currentQuestion + 1);
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
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleAnswer(e.target.value);
                                }
                            }}
                        />
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

                    <div className="matching-container">
                    </div>
                        
                </div>
            );
        }
    };

    return (
        <>
            {showGradient && <div className="gradient-background-hw2" />}
            <Nav />
            <div className="container mt-5">
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
