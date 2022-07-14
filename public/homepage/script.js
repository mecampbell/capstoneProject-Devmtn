const startBtn = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const resultsButton = document.getElementById('results-btn');
// const noButton = document.getElementById('//*[@id="answer-buttons"]/button[2]');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const containerElement = document.getElementById('container');
const guardianContainer = document.getElementById("guardian-container");
const sentinelContainer = document.getElementById("sentinel-container");
const consularContainer = document.getElementById("consular-container");
const nonJediContainer = document.getElementById("non-jedi-container");

let currentQuestionIndex

function startGame() {
  startBtn.classList.add('hide');
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
};

// function nonJedi() {
//   containerElement.classList.add('hide');
//   resultsButton.classList.add('hide');
//   resultContainer.classList.remove('hide');
//   nonJediContainer.classList.remove('hide');
// }

function setNextQuestion() {
  resetState()
  showQuestion(questions[currentQuestionIndex])
};

function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
};

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
};

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    resultsButton.classList.remove('hide')
    startBtn.classList.add('hide')
  }
};

const showResult = () => {
  containerElement.classList.add('hide');
  resultsButton.classList.add('hide');
  resultContainer.classList.remove('hide');
  nonJediContainer.classList.remove('hide');

  // if (questions.answer[1] === true) {
  // }

  // if (questions.answer[0] = 2) {
  //   guardianContainer.classList.remove('hide');
  // }
  // if (questions.answer[1] = 2) {
  //   sentinelContainer.classList.remove('hide');
  // }
  // if (questions.answer[2] = 2) {
  //   consularContainer.classList.remove('hide');
  // }
};


startBtn.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
});
resultsButton.addEventListener('click', showResult);

const questions = [
    {
        question: "Are you ready to be a Jedi?",
        answers: [
            { text: 'Yes'},
            { text: 'No'},
        ]
    },
    {
        question: "A woman and her small child are beset by a desperate-looking group of thugs. They are menacing her with weapons and she screams to you for help. What do you do?",
        answers: [
            { text: 'Help them flee'},
            { text: 'Attack the thugs'},
            { text: 'Stop the thugs and find out why they are attacking her.'}
        ]
    },
    {
        question: "You are in combat with a Dark Jedi allied with the Sith. There is a pause in the combat. What do you do?",
        answers: [
            { text: 'Attack him again.'},
            { text: 'Find out why he turned to the dark side and try to turn him.'},
            { text: 'Try to see a weakness in his technique.'}
        ]
    },
    {
        question: "There is a locked door and your goal lies on the other side. What do you do?",
        answers: [
            { text: 'Smash the door down.'},
            { text: 'Try to pick the lock.'},
            { text: 'Knock.'}
        ]
    },
    {
        question: "I have a feeling about what you would be best at. But first, the final question. You are the head of an Enclave on a contested world. The Dark Jedi have infiltrated and are causing unrest across the planet. What do you do?",
        answers: [
            { text: 'Hunt them down.'},
            { text: 'Try to lure them out into a trap.'},
            { text: 'Coordinate with the planetary government to identify the infiltrators.'}
        ]
    }
]