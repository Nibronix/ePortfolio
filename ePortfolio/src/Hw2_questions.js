export const choiceQuestions = [
    {
        id: 1,
        question: "Which state features a town called 'Boring'?",
        options: ["California", "Oregon", "Texas", "Washington"],
        answer: "Oregon",
        feedback: {
            correct: "Correct! There is a town called 'Boring' in Oregon.",
            incorrect: "Incorrect. The correct answer is Oregon, where there's a town called 'Boring'."
        }
    },
    {
        id: 2,
        question: "Which state is known as the 'Sunshine State'?",
        options: ["California", "Florida", "Texas", "Arizona"],
        answer: "Florida",
        feedback: {
            correct: "Correct! Florida is known as the 'Sunshine State'.",
            incorrect: "Incorrect. Florida is the 'Sunshine State'."
        }
    },
    {
        id: 3,
        question: "What is the largest state in the US by area?",
        options: ["Texas", "California", "Alaska", "Canada"],
        answer: "Alaska",
        feedback: {
            correct: "Correct! Alaska is the largest state in the US by area.",
            incorrect: "Incorrect. The correct answer is Alaska."
        }
    },
    {
        id: 4,
        question: "Which state is known as the 'Empire State'?",
        options: ["California", "Texas", "New York", "Virginia"],
        answer: "New York",
        feedback: {
            correct: "Correct! New York is known as the 'Empire State'.",
            incorrect: "Incorrect. The 'Empire State' is New York."
        }
    },
    {
        id: 5,
        question: "What is the capital of Texas?",
        options: ["Houston", "Dallas", "Austin", "San Antonio"],
        answer: "Austin",
        feedback: {
            correct: "Correct! The capital of Texas is Austin.",
            incorrect: "Incorrect. The correct answer is Austin."
        }
    },
    {
        id: 6,
        question: "Which state is known for its potatoes?",
        options: ["Iowa", "Idaho", "Ohio", "Nebraska"],
        answer: "Idaho",
        feedback: {
            correct: "Correct! Idaho is famous for its potatoes.",
            incorrect: "Incorrect. The state known for its potatoes is Idaho."
        }
    },
    {
        id: 7,
        question: "What is the smallest state in the US by area?",
        options: ["Delaware", "Rhode Island", "Connecticut", "New Jersey"],
        answer: "Rhode Island",
        feedback: {
            correct: "Correct! Rhode Island is the smallest state in the US by area.",
            incorrect: "Incorrect. The smallest state by area is Rhode Island."
        }
    },
    {
        id: 8,
        question: "Which state is home to the Grand Canyon?",
        options: ["Nevada", "Utah", "Arizona", "Colorado"],
        answer: "Arizona",
        feedback: {
            correct: "Correct! The Grand Canyon is located in Arizona.",
            incorrect: "Incorrect. Arizona is home to the Grand Canyon."
        }
    },
    {
        id: 9,
        question: "Which state proudly hosts the world's largest ball of twine?",
        options: ["Kansas", "Oklahoma", "Nebraska", "New York"],
        answer: "Kansas",
        feedback: {
            correct: "Correct! Kansas is home to the world's largest ball of twine.",
            incorrect: "Incorrect. The world's largest ball of twine is in Kansas."
        }
    },
    {
        id: 10,
        question: "Which state is known as the 'Peach State'?",
        options: ["South Carolina", "Georgia", "Alabama", "Mississippi"],
        answer: "Georgia",
        feedback: {
            correct: "Correct! Georgia is known as the 'Peach State'.",
            incorrect: "Incorrect. Georgia is the 'Peach State'."
        }
    }
]

export const blankQuestions = [
    {
        id: 1,
        question: "The state with the most national parks is _________.",
        answer: "California",
        feedback: {
            correct: "Correct! California has the most national parks in the US.",
            incorrect: "Incorrect. The correct answer is California, with the most national parks."
        }
    },
    {
        id: 2,
        question: "Which state is known as the 'Land of 10,000 Lakes'?",
        answer: "Minnesota",
        feedback: {
            correct: "Correct! Minnesota is known as the 'Land of 10,000 Lakes'.",
            incorrect: "Incorrect. The correct answer is Minnesota."
        }
    }
]

export const trueFalseQuestions = [
    {
        id: 1,
        question: "California is home to more active volcanoes than any other US state.",
        answer: false,
        feedback: {
            correct: "Correct! Although California's volcanoes are well known, Alaska has more active volcanoes than any other US state.",
            incorrect: "Not quite. Alaska has more active volcanoes than any other US state."
        }
        
    },
    {
        id: 2,
        question: "There are four states that border Mexico.",
        answer: true,
        feedback: {
            correct: "Correct! The states that border Mexico are California, Arizona, New Mexico, and Texas.",
            incorrect: "Incorrect. There are four states that border Mexico: California, Arizona, New Mexico, and Texas."
        }
        
    }
]

export const matchingQuestions = [
    {
        id: 1,
        question: "Match the cities to the state.",
        options: [
            { state: "California", city: "Palm Springs" },
            { state: "Texas", city: "Plano" },
            { state: "Florida", city: "Tallahassee" },
            { state: "New York", city: "Albany" }
        ],
        answer: [
            { state: "California", city: "Palm Springs" },
            { state: "Texas", city: "Plano" },
            { state: "Florida", city: "Tallahassee" },
            { state: "New York", city: "Albany" }
        ],
        feedback: {
            correct: "Correct! You've matched all cities with their respective states.",
            incorrect: "Incorrect match. :("
        }
    }
]

export const checkQuestions = [
    {
        id: 1,
        question: "Which of the following states are part of the New England region?",
        options: ["Maine", "Vermont", "New York", "Massachusetts"],
        answer: ["Maine", "Vermont", "Massachusetts"],
        feedback: {
            correct: "Correct! Maine, Vermont, and Massachusetts are part of the New England region.",
            incorrect: "Incorrect. The correct answers are Maine, Vermont, and Massachusetts."
        }
    },
    {
        id: 2,
        question: "Which of the following states have a coastline on the Gulf of Mexico?",
        options: ["Texas", "Florida", "Georgia", "Alabama"],
        answer: ["Texas", "Florida", "Alabama"],
        feedback: {
            correct: "Correct! Texas, Florida, and Alabama have coastlines on the Gulf of Mexico.",
            incorrect: "Incorrect. The correct answers are Texas, Florida, and Alabama."
        }
    }
]


