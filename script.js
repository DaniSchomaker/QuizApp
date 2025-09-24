let questions = [
  {
    question: "Wer ist der Schöpfer des Spiels „Minecraft“?",
    answer_1: "Markus „Notch“ Persson",
    answer_2: "Shigeru Miyamoto",
    answer_3: "Hideo Kojima",
    answer_4: "Gabe Newell",
    right_answer: 1,
  },
  {
    question:
      "Welches Raumschiff ist das schnellste im Star-Wars-Universum (laut Han Solo)?",
    answer_1: "X-Wing",
    answer_2: "Millennium Falcon",
    answer_3: "TIE Fighter",
    answer_4: "Star Destroyer",
    right_answer: 2,
  },
  {
    question:
      "In welcher Programmiersprache ist Linux ursprünglich geschrieben worden?",
    answer_1: "C",
    answer_2: "Java",
    answer_3: "Python",
    answer_4: "Assembly",
    right_answer: 1,
  },
  {
    question: "Was bedeutet die Abkürzung „NPC“ in Videospielen?",
    answer_1: "Non-Playable Character",
    answer_2: "New Player Character",
    answer_3: "Non-Player Controller",
    answer_4: "Next Player Command",
    right_answer: 1,
  },
  {
    question: "Wer ist der Schöpfer von Spider-Man?",
    answer_1: "Alan Moore",
    answer_2: "Stan Lee",
    answer_3: "Frank Miller",
    answer_4: "Jack Kirby",
    right_answer: 2,
  },
  {
    question:
      "In 'Zurück in die Zukunft II': Auf welches Jahr reist Marty McFly zuerst in die Zukunft?",
    answer_1: "2012",
    answer_2: "2015",
    answer_3: "2020",
    answer_4: "2025",
    right_answer: 2,
  },
  {
    question: "Was bedeutet das Kürzel „LAN“?",
    answer_1: "Local Area Network",
    answer_2: "Large Access Node",
    answer_3: "Line Access Net",
    answer_4: "Logical Application Number",
    right_answer: 1,
  },
  {
    question:
      "Welche Konsole brachte als erste das Spiel „Super Mario Bros.“ heraus?",
    answer_1: "Sega Mega Drive",
    answer_2: "Nintendo Entertainment System (NES)",
    answer_3: "Atari 2600",
    answer_4: "PlayStation 1",
    right_answer: 2,
  },
  {
    question: "Welches Pokémon trägt die Nummer 25 im Pokédex?",
    answer_1: "Glumanda",
    answer_2: "Pikachu",
    answer_3: "Bisasam",
    answer_4: "Mewtu",
    right_answer: 2,
  },
  {
    question: "Welches Science-Fiction-Universum enthält die Fraktion „Borg“?",
    answer_1: "Star Trek",
    answer_2: "Battlestar Galactica",
    answer_3: "Stargate",
    answer_4: "Doctor Who",
    right_answer: 1,
  },
];

let currentQuestion = 0;
let rightAnswers = 0;
let AUDIO_SUCCESS = new Audio("./sounds/correct.mp3");
let AUDIO_FAIL = new Audio("./sounds/wrong.mp3");

function init() {
  document.getElementById("all_questions").innerHTML = questions.length;
  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    showNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length; // Wenn die Bedingung erfüllt ist --> return: "true" (sonst "false")
}

function showEndScreen() {
  document.getElementById("end_screen").style = ""; // Der Style wird durch GAR NICHTS ersetzt --> "display: none" ist weg
  document.getElementById("question_body").style = "display: none";
  document.getElementById("all_questions_end").innerHTML = questions.length;
  document.getElementById("right_answers_end").innerHTML = rightAnswers;
  document.getElementById("header_img").src = "./img/tropy.png";
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length; // ///////////////Hier ist ein Fehler! Die Prozente passen nicht
  percent = Math.round(percent * 100); // sieht mathematisch komisch aus, ist aber so
  document.getElementById("progress_bar").innerHTML = `${percent} %`;
  document.getElementById("progress_bar").style.width = `${percent}%`;
}

function showNextQuestion() {
  let question = questions[currentQuestion]; // ich definiere einen Container (question), in dem eine Frage reinkopiert wird
  document.getElementById("question_number").innerHTML = currentQuestion + 1;
  document.getElementById("question_text").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function answer(selection) {
  // Es wird - je nachdem welcher Button gedrückt wird - "answer_1", "answer_2" etc. übergeben
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1); // ich hole mir die entsprechende "answer"-Zahl (1, 2, 3 oder 4)
  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (selectedQuestionNumber == question["right_answer"]) {
    document
      .getElementById(selection)
      .parentElement.classList.add("bg-success"); // CSS-Klasse dem übergeordnetem Element (optional) hinzufügen
    AUDIO_SUCCESS.play();
    rightAnswers++;
  } else {
    document.getElementById(selection).parentElement.classList.add("bg-danger");
    document
      .getElementById(idOfRightAnswer)
      .parentElement.classList.add("bg-success");
    // die richtige Lösung wird angezeigt
    AUDIO_FAIL.play();
  }
  document.getElementById("next_button").disabled = false; // Der Button "Nächste Frage" wird sichtbar
}

function nextQuestion() {
  currentQuestion++; // zB von 0 auf 1
  resetAnswerButton();
  showQuestion();
}

function resetAnswerButton() {
  document.getElementById("next_button").disabled = true;
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restartGame() {
  document.getElementById("header_img").src = "./img/logo.png";
  document.getElementById("question_body").style = ""; // Display: none wird rausgenommen, sodass die Fragen wieder angezeigt werden
  document.getElementById("end_screen").style = "display: none";

  currentQuestion = 0;
  rightAnswers = 0;
  init();
}
