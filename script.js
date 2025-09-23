// Easier Quiz questions
const questions = [
    {
        code: `console.log("Hello, World!");`,
        language: "JavaScript",
        options: ["JavaScript", "Python", "Java", "C++"]
    },
    {
        code: `print("Hello, World!")`,
        language: "Python",
        options: ["Python", "JavaScript", "Ruby", "C"]
    },
    {
        code: `System.out.println("Hello, World!");`,
        language: "Java",
        options: ["Java", "C#", "JavaScript", "Python"]
    },
    {
        code: `puts "Hello, World!"`,
        language: "Ruby",
        options: ["Ruby", "Python", "JavaScript", "PHP"]
    },
    {
        code: `echo "Hello, World!";`,
        language: "PHP",
        options: ["PHP", "JavaScript", "Python", "Ruby"]
    },
    {
        code: `print("Hello, World!")`,
        language: "Python",
        options: ["Python", "Ruby", "C#", "Java"]
    },
    {
        code: `Console.WriteLine("Hello, World!");`,
        language: "C#",
        options: ["C#", "Java", "Python", "JavaScript"]
    },
    {
        code: `cout << "Hello, World!" << endl;`,
        language: "C++",
        options: ["C++", "C", "Java", "Python"]
    },
    {
        code: `printf("Hello, World!\\n");`,
        language: "C",
        options: ["C", "C++", "Java", "Python"]
    },
    {
        code: `document.write("Hello, World!");`,
        language: "JavaScript",
        options: ["JavaScript", "PHP", "Python", "C#"]
    }
];

// DOM elements
const codeSnippetElement = document.getElementById('code-snippet');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const progressElement = document.getElementById('progress');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const gameEndElement = document.getElementById('game-end');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');
const floatingLogosElement = document.getElementById('floating-logos');

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Programming language logos for background
const languageLogos = [
    '<i class="fab fa-js-square"></i>',
    '<i class="fab fa-python"></i>',
    '<i class="fab fa-java"></i>',
    '<i class="fab fa-cuttlefish"></i>',
    '<i class="fab fa-csharp"></i>',
    '<i class="fab fa-php"></i>',
    '<i class="fab fa-swift"></i>',
    '<i class="fab fa-rust"></i>',
    '<i class="fab fa-gofore"></i>',
    '<i class="fab fa-korvue"></i>',
    '<i class="fab fa-ruby"></i>'
];

// Create floating logos in the background
function createFloatingLogos() {
    for (let i = 0; i < 25; i++) {
        const logo = document.createElement('span');
        logo.innerHTML = languageLogos[Math.floor(Math.random() * languageLogos.length)];
        logo.style.position = 'absolute';
        logo.style.left = `${Math.random() * 100}%`;
        logo.style.top = `${Math.random() * 100}%`;
        logo.style.fontSize = `${1 + Math.random() * 2}rem`;
        logo.style.opacity = `${0.4 + Math.random() * 0.4}`;
        logo.style.pointerEvents = 'none';
        logo.style.animation = `floatLogo ${8 + Math.random() * 4}s linear infinite`;
        floatingLogosElement.appendChild(logo);
    }
}

createFloatingLogos();

function showQuestion() {
    answered = false;
    const question = questions[currentQuestionIndex];
    codeSnippetElement.textContent = question.code;
    optionsElement.innerHTML = '';
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    nextButton.style.display = 'none';
    progressElement.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => selectOption(button, option, question.language);
        optionsElement.appendChild(button);
    });
}

function selectOption(button, selected, correct) {
    if (answered) return;
    answered = true;
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(opt => {
        if (opt.textContent === correct) opt.classList.add('correct');
        if (opt !== button && opt.textContent !== correct) opt.classList.remove('incorrect');
        opt.disabled = true;
    });
    if (selected === correct) {
        score++;
        scoreElement.textContent = score;
        feedbackElement.textContent = 'Correct! Well done!';
        feedbackElement.className = 'feedback correct-feedback';
    } else {
        button.classList.add('incorrect');
        feedbackElement.textContent = `Incorrect! It's ${correct}.`;
        feedbackElement.className = 'feedback incorrect-feedback';
    }
    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
});

restartButton.addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    scoreElement.textContent = score;
    gameEndElement.style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';
    showQuestion();
});

function endGame() {
    document.querySelector('.quiz-container').style.display = 'none';
    gameEndElement.style.display = 'block';
    finalScoreElement.textContent = score;
}

function initGame() {
    score = 0;
    currentQuestionIndex = 0;
    scoreElement.textContent = score;
    gameEndElement.style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';
    showQuestion();
}

// Start the game when the page loads
window.addEventListener('load', initGame);

// Floating logo animation
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
@keyframes floatLogo {
    0% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-40px) scale(1.1); }
    100% { transform: translateY(0) scale(1); }
}
`;
document.head.appendChild(styleSheet);