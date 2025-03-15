export const choiceQuestions = [
    {
        id: 1,
        question: "Which state features a town called 'Boring'?",
        options: ["California", "Oregon", "Texas", "Washington"],
        correct: "Oregon"
    },
    {
        id: 2,
        question: "Which state is known as the 'Sunshine State'?",
        options: ["California", "Florida", "Texas", "Arizona"],
        correct: "Florida"
    },
    {
        id: 3,
        question: "What is the largest state in the US by area?",
        options: ["Texas", "California", "Alaska", "Canada"],
        correct: "Alaska"
    },
    {
        id: 4,
        question: "Which state is known as the 'Empire State'?",
        options: ["California", "Texas", "New York", "Virginia"],
        correct: "New York"
    },
    {
        id: 5,
        question: "What is the capital of Texas?",
        options: ["Houston", "Dallas", "Austin", "San Antonio"],
        correct: "Austin"
    },
    {
        id: 6,
        question: "Which state is known for its potatoes?",
        options: ["Iowa", "Idaho", "Ohio", "Nebraska"],
        correct: "Idaho"
    },
    {
        id: 7,
        question: "What is the smallest state in the US by area?",
        options: ["Delaware", "Rhode Island", "Connecticut", "New Jersey"],
        correct: "Rhode Island"
    },
    {
        id: 8,
        question: "Which state is home to the Grand Canyon?",
        options: ["Nevada", "Utah", "Arizona", "Colorado"],
        correct: "Arizona"
    },
    {
        id: 9,
        question: "Which state proudly hosts the world's largest ball of twine?",
        options: ["Kansas", "Oklahoma", "Nebraska", "New York"],
        correct: "Kansas"
    },
    {
        id: 10,
        question: "Which state is known as the 'Peach State'?",
        options: ["South Carolina", "Georgia", "Alabama", "Mississippi"],
        correct: "Georgia"
    }
]

export const blankQuestions = [
    {
        id: 1,
        question: "The state with the most national parks is _________.",
        answer: "California"
    },
    {
        id: 2,
        question: "Which state is known as the 'Land of 10,000 Lakes'?",
        answer: "Minnesota"
    }
]

export const trueFalseQuestions = [
    {
        id: 1,
        question: "California is home to more active volcanoes than any other US state.",
        answer: "False",
        correctFeedback: "Correct! Although California's volcanoes are well known, Alakasa has more active volcanoes than any other US state.",
        incorrectFeedback: "Not quite. Alaska has more active volcanoes than any other US state."
    },
    {
        id: 2,
        question: "There are four states that border Mexico.",
        answer: "True",
        correctFeedback: "Correct! The states that border Mexico is California, Arizona, New Mexico, and Texas.",
        incorrectFeedback: "Incorrect. There are four states that border Mexico: California, Arizona, New Mexico, and Texas."
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
        correct: [
            { state: "California", city: "Palm Springs" },
            { state: "Texas", city: "Plano" },
            { state: "Florida", city: "Tallahassee" },
            { state: "New York", city: "Albany" }        ]
    }
]

