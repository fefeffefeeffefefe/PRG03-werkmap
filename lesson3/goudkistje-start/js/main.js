window.addEventListener('load', init);
//Global variables
const winnerImage = 'goudkistje';
let imageList = ['ballonnen', 'cars', 'planes', 'goudkistje'];
let playingField;
let lastTarget;
let alert;
let answer;

/**
 * Initialize after the DOM is ready
 */
function init()
{
  playingField = document.getElementById('playing-field');
  createPlayField();

  playingField.addEventListener('click', playingFieldClickHandler);

  const form = document.getElementById('play-form');
  form.addEventListener('submit', formSubmitHandler);
  console.log(form)
  alert = document.getElementById('alert');
  answer = document.getElementById('guess-number');

}

/**
 * Generate the playing field dynamically with all the available images
 */
function createPlayField()
{
  imageList = shuffleArray(imageList)

  for (let i = 0; i < imageList.length; i++) {
    const createDiv = document.createElement("div");
    createDiv.classList.add('playing-card');
    playingField.appendChild(createDiv);

    const createH2 = document.createElement('h2');
    createH2.innerHTML = i.toString();
    createDiv.appendChild(createH2);

    const img = document.createElement('img');
    img.src = `img/vraagteken-plaatjes.png`;
    img.dataset.imageIndex = i.toString();
    createDiv.appendChild(img);



  }
}

/**
 * Show the card by its front so the player knows whats going on
 *
 * @param e
 */
function playingFieldClickHandler(e)
{
  let clickedItem = e.target;
  if (clickedItem.nodeName !== 'IMG') {
    return;
  }
  if (lastTarget) {
  lastTarget.src = `img/vraagteken-plaatjes.png`;
  }

  // console.log(e.target);
  clickedItem.src = `img/${imageList[clickedItem.dataset.imageIndex]}.png`;
  lastTarget = clickedItem;
}

/**
 * Handler for when the form is submitted
 *
 * @param e
 */
function formSubmitHandler(e)
{
  e.preventDefault();
  const guessNumber = answer.value;
  if (imageList[guessNumber] === winnerImage) {
    writeFeedbackMessage('yuh uh');
  } else {
    writeFeedbackMessage('nuh uh')
  }

}

/**
 * Write text for the user as feedback of their answer
 *
 * @param text
 */
function writeFeedbackMessage(text)
{
  alert.innerHTML = "";
  const span = document.createElement('span');
  span.innerHTML = text;
  alert.appendChild(span);
}

/**
 * Randomize array using sort
 * @param array
 * @returns {*}
 */
function shuffleArray(array)
{
  return array.sort(() => (Math.random() - 0.5));
}

