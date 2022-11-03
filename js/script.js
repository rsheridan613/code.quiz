window.onload = function () {
  var questions = [
    {
      ask: "Question1",
      answers: ["Answer1", "Answer2", "Answer3", "Answer4"],
      right: "Answer 2",
    },
    {
      ask: "Question2",
      answers: ["Answer1", "Answer2", "Answer3", "Answer4"],
      right: "Answer 1",
    },
    {
      ask: "Question3",
      answers: ["Answer1", "Answer2", "Answer3", "Answer4"],
      right: "Answer 4",
    },
  ];
  var secondsLeft = 30;
  var start = document.getElementById("start");
  var view = document.getElementById("view");
  var timeEl = document.getElementById("timer");
  var question = document.getElementById("question");
  var answers = document.getElementById("answers");
  var message = document.getElementById("message");
  var highscore = 0;
  var questionNumber = 0;
  var rightAnswer = "";
  var userAnswer = "";
  let timerInterval;

  start.addEventListener("click", startQuiz);
  view.addEventListener("click", showScores);

  // On start click
  function startQuiz() {
    document.getElementById("start").classList.add("hide");
    document.getElementById("quiz").classList.remove("hide");
    // start.removeEventListener("click");
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
      message.textContent = "Game Over";
    }
  }

  document.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
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
      // setTimeout(() => {
      question.innerHTML = "";
      answers.innerHTML = "";
      nextQuestion(questions);
      // }, 1000);
    }
  });

  //Check answer
  function checkAnswer() {}

  //Show scores
  function showScores() {
    console.log("scores");
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
};
