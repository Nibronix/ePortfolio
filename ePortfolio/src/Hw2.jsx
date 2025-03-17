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

    return (
        <>
            {showGradient && <div className="gradient-background-hw2" />}
            <Nav />
            <div className="content">
                <h1 className="fade-in" style={{marginTop: "5rem"}}>Homework 2 <br/>A US Geography Quiz</h1>

                <div className="fade-in delay-1s" style={{marginTop: "2rem"}}>
                    

                </div>

                <div className="VR-button-container">

                    <button
                        onClick={HistoryButton}
                        className="fade-in delay-2s"
                        style={{
                            marginLeft: '0rem'
                        }}>
                            HISTORY
                    </button>

                    <button
                        onClick={TodayButton}
                        className="fade-in delay-2s"
                        style={{
                            marginCenter: 'auto'
                        }}>
                            TODAY'S WORLD
                    </button>

                    <button
                        onClick={FutureButton}
                        className="fade-in delay-2s"
                        >
                            FOVEATED RENDERING
                    </button>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Hw2;
