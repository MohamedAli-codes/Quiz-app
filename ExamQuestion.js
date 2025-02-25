const allQuestions = [
    { title: "Do you know this landmark?", image: "Exam images/Leaning Tower of Pisa.jpg", answers: ["Leaning Tower of Pisa", "Eiffel Tower", "Statue of Liberty", "Big Ben"], correctAnswer: 0 },
    { title: "Do you know this animal?", image: "Exam images/cheetah.jpg", answers: ["Tiger", "Leopard", "Cheetah", "Lion"], correctAnswer: 2 },
    { title: "What planet is known as the Red Planet?", image: "Exam images/mars.jpg", answers: ["Earth", "Mars", "Jupiter", "Venus"], correctAnswer: 1 },
    { title: "What is the capital of France?", image: "Exam images/paris.jpg", answers: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: 2 },
    { title: "Which ocean is the largest?", image: "Exam images/ocean.jpg", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: 3 },
    { title: "Who painted the Mona Lisa?", image: "Exam images/monalisa.jpg", answers: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], correctAnswer: 2 },
    { title: "What is the fastest land animal?", image: "Exam images/cheetah.jpg", answers: ["Lion", "Cheetah", "Horse", "Kangaroo"], correctAnswer: 1 },
    { title: "What gas do plants absorb from the air?", image: "Exam images/plant.jpg", answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: 1 },
    { title: "How many continents are there on Earth?", image: "Exam images/earth.jpg", answers: ["5", "6", "7", "8"], correctAnswer: 2 },
    { title: "Which country is famous for sushi?", image: "Exam images/sushi.jpg", answers: ["China", "Korea", "Japan", "Thailand"], correctAnswer: 2 },
    { title: "What is the tallest mountain in the world?", image: "Exam images/everest.jpg", answers: ["K2", "Everest", "Kilimanjaro", "Denali"], correctAnswer: 1 },
    { title: "What is the largest mammal?", image: "Exam images/whale.jpg", answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], correctAnswer: 1 },
    { title: "What is the boiling point of water?", image: "Exam images/boiling.jpg", answers: ["90°C", "100°C", "120°C", "80°C"], correctAnswer: 1 },
    { title: "Which organ pumps blood in the body?", image: "Exam images/heart.jpg", answers: ["Brain", "Lungs", "Heart", "Kidney"], correctAnswer: 2 }
];

function getRandomQuestions(questionsArray, count) {
    return questionsArray.sort(() => 0.5 - Math.random()).slice(0, count);
}

const questions = getRandomQuestions(allQuestions, 10);
let currentQuestionIndex = 0;
let selectedAnswer = null;
let score = 0;
let timer;
let timeLeft = 60;

const questionContainer = document.getElementById("question-container");
const titleElement = document.getElementById("question-title");
const imageElement = document.getElementById("question-image");
const answersContainer = document.getElementById("answers-container");
const submitButton = document.getElementById("submit");
const timerBar = document.getElementById("timer-bar");
const questionIndicator = document.getElementById("question-indicator");

function updateQuestionIndicator() {
    questionIndicator.innerHTML = "";
    for (let i = 0; i < questions.length; i++) {
        const bullet = document.createElement("span");
        bullet.classList.add("bullet");
        if (i === currentQuestionIndex) bullet.classList.add("active");
        questionIndicator.appendChild(bullet);
    }
}

function startTimer() {
    timeLeft = 60;
    timerBar.style.width = "100%";
    timer = setInterval(() => {
        timeLeft--;
        timerBar.style.width = (timeLeft / 60) * 100 + "%";
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timer);
    startTimer();
    updateQuestionIndicator();

    const question = questions[currentQuestionIndex];
    titleElement.textContent = question.title;
    imageElement.src = question.image;
    imageElement.alt = question.title;

    answersContainer.innerHTML = "";
    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer-btn");
        button.onclick = () => selectAnswer(button, index);
        answersContainer.appendChild(button);
    });

    submitButton.disabled = true;
    selectedAnswer = null;
}

function selectAnswer(button, index) {
    selectedAnswer = index;
    document.querySelectorAll(".answer-btn").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    submitButton.disabled = false;
}

function submitAnswer() {
    clearInterval(timer);
    if (selectedAnswer === null) return;

    const correctIndex = questions[currentQuestionIndex].correctAnswer;
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === correctIndex) button.classList.add("correct");
        if (index === selectedAnswer && selectedAnswer !== correctIndex) button.classList.add("wrong");
    });

    if (selectedAnswer === correctIndex) score++;

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            questionContainer.innerHTML = `
                <h2>Quiz Completed! 🎉</h2>
                <p>Your Score: <strong>${score}/${questions.length}</strong></p>
                <button onclick="location.reload()">Restart</button>`;
        }
    }, 1000);
}

submitButton.onclick = submitAnswer;
loadQuestion();