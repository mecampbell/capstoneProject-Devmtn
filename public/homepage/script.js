const startBtn = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const resultsButton = document.getElementById('results-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const containerElement = document.getElementById('container');
const guardianContainer = document.getElementById("guardian-container");
const sentinelContainer = document.getElementById("sentinel-container");
const consularContainer = document.getElementById("consular-container");
const nonJediContainer = document.getElementById("non-jedi-container");

let noButton
let currentQuestionIndex

let jediTypeCount = {
  guardianCount: 0,
  sentinelCount: 0,
  consularCount: 0
}

let selectedType = '';

function startGame() {
  startBtn.classList.add('hide');
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
};

function nonJedi() {
  containerElement.classList.add('hide');
  resultContainer.classList.remove('hide');
  nonJediContainer.classList.remove('hide');
}

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
    if (answer.text === 'No') {
      button.addEventListener('click', nonJedi)
    }
    button.addEventListener('click', (e) => selectAnswer(e, answer.type))
    answerButtonsElement.appendChild(button)
  })
};

function selectAnswer(e, type) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  selectedType = type;
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
  
  if (jediTypeCount.guardianCount >= 2) {
    guardianContainer.classList.remove('hide');
  }
  else if (jediTypeCount.sentinelCount >= 2) {
    sentinelContainer.classList.remove('hide');
  }
  else {
    consularContainer.classList.remove('hide');
  }
};


startBtn.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  jediTypeCount[selectedType]++
  selectedType = '';
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
            { text: 'Attack the thugs', type: "guardianCount"},
            { text: 'Help them flee', type: "sentinelCount"},
            { text: 'Stop the thugs and find out why they are attacking her.', type: "consularCount"}
        ]
    },
    {
        question: "You are in combat with a Dark Jedi allied with the Sith. There is a pause in the combat. What do you do?",
        answers: [
            { text: 'Attack him again.', type: "guardianCount"},
            { text: 'Find out why he turned to the dark side and try to turn him.', type: "sentinelCount"},
            { text: 'Try to see a weakness in his technique.', type: "consularCount"}
        ]
    },
    {
        question: "There is a locked door and your goal lies on the other side. What do you do?",
        answers: [
            { text: 'Smash the door down.', type: "guardianCount"},
            { text: 'Try to pick the lock.', type: "sentinelCount"},
            { text: 'Knock.', type: "consularCount"}
        ]
    },
    {
        question: "I have a feeling about what you would be best at. But first, the final question. You are the head of an Enclave on a contested world. The Dark Jedi have infiltrated and are causing unrest across the planet. What do you do?",
        answers: [
            { text: 'Hunt them down.', type: "guardianCount"},
            { text: 'Try to lure them out into a trap.', type: "sentinelCount"},
            { text: 'Coordinate with the planetary government to identify the infiltrators.', type: "consularCount"}
        ]
    }
]

