// Global
const monsterList = [
  {
    name: 'Dr. Jekyll',
    value: '1',
    image: '../../images/monster/dr-jekyll.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'The Space Kook',
    value: '1',
    image: '../../images/monster/space-kook.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'The Witch',
    value: '1',
    image: '../../images/monster/witch.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'The Snow Ghost',
    value: '2',
    image: '../../images/monster/snow-ghost.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'Captain Cutler',
    value: '2',
    image: '../../images/monster/captain-cutler.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'The Werewolf',
    value: '2',
    image: '../../images/monster/werewolf.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'The Clown',
    value: '3',
    image: '../../images/monster/clown.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'The Headless Specter',
    value: '3',
    image: '../../images/monster/headless-specter.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'Charlie the Robot',
    value: '3',
    image: '../../images/monster/robot.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'Miner Forty-Niner',
    value: '4',
    image: '../../images/monster/miner.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'The Creeper',
    value: '4',
    image: '../../images/monster/creeper.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'The Zombie',
    value: '4',
    image: '../../images/monster/zombie.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'The Mummy of Ankha',
    value: '5',
    image: '../../images/monster/mummy.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'Captain Redbeard',
    value: '5',
    image: '../../images/monster/redbeard.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
  {
    name: 'The Black Knight',
    value: '5',
    image: '../../images/monster/black-knight.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis ultrices magna. Nam non vulputate enim.'
  },
];

let answers = [];
const answerValues = [];
const answerNames = [];
let monsterMatches = [];

// Elements
const form = document.getElementById('form');
const monsters = document.getElementById('monsters');
const modal = document.getElementById('modal');
const resultsContainer = document.getElementById('results');
const radioInputs = document.querySelectorAll('input'); 
const questions = document.querySelectorAll('.question');
let finalMatches;

// Functions
function getMostFrequent(array){
  return array.sort((a,b) =>
    array.filter(variable => variable === a).length - array.filter(variable => variable === b).length
  ).pop();
}

function startQuiz () {
  modal.style.display = 'none';
  monsters.style.display = 'none';
  form.style.display = 'block';
}

function addResultsToPage () {
  monsterMatches.forEach((element) => {
    const monsterMatch = document.createElement("div");
    monsterMatch.innerHTML = `<div class="overlay">${element.description}</div><p>${element.name}</p>`;
    monsterMatch.setAttribute('class','monster-match');
    monsterMatch.style.backgroundImage = `url(${element.image}`;

    resultsContainer.appendChild(monsterMatch); 
  });
}

function getResults () {
  answers.forEach((element) => {
    answerValues.push(element.value);
  });

  const mostFrequent = getMostFrequent(answerValues);

  monsterList.forEach((element) => {
    if (element.value === mostFrequent){
      monsterMatches.push(element);
    }
  });

  addResultsToPage();
}

function displayRadioValue() { 
  for(let i = 0; i < radioInputs.length; i++) { 
    if(radioInputs[i].checked) {
      answers.push(radioInputs[i]);
      answerNames.push(radioInputs[i].previousElementSibling.getAttribute('class'));
    }
  } 
} 

function submitQuiz (e) {
  e.preventDefault();

  for (let i = 0; i < questions.length; i++) {
    if (!questions[i].querySelectorAll('.selected').length){
      questions[i].classList.add('error');
    } else {
      questions[i].classList.remove('error');
    };
  }

  if (document.querySelectorAll('.error').length){
    document.getElementById('error-container--form').style.display = 'inline-block';
    window.scrollTo(0,0);
    return
  }

  form.style.display = 'none';
  resultsContainer.style.display = 'block';

  displayRadioValue();
  getResults();
  selectFinalMatch();
}

function selectFinalMatch () {
  finalMatches = document.querySelectorAll('.monster-match');
  finalMatches.forEach(item => {
    item.addEventListener('click', event => {
      for (var i = 0; i < finalMatches.length; i++) {
        finalMatches[i].classList.remove('selected-monster');
        finalMatches[i].classList.remove('error');
        document.getElementById('error-container--final').style.display = 'none';
      }

      // Add selected class
      item.classList.add('selected-monster');
    });
  });
}

function startOver () {
  location.reload();
}

function addCompleteInfo () {
  let dateLocation = document.querySelector('.selected').classList.value.split('selected')[0].trim();

  if (dateLocation === 'museum'){
    dateLocation = 'at the science museum'
  } else if (dateLocation === 'hike'){
    dateLocation = 'on your hike'
  } else if (dateLocation === 'carnival'){
    dateLocation = 'at the carnival'
  } else if (dateLocation === 'home'){
    dateLocation = 'hanging out at home'
  } else if (dateLocation === 'malt-shop'){
    dateLocation = 'at the restaurant'
  }

  for (let i = 0; i < monsterMatches.length; i++) {
    if (monsterMatches[i].image === document.querySelector('.selected-monster').style.backgroundImage.split('url("')[1].split('")')[0]){
      const finalMatch = document.createElement("div");
      finalMatch.innerHTML = `<div style="background-image: url(${monsterMatches[i].image}" class="match-image"></div><div><p class="date-description">Have fun on your date with ${monsterMatches[i].name}! We know you'll have a great time ${dateLocation}, but if you're feeling a little unsure, go ahead and take the quiz again</p><button id="redo-btn">Start over</button></div>`;
      finalMatch.setAttribute('class','final-match');
  
      document.body.appendChild(finalMatch);

      // Start over
      document.getElementById('redo-btn').addEventListener("click", startOver);
    } 
  }
}

function showFinalMatch () {
  if (!document.querySelectorAll('.selected-monster').length){
    for (let i = 0; i < finalMatches.length; i++) {
      if (!finalMatches[i].querySelectorAll('.selected-monster').length){
        finalMatches[i].classList.add('error');
      } 
    }
  }

  if (document.querySelectorAll('.error').length){
    document.getElementById('error-container--final').style.display = 'block';
    window.scrollTo(0,0);
    return
  }

  resultsContainer.style.display = 'none';

  const bodyClass = answerNames[0].split('selected')[0].trim();
  document.body.classList.add(bodyClass);

  addCompleteInfo();
}

document.addEventListener("DOMContentLoaded", function(){
  // Start quiz
  document.getElementById('start-btn').addEventListener("click", startQuiz);

  // Select answer
  const labels = document.querySelectorAll('label');
  labels.forEach(item => {
    item.addEventListener('click', event => {
      let labelGroup = item.getAttribute('for');
      
      for (var i = 0; i < labels.length; i++) {
        if (labels[i].getAttribute('for') === labelGroup){
          labels[i].parentElement.classList.remove('error')
          labels[i].classList.remove('selected')
        }
      }

      // Click radio button
      const radioButton = item.nextElementSibling;
      radioButton.checked = true;
      radioButton.click();

      // Add selected class
      item.classList.add('selected');
    });
  })

  // Submit quiz
  form.addEventListener("submit", submitQuiz);

  // Proceed to final page
  document.getElementById('next-btn').addEventListener("click", showFinalMatch);
});
