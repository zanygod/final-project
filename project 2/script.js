const categoryButtons = document.querySelectorAll('.category-button');
const submitButton = document.getElementById('submit-button');
const restartButton = document.getElementById('restart-button');
const initialScreen = document.getElementById('initial-screen');
const quizContainer = document.getElementById('quiz-container');
const summaryScreen = document.getElementById('summary-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('final-score');
const timerDisplay = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let countdown;
let selectedCategory = '';
let questions = [];

const quizData = {
    history: [
        {
            question: "Who was the first President of the United States?",
            options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
            correct: 0
        },
        {
            question: "In which year did World War II end?",
            options: ["1942", "1945", "1939", "1946"],
            correct: 1
        },
        {
            question: "Who discovered America?",
            options: ["Christopher Columbus", "Leif Erikson", "Marco Polo", "Vasco da Gama"],
            correct: 0
        },
        {
            question: "Which empire was ruled by Alexander the Great?",
            options: ["Roman Empire", "Ottoman Empire", "Macedonian Empire", "Persian Empire"],
            correct: 2
        },
        {
            question: "The Great Wall of China was built to protect against invasions from which group?",
            options: ["Mongols", "Japanese", "Koreans", "Russians"],
            correct: 0
        },
        // Add more history questions here
    ],
    filmy: [
        {
            question: "Who directed the movie 'Inception'?",
            options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Quentin Tarantino"],
            correct: 1
        },
        {
            question: "Which movie won the Oscar for Best Picture in 1994?",
            options: ["Pulp Fiction", "Forrest Gump", "The Shawshank Redemption", "The Lion King"],
            correct: 1
        },
        {
            question: "Who played the character of Jack in Titanic?",
            options: ["Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Tom Cruise"],
            correct: 0
        },
        {
            question: "What is the highest-grossing film of all time?",
            options: ["Avatar", "Titanic", "Star Wars: The Force Awakens", "Avengers: Endgame"],
            correct: 3
        },
        {
            question: "Which actor has won the most Oscars?",
            options: ["Tom Hanks", "Meryl Streep", "Katharine Hepburn", "Daniel Day-Lewis"],
            correct: 2
        },
        // Add more filmy questions here
    ],
    worldwide: [
        {
            question: "Which country has the largest population in the world?",
            options: ["India", "USA", "China", "Russia"],
            correct: 2
        },
        {
            question: "What is the capital of Canada?",
            options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
            correct: 2
        },
        {
            question: "Which continent is known as the 'Dark Continent'?",
            options: ["Asia", "Africa", "South America", "Australia"],
            correct: 1
        },
        {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correct: 3
        },
        {
            question: "Mount Everest is located in which country?",
            options: ["India", "Nepal", "China", "Bhutan"],
            correct: 1
        },
        // Add more worldwide questions here
    ],
    technology: [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
            correct: 0
        },
        {
            question: "Which HTML attribute is used to define inline styles?",
            options: ["class", "style", "font", "styles"],
            correct: 1
        },
        {
            question: "Which property is used to change the background color in CSS?",
            options: ["color", "bgcolor", "background-color", "background"],
            correct: 2
        },
        {
            question: "Which JavaScript function is used to write to an HTML element?",
            options: ["document.write()", "document.writeln()", "document.innerHTML", "document.getElementById()"],
            correct: 3
        },
        {
            question: "Which event occurs when the user clicks on an HTML element?",
            options: ["onchange", "onclick", "onmouseclick", "onmouseover"],
            correct: 1
        },
        // Add more technology questions here
    ],
    science: [
        {
            question: "What is the chemical symbol for water?",
            options: ["O2", "H2O", "CO2", "H2"],
            correct: 1
        },
        {
            question: "Who developed the theory of relativity?",
            options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"],
            correct: 2
        },
        {
            question: "What planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            correct: 1
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Silver"],
            correct: 2
        },
        {
            question: "What is the most abundant gas in the Earth's atmosphere?",
            options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
            correct: 3
        },
        // Add more science questions here
    ],
};

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedCategory = button.dataset.category;
        startQuiz();
    });
});

submitButton.addEventListener('click', submitAnswer);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    initialScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    questions = quizData[selectedCategory];
    startTimer();
    displayQuestion();
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        optionElement.addEventListener('click', selectOption);
        optionsContainer.appendChild(optionElement);
    });
}

function selectOption(event) {
    const selectedOption = optionsContainer.querySelector('.selected');
    if (selectedOption) {
        selectedOption.classList.remove('selected');
    }
    event.target.classList.add('selected');
}

function submitAnswer() {
    const selectedOption = optionsContainer.querySelector('.selected');
    if (!selectedOption) {
        alert('Please select an answer!');
        return;
    }

    const answerIndex = parseInt(selectedOption.dataset.index);
    const correctIndex = questions[currentQuestionIndex].correct;

    if (answerIndex === correctIndex) {
        score++;
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        selectedOption.classList.add('correct');
    } else {
        feedback.textContent = 'Incorrect!';
        feedback.style.color = 'red';
        selectedOption.classList.add('incorrect');
        optionsContainer.children[correctIndex].classList.add('correct');
    }

    scoreDisplay.textContent = score;

    setTimeout(() => {
        feedback.textContent = '';
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
            resetTimer();
        } else {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    quizContainer.style.display = 'none';
    summaryScreen.style.display = 'block';
    finalScoreDisplay.textContent = score;
    clearInterval(countdown);
}

function restartQuiz() {
    summaryScreen.style.display = 'none';
    initialScreen.style.display = 'block';
}

function startTimer() {
    timer = 30;
    timerDisplay.textContent = timer;
    countdown = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        if (timer <= 0) {
            clearInterval(countdown);
            submitAnswer();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    startTimer();
}
