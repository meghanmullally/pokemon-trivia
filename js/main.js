/* -------- CACHE ELEMENTS -------- */
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterTxt = document.getElementById("questionCounter");
const scoreTxt = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

/* -------- STATE -------- */
let score = 0;
let currentQuestion = {};
let acceptAnswer = false;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];


/* --------  QUESTIONS -------- */
fetch("questions.json")
    .then((response) => response.json())
    .then((loadedQuestions) => {
        console.log("loadedQuestions", loadedQuestions);
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.log(err);
    });

// user will receive 10 points if correct
const CORRECT_BONUS = 10;
// max amount of questions in the quiz
const MAX_QUESTIONS = 10;

startGame = () => {
    // start question and score at 0
    questionCounter = 0;
    score = 0;

    // including all elements in questions w/ spread syntax
    availableQuestions = [...questions];
    console.log("available Questions", availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // store most recent score
        localStorage.setItem("mostRecentScore", score);
        // go to the end page
        return window.location.assign("/end.html");
    }

    questionCounter++;
    // updating "lvl" question user is on
    questionCounterTxt.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    // randomize questions
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    // Change question text
    question.innerText = currentQuestion.question;

    // for each choice update with choices f
    choices.forEach((choice) => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    // get rid of question we have already used
    availableQuestions.splice(questionIndex, 1);
    acceptAnswer = true;
};

choices.forEach((choice) => {
    choice.addEventListener("click", (event) => {
        if (!acceptAnswer) return;

        acceptAnswer = false;
        const selectedChoice = event.target;
        // Convert selectedAnswer to a number
        const selectedAnswer = Number(selectedChoice.dataset["number"]);

        const classToApply =
            selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            // user gets answer correct add point
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        // set time out so user can see which one they got wrong
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

        console.log("classToApply", classToApply);
        console.log(selectedAnswer, currentQuestion.answer);
    });
});

incrementScore = (num) => {
    score += num;
    scoreTxt.innerText = score;

    // upgrade progress bar with score and add green
    progressBarFull.style.width = `${score}%`;
    progressBarFull.style.backgroundColor = "#03FF00";
};
