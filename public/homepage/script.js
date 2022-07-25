const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const resultsBtn = document.getElementById('results-btn');
const resetBtn = document.getElementById('reset-btn');
const answerBtns = document.getElementById('answer-buttons');
const getBtn = document.getElementById('get-btn');
const submitBtn = document.getElementById('submit-btn')
const form = document.getElementById('form')
const introMessage = document.getElementById('intro-message');
const questionElement = document.getElementById('question');
const containerElement = document.getElementById('container');

const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const guardianContainer = document.getElementById("guardian-container");
const sentinelContainer = document.getElementById("sentinel-container");
const consularContainer = document.getElementById("consular-container");
const nonJediContainer = document.getElementById("non-jedi-container");

const baseURL = "http://localhost:5555";
const masterURL = `${baseURL}/api/masters`;
const newPersonURL = `${baseURL}/api/archives`

const getMaster = () => {
  axios.get(masterURL)
  .then(res => {
    const data = res.data;
    alert(data)
  })
}

const newPerson = () => {
  axios.post(newPersonURL)
  .then(() => alert(`a record has been added to the archives`))
}

let noButton;
let currentQuestionIndex;
let jediTypeCount = {
  guardianCount: 0,
  sentinelCount: 0,
  consularCount: 0
};
let selectedType = '';

const startGame = () => {
  startBtn.classList.add('hide');
  form.classList.add('hide');
  introMessage.classList.add('hide');
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  setNextQuestion();
};

const nonJedi = () => {
  containerElement.classList.add('hide');
  resultContainer.classList.remove('hide');
  nonJediContainer.classList.remove('hide');
  resetBtn.classList.remove('hide');
  getBtn.classList.remove('hide');
};

const setNextQuestion = () => {
  resetState()
  showQuestion(questions[currentQuestionIndex])
};

const resetState = () => {
  nextBtn.classList.add('hide')
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild)
  }
};

const showQuestion = (question) => {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.text === 'No') {
      button.addEventListener('click', nonJedi)
    }
    button.addEventListener('click', (e) => selectAnswer(e, answer.type))
    answerBtns.appendChild(button)
  })
};

const selectAnswer = (e, type) => {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  selectedType = type;
  if (questions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove('hide')
  } else {
    resultsBtn.classList.remove('hide')
    startBtn.classList.add('hide')
  }
};

const showResult = () => {
  containerElement.classList.add('hide');
  resultsBtn.classList.add('hide');
  resultContainer.classList.remove('hide');
  resetBtn.classList.remove('hide');
  getBtn.classList.remove('hide');
  
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
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++
  jediTypeCount[selectedType]++
  selectedType = '';
  setNextQuestion()
  }
);
resultsBtn.addEventListener('click', showResult);
resetBtn.addEventListener('click', () => {
  location.reload();
  }
);
getBtn.addEventListener('click', getMaster);
submitBtn.addEventListener('click', newPerson);

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

