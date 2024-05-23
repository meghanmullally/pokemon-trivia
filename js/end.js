/*--------CACHE ELEMENTS ------*/
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const endingTxt = document.getElementById("endingTxt");

// get high score in local storage, if null this will be empty
const highScores = JSON.parse(
    localStorage.getItem("highScores", JSON.stringify([]))
);

const MAX_HIGH_SCORES = 5;

console.log(highScores);
finalScore.innerText = `Final Score: ${mostRecentScore}`;

// Convert the text content of finalScore to a number before comparison
if (Number(mostRecentScore) === 100) {
    endingTxt.innerText = 'Congrats!';
    endingTxt.style.fontSize = '2rem';
    endingTxt.style.textAlign = 'center';
} else {
    endingTxt.innerText = "Game Over...You lost! Try again?";
    endingTxt.style.fontSize = '3.5rem';
    endingTxt.style.color = 'red';
    endingTxt.style.textAlign = 'center';
}

username.addEventListener("keyup", () => {
    // enable btn once there are values in the username input
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (event) => {
    console.log("clicked save button");
    event.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value,
    };
    highScores.push(score);

    highScores.sort((a, b) => b.score - a.score);
    // TOP 5 scores - cut off
    highScores.splice(5);

    // store high scores into local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
};
