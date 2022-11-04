var questions = [
  {
    ask: "How many eyes does a bee have?",
    answers: ["2", "5", "8", "Over 100"],
    right: "5",
  },
  {
    ask: "How long have humans kept bees?",
    answers: ["< 100 years", "500 years", "2156 years", "> 4000 years"],
    right: "> 4000 years",
  },
  {
    ask: "The honeybee is the official insect of which state?",
    answers: ["California", "Georgia", "Maine", "Oregon"],
    right: "Maine",
  },
];
var secondsLeft = 45;
var startEl = document.getElementById("start");
var quizEl = document.getElementById("quiz");
var scoreboardEl = document.getElementById("scoreboard");
var viewEl = document.getElementById("view");
var timeEl = document.getElementById("timer");
var question = document.getElementById("question");
var answers = document.getElementById("answers");
var message = document.getElementById("message");
var highscore = 0;
var questionNumber = 0;
var rightAnswer = "";
var userAnswer = "";
let timerInterval;

startEl.addEventListener("click", startQuiz);
view.addEventListener("click", showScores);

// On start click

function startQuiz() {
  startEl.classList.add("hide");
  quizEl.classList.remove("hide");
  question.textContent = "";
  answers.textContent = "";

  startTimer();
  nextQuestion(questions);
}

//Next question

function nextQuestion(array) {
  if (questionNumber < array.length) {
    rightAnswer = array[questionNumber].right;
    question.innerText = array[questionNumber].ask;
    var choices = array[questionNumber].answers;

    for (let index = 0; index < choices.length; index++) {
      const element = choices[index];
      var answerButton = document.createElement("button");
      answerButton.setAttribute("class", "answer");
      answerButton.textContent = element;
      answers.append(answerButton);
    }
  } else {
    highscore = secondsLeft;
    secondsLeft = 0;
    console.log(highscore);
    showScores();
  }
}

//Check answer

document.addEventListener("click", function (event) {
  if (event.target && event.target.matches(".answer")) {
    userAnswer = event.target.textContent;
    console.log(userAnswer);
    if (userAnswer === rightAnswer) {
      message.textContent = "Right Answer!";
    } else {
      message.textContent = "Wrong Answer!";
      secondsLeft -= 10;
    }
    questionNumber++;
    question.innerHTML = "";
    answers.innerHTML = "";
    nextQuestion(questions);
  }
});

//Show scores

function showScores() {
  startEl.classList.add("hide");
  quizEl.classList.add("hide");
  scoreboardEl.classList.remove("hide");
}

//Timer

function startTimer() {
  timerInterval = setInterval(() => {
    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft < 1) {
      clearInterval(timerInterval);
      console.log("game over");
    } else {
      secondsLeft--;
    }
  }, 1000);
}
