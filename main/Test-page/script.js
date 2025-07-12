const questions = [
  { question: "What is the English word for 'яблуко'?", answers: ["Apple", "Banana", "Orange", "Grapes", "Pear"], correct: "Apple" },
  { question: "What does 'water' mean in Ukrainian?", answers: ["Вода", "Повітря", "Їжа", "Світло", "Земля"], correct: "Вода" },
  { question: "Як перекладається слово 'school'?", answers: ["Школа", "Робота", "Дім", "Книга", "Мова"], correct: "Школа" },
  { question: "Що означає слово 'book'?", answers: ["Книга", "Олівець", "Стіл", "Собака", "Сонце"], correct: "Книга" },
  { question: "How do you say 'молоко' in English?", answers: ["Milk", "Juice", "Water", "Bread", "Tea"], correct: "Milk" },
  { question: "Що означає 'sun' українською?", answers: ["Сонце", "Зірка", "Місяць", "Небо", "Дощ"], correct: "Сонце" },
  { question: "Translate 'car' into Ukrainian.", answers: ["Автомобіль", "Дім", "Вікно", "Книга", "Дорога"], correct: "Автомобіль" },
  { question: "What is 'папір' in English?", answers: ["Paper", "Pencil", "Table", "Chair", "Board"], correct: "Paper" },
  { question: "Як перекладається 'window'?", answers: ["Вікно", "Двері", "Стіна", "Стеля", "Підлога"], correct: "Вікно" },
  { question: "What does 'green' mean?", answers: ["Зелений", "Синій", "Жовтий", "Червоний", "Чорний"], correct: "Зелений" },
  { question: "Translate 'кошка' into English.", answers: ["Cat", "Dog", "Bird", "Mouse", "Fish"], correct: "Cat" },
  { question: "Як перекладається 'друзі'?", answers: ["Friends", "Parents", "Children", "Enemies", "Workers"], correct: "Friends" },
  { question: "What is the English for 'стілець'?", answers: ["Chair", "Table", "Bench", "Sofa", "Lamp"], correct: "Chair" },
  { question: "Що означає 'teacher'?", answers: ["Вчитель", "Учень", "Кухар", "Банкір", "Лікар"], correct: "Вчитель" },
  { question: "How do you say 'музика' in English?", answers: ["Music", "Movie", "Dance", "Game", "Show"], correct: "Music" },
  { question: "What is 'ніч' in English?", answers: ["Night", "Morning", "Day", "Evening", "Time"], correct: "Night" },
  { question: "Translate 'cloud' into Ukrainian.", answers: ["Хмара", "Сонце", "Вітер", "Дощ", "Місяць"], correct: "Хмара" },
  { question: "Як перекладається 'computer'?", answers: ["Комп’ютер", "Телефон", "Годинник", "Телевізор", "Калькулятор"], correct: "Комп’ютер" },
  { question: "What does 'language' mean?", answers: ["Мова", "Країна", "Нація", "Слово", "Людина"], correct: "Мова" },
  { question: "Що означає слово 'friend'?", answers: ["Друг", "Брат", "Тато", "Сусід", "Ворог"], correct: "Друг" }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let correctAnswer = "";
let timeElapsed = 0;
let timerInterval;
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
  return arr;
}

function shuffleQuestions() {
  shuffledQuestions = [...questions];
  shuffleANS(shuffledQuestions);
}

function loadNewQuestion() {
  if (currentQuestionIndex >= shuffledQuestions.length) {
    endQuiz();
    return;
  }

  const current = shuffledQuestions[currentQuestionIndex];
  correctAnswer = current.correct;
  document.getElementById("questionText").innerText = current.question;

  const shuffledAnswers = shuffleANS([...current.answers]);
  for (let i = 0; i < 5; i++) {
    const btn = document.getElementById("answer" + (i + 1));
    btn.innerText = shuffledAnswers[i];
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
    currentQuestionIndex++;
    loadNewQuestion();
  }, 2000);
}

function endQuiz() {
  stopTimer();
  document.getElementById("quiz").style.display = "none";
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = `
    <p><strong>Тест завершено!</strong></p>
    <p class="test-p1"><strong>Тест завершено!</strong></p>
    <p class="test-p2">Час проходження: ${timeElapsed} сек</p>
    <p class="test-p3">Правильних відповідей: ${correctCount} з ${shuffledQuestions.length}</p>
    <br>
  `;

  const homeBtn = document.createElement("button");
  homeBtn.innerText = "Повернутися на головний екран";
  homeBtn.style.fontSize = "18px";
  homeBtn.style.padding = "10px 20px";
  homeBtn.style.cursor = "pointer";
  homeBtn.onclick = () => {
    document.getElementById("main-screen").style.display = "flex";
    resultDiv.style.display = "none";
    correctCount = 0;
    timeElapsed = 0;
    currentQuestionIndex = 0;
    document.getElementById("timer").innerText = "Час: 0 сек";
  };

  resultDiv.appendChild(homeBtn);
  resultDiv.style.display = "block";
}

window.onload = function () {
  document.getElementById("startTest").addEventListener("click", function () {
    document.getElementById("main-screen").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    correctCount = 0;
    timeElapsed = 0;
    currentQuestionIndex = 0;
    document.getElementById("result").innerHTML = "";
    document.getElementById("result").style.display = "none";

    shuffleQuestions();
    startTimer();
    loadNewQuestion();

    for (let i = 0; i < 5; i++) {
      document.getElementById("answer" + (i + 1)).addEventListener("click", function () {
        checkAnswer(this.innerText, this);
      });
    }
  });
};
