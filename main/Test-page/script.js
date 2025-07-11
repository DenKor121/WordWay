const questions = [
  {
    question: "What is the English word for 'яблуко'?",
    answers: ["Apple", "Banana", "Orange", "Grapes", "Pear"],
    correct: "Apple"
  },
  {
    question: "What does 'water' mean in Ukrainian?",
    answers: ["Вода", "Повітря", "Їжа", "Світло", "Земля"],
    correct: "Вода"
  },
  {
    question: "Як перекладається слово 'school'?",
    answers: ["Школа", "Робота", "Дім", "Книга", "Мова"],
    correct: "Школа"
  }
];

let correctAnswer = "";
let timeElapsed = 0;
let timerInterval;
let usedQuestions = [];
let correctCount = 0;

function startTimer() {
  timerInterval = setInterval(() => {
    timeElapsed++;
    document.getElementById("timer").innerText = "Час: " + timeElapsed + " сек";
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function shuffleANS(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function loadNewQuestion() {
  if (usedQuestions.length === questions.length) {
    stopTimer();
    document.getElementById("quiz").style.display = "none";
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Тест завершено!<br>Час проходження: ${timeElapsed} сек<br>Правильних відповідей: ${correctCount} з ${questions.length}`;
    resultDiv.style.display = "block";
    return;
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * questions.length);
  } while (usedQuestions.includes(randomIndex));

  usedQuestions.push(randomIndex);
  const currentQuestion = questions[randomIndex];
  correctAnswer = currentQuestion.correct;
  document.getElementById("questionText").innerText = currentQuestion.question;

  let answers = [...currentQuestion.answers];
  shuffleANS(answers);

  for (let i = 0; i < answers.length; i++) {
    const btn = document.getElementById("answer" + (i + 1));
    btn.innerText = answers[i];
    btn.classList.remove("correct", "incorrect");
    btn.disabled = false;
  }
}

function checkAnswer(selectedText, buttonElement) {
  const buttons = document.querySelectorAll(".answers button");
  buttons.forEach(btn => btn.disabled = true);

  if (selectedText === correctAnswer) {
    correctCount++;
    buttonElement.classList.add("correct");
  } else {
    buttonElement.classList.add("incorrect");
    buttons.forEach(btn => {
      if (btn.innerText === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  setTimeout(() => {
    buttons.forEach(btn => {
      btn.classList.remove("correct", "incorrect");
      btn.disabled = false;
    });
    loadNewQuestion();
  }, 2000);
}

window.onload = function () {
  document.getElementById("startTest").addEventListener("click", function () {
    document.getElementById("main-screen").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    startTimer();
    loadNewQuestion();

    for (let i = 0; i < 5; i++) {
      document.getElementById("answer" + (i + 1)).addEventListener("click", function () {
        checkAnswer(this.innerText, this);
      });
    }
  });
};