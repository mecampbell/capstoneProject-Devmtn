const startBtn = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const resultsButton = document.getElementById('results-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultContainer = document.getElementById('result-container');
const containerElement = document.getElementById('container');

let currentQuestionIndex, guardian, sentinel, consular

function startGame() {
  startBtn.classList.add('hide');
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
};

function setNextQuestion() {
  resetState()
  showQuestion(questions[currentQuestionIndex])
}

function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    resultsButton.classList.remove('hide')
    startBtn.classList.add('hide')
  }
}

const showResult = () => {
  containerElement.classList.add('hide');
  resultsButton.classList.add('hide');
  resultContainer.classList.remove('hide');
  // if (guardian > 2) {
  //   resultContainer.classList.add('guardian');
  // }
}

startBtn.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
resultsButton.addEventListener('click', showResult)

const questions = [
    {
        question: "Are you ready to be a Jedi?",
        answers: [
            { text: 'Yes', correct: true },
            { text: 'No', correct: false },
        ]
    },
    {
        question: "A woman and her small child are beset by a desperate-looking group of thugs. They are menacing her with weapons and she screams to you for help. What do you do?",
        answers: [
            { text: 'Help them flee', guardian },
            { text: 'Attack the thugs', sentinel },
            { text: 'Stop the thugs and find out why they are attacking her.', consular }
        ]
    },
    {
        question: "You are in combat with a Dark Jedi allied with the Sith. There is a pause in the combat. What do you do?",
        answers: [
            { text: 'Attack him again.', guardian },
            { text: 'Find out why he turned to the dark side and try to turn him.', sentinel },
            { text: 'Try to see a weakness in his technique.', consular }
        ]
    },
    {
        question: "There is a locked door and your goal lies on the other side. What do you do?",
        answers: [
            { text: 'Smash the door down.', guardian },
            { text: 'Try to pick the lock.', sentinel },
            { text: 'Knock.', consular }
        ]
    },
    {
        question: "I have a feeling about what you would be best at. But first, the final question. You are the head of an Enclave on a contested world. The Dark Jedi have infiltrated and are causing unrest across the planet. What do you do?",
        answers: [
            { text: 'Hunt them down.', guardian },
            { text: 'Try to lure them out into a trap.', sentinel },
            { text: 'Coordinate with the planetary government to identify the infiltrators.', consular }
        ]
    }
]