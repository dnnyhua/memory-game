const gameContainer = document.getElementById("game"); // the div is the game container
const restartButton = document.getElementById('restart');
let cardsPicked = [];
let cardsId = [];
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color and ID with value of i
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let i = 0; i < colorArray.length; i++ ) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute and an ID
    newDiv.classList.add(colorArray[i]);
    newDiv.setAttribute('id', i);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// When a card is clicked on
function handleCardClick(e) {
  if (noClicking) return;
  let currentCard = e.target
  console.log("you just clicked", e.target);

  // push to global arrays
  cardsPicked.push(currentCard);
  cardsId.push(currentCard.getAttribute('id'));

  currentCard.style.backgroundColor=currentCard.classList[0]

  if(cardsPicked.length === 2){
    noClicking = true;
    setTimeout(compareCards, 1000);
  }
}

// compare cards
function compareCards() {
  const card1 = cardsPicked[0];
  const card2 = cardsPicked[1];
  const cardOneId = cardsId[0];
  const cardTwoId = cardsId[1];

  // if the same card is clicked it will flip that card back over
  if (cardOneId == cardTwoId) {
    card1.style.backgroundColor = "";
    card2.style.backgroundColor = "";
  }
  // if there is a match remove event listener so that we cannot click on it again
  else if (card1.classList[0] === card2.classList[0]) {
    console.log('its a match');

    card1.removeEventListener("click", handleCardClick);
    card2.removeEventListener("click", handleCardClick);
  }
  else {
    console.log('not a match');
    card1.style.backgroundColor = "";
    card2.style.backgroundColor = "";
  }
  cardsPicked = [];
  cardsId = [];
  noClicking = false;
}



// // restart button option 1
// restartButton.addEventListener("click", function(){
//   cardsPicked = [];
//   cardsId = [];
//   let allCards = document.querySelectorAll('div')
//   for (const card of allCards) {
//     card.style.backgroundColor = ""


//   }
  
// })


// restart button option 2
restartButton.addEventListener("click",function(){
  window.location.reload();
})






// when the DOM loads
createDivsForColors(shuffledColors);

