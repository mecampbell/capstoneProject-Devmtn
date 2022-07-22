// commented out sections are an API I am working on.

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const resultsBtn = document.getElementById('results-btn');
const resetBtn = document.getElementById('reset-btn');
// const createCharacterBtn = document.getElementById('create-character-btn');
const introMessage = document.getElementById('intro-message');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const containerElement = document.getElementById('container');
const guardianContainer = document.getElementById("guardian-container");
const sentinelContainer = document.getElementById("sentinel-container");
const consularContainer = document.getElementById("consular-container");
const nonJediContainer = document.getElementById("non-jedi-container");
// const characterContainer = document.querySelector('#character-container')
// const form = document.querySelector('form');

// const baseURL = "http://localhost:5555/api/characters" || "https://jediclass.herokuapp.com"

// const characterCallback = ({ data: characters }) => {
//   displayCharacters(characters);
// };

// const errCallback = (err) => {
//   console.log(err)
// };

// const getCharacters = () => axios.get(baseURL).then(characterCallback).catch(errCallback)
// const createCharacter = body => axios.post(baseURL, body).then(characterCallback).catch(errCallback)
// const deleteCharacter = id => axios.delete(`${baseURL}/${id}`).then(characterCallback).catch(errCallback)


let noButton
let currentQuestionIndex
let jediTypeCount = {
  guardianCount: 0,
  sentinelCount: 0,
  consularCount: 0
}
let selectedType = '';

const startGame = () => {
  startBtn.classList.add('hide');
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
  // createCharacterBtn.classList.remove('hide')
}

const setNextQuestion = () => {
  resetState()
  showQuestion(questions[currentQuestionIndex])
};

const resetState = () => {
  nextBtn.classList.add('hide')
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
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
    answerButtons.appendChild(button)
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
  // createCharacterBtn.classList.remove('hide')
  
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

// const submitHandler = (e) => {
//   e.preventDefault()

//   let firstName = document.querySelector('#first-name')
//   let lastName = document.querySelector('#last-name')
//   let characterClass = document.querySelector('#character-class')
//   let imageURL = document.querySelector('#img')

//   let bodyObj = {
//       firstName: firstName.value,
//       lastName: lastName.value, 
//       characterClass: characterClass.value,
//       imageURL: imageURL.value
//   }

//   createCharacter(bodyObj)

//   firstName.value = ''
//   lastName.value = ''
//   characterClass.value = ''
//   imageURL.value = ''
// }

// const createCharacterCard = (character) => {
//   const characterCard = document.createElement('div');
//   characterCard.classList.add('character-card');

//   characterCard.innerHTML = `<img alt='character cover image' src=${character.imageURL} class="character-cover-image"/>
//   <p class="first-name">${character.first_name}</p>
//   <p class="last-name">${character.last_name}</p>
//   <p class="character-class">${character.character_class}</p>
//   <button onclick="deleteHouse(${character.id})">delete</button>
//   `

//   characterContainer.appendChild(characterCard)
// };

// const displayCharacters = (arr) => {
//   charactersContainer.innerHTML = ``;
//   for (let i = 0; i < arr.length; i++) {
//     createCharacterCard(arr[i])
//   };
// };

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++
  jediTypeCount[selectedType]++
  selectedType = '';
  setNextQuestion()
});
resultsBtn.addEventListener('click', showResult);
resetBtn.addEventListener('click', () => {
  location.reload();
});
// createCharacterBtn.addEventListener('submit', submitHandler);

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

