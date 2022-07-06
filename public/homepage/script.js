const startBtn = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex, guardian, sentinel, consular

startBtn.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
    startBtn.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.guardian) {
        guardian++
    } else if (answer.sentinel) {
        sentinel++
    } else if (answer.consular) {
        consular++
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startBtn.innerText = 'Restart'
    startBtn.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

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
            { text: 'Help them flee', correct: true },
            { text: 'Attack the thugs', correct: false },
            { text: 'Stop the thugs and find out why they are attacking her.', correct: false }
        ]
    },
    {
        question: "You are in combat with a Dark Jedi allied with the Sith. There is a pause in the combat. What do you do?",
        answers: [
            { text: 'Attack him again.', correct: true },
            { text: 'Find out why he turned to the dark side and try to turn him.', correct: false },
            { text: 'Try to see a weakness in his technique.', correct: false }
        ]
    },
    {
        question: "There is a locked door and your goal lies on the other side. What do you do?",
        answers: [
            { text: 'Smash the door down.', correct: true },
            { text: 'Try to pick the lock.', correct: false },
            { text: 'Knock.', correct: false }
        ]
    },
    {
        question: "I have a feeling about what you would be best at. But first, the final question. You are the head of an Enclave on a contested world. The Dark Jedi have infiltrated and are causing unrest across the planet. What do you do?",
        answers: [
            { text: 'Hunt them down.', correct: true },
            { text: 'Try to lure them out into a trap.', correct: false },
            { text: 'Coordinate with the planetary government to identify the infiltrators.', correct: false }
        ]
    }
]