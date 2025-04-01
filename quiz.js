const quizData = [
    {
        question: "What is a general-purpose programming language known for its readability and ease of use?",
        options: ["C#", "Assembly", "Python", "Fortran"],
        correct: 2
    },
    {
        question: "What is the practice of protecting computer systems, networks, and data from cyber threats?",
        options: ["Cybercrime", "Cybersecurity", "Cyberpunk", "Cybercafe"],
        correct: 1
    },
    {
        question: "What is a form of paid communication used to promote a product, service, brand, or event?",
        options: ["Addiction", "Adversary", "Advertisment", "Anniversary"],
        correct: 2
    },
    {
        question: "The phenomena where the Moon passes between the Earth and the Sun, blocking sunlight partially or completely?",
        options: ["Solar Ellipse ", "Lunar Eclipse", "Night", "Solar Eclipse"],
        correct: 3
    },
    {
        question: "A string of characters that allows access to a computer system?",
        options: ["Integers", "Str", "Password", "True"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const timerEl = document.getElementById('timer');
const progressBar = document.querySelector('.progress-bar');
const quizContainer = document.getElementById('quiz');

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option', 'btn', 'btn-outline-success', 'w-100', 'mb-2');
        button.addEventListener('click', () => selectOption(button, index));
        optionsEl.appendChild(button);
    });
    nextBtn.style.display = 'none';
    timeLeft = 30;
    if (timer) clearInterval(timer);
    startTimer();
    updateProgress();
}

function selectOption(selectedButton, optionIndex) {
    const buttons = optionsEl.getElementsByClassName('option');
    Array.from(buttons).forEach(button => button.classList.remove('selected'));
    selectedButton.classList.add('selected');
    nextBtn.style.display = 'block';
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer();
        }
    }, 1000);
}

function checkAnswer() {
    const selectedOption = document.querySelector('.option.selected');
    if (!selectedOption) return;

    const selectedAnswer = Array.from(optionsEl.children).indexOf(selectedOption);
    const question = quizData[currentQuestion];

    if (selectedAnswer === question.correct) {
        score++;
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.add('incorrect');
        optionsEl.children[question.correct].classList.add('correct');
    }

    Array.from(optionsEl.children).forEach(button => button.disabled = true);
    clearInterval(timer);
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

function showResults() {
    quizContainer.innerHTML = `
                <div class="results text-center d-flex flex-column align-items-center">
                    <div class="result-icon">
                        <i class="fas ${score > quizData.length / 2 ? 'fa-trophy text-success' : 'fa-times-circle text-danger'}"></i>
                    </div>
                    <div class="score fw-bold fs-4">Your score: ${score}/${quizData.length}</div>
                    <p>${score > quizData.length / 2 ? 'Great job!' : 'Better luck next time!'}</p>
                    <button class="btn btn-success mt-3" onclick="location.reload()">Restart Quiz</button>
                </div>
            `;
}

nextBtn.addEventListener('click', () => {
    checkAnswer();
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

loadQuestion();