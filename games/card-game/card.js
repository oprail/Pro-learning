const BASE_PATH = `/games/card-game/cards/`;

const original_deck = [
  {
  cardName: "AIR-M1",
  manaCost: 1,
  damage: 1,
  cardType : "element",
  },
  {
  cardName: "EARTH-M1",
  manaCost: 1,
  damage: 1,
  cardType : "element",
  },
  {
  cardName: "FIRE-M1",
  manaCost: 1,
  damage: 1,
  cardType : "element",
  },
  {
  cardName: "WATER-M1",
  manaCost: 1,
  damage: 1,
  cardType : "element",
  },
  {
  cardName: "neutralize",
  manaCost: 1,
  damage: 1,
  cardType: "element",
  },
  {
  cardName: "kraken",
  manaCost: 3,
  damage: 4,
  cardType: "creature",
  specialMove: () => {
    
   },
  },
  {
  cardName: "lightning_dragon",
  manaCost: 3,
  damage: 4,
  cardType: "creature",
  specialMove: () => {
    
   },
  },
  {
  cardName: "victim",
  manaCost: 2,
  damage: 0,
  cardType: "special",
  specialMove: (target) => {
    
    let i = Math.floor(Math.random() * 2);
    
    if (target == "player" && i == 0) {
      playerHealth -= 3;
    } else if (target == "dealer" && i == 0) {
      dealerHealth -= 3;
    }
   },
  },
  {
  cardName: "heal",
  manaCost: 2,
  damage: 0,
  cardType: "special",
  specialMove: (target) => {
    
    if (target == "player") {
      dealerHealth += 3;
    } else if (target == "dealer") {
      playerHealth += 3;
    }
    
   },
  },
];



const playerCardsBox = document.querySelector(".player-cards");
const dealerCardsBox = document.querySelector(".dealer-cards");
const playerBoardCard = document.querySelector("#player-board-card");
const dealerBoardCard = document.querySelector("#dealer-board-card");
const playerHealthBar = document.querySelector("#player-healthBar");
const dealerHealthBar = document.querySelector("#dealer-healthBar");
const playerManaBar = document.querySelector("#player-manaBar");
const dealerManaBar = document.querySelector("#dealer-manaBar");
const board = document.querySelector(".board"); 

const playCardBtn = document.querySelector("#playCardBtn");





playCardBtn.addEventListener("click",play)


// variables
let addCards = 2;
let maxCards = 4;
let gameOver = false;
let maxCardsLimit = false;

let deckSize = original_deck.length;
let PLAYER_DECK = [];
let DEALER_DECK = [];

let playerHealth = 15;
let dealerHealth = 15;
let damageTo = null;

let playerCards;
let dealerCards;
let playerPlayedCard;
let dealerPlayedCard;


// on load
dealerHealthBar.innerText = dealerHealth;
playerHealthBar.innerText = playerHealth;
prepareDeck();
drawCards();


function prepareDeck() {
   
   for (let i = 0; i <= deckSize; i++) {
     
     let index = Math.floor(Math.random() * deckSize);
     
     DEALER_DECK.push(original_deck[index]);
     
   }
   
   
   for (let i = 0; i <= deckSize; i++) {
     
     let index = Math.floor(Math.random() * deckSize);
     
     PLAYER_DECK.push(original_deck[index]);
     
   }
   
}


function drawCards() {
   
   let playerCardObj = PLAYER_DECK.pop();
   let dealerCardObj = DEALER_DECK.pop();
   
   
   let playerCard = document.createElement("img");
   playerCard.src = `${BASE_PATH}${playerCardObj.cardName}.png`;
   playerCard.classList.add("card");
   
   let dealerCard = document.createElement("img");
   dealerCard.src = `${BASE_PATH}${dealerCardObj.cardName}.png`;
   dealerCard.classList.add("card");
   
   playerCardsBox.append(playerCard);
   dealerCardsBox.append(dealerCard);
   
   playerCards = playerCardsBox.querySelectorAll(".card");
   
   
   playerCards.forEach((card) => {
     
     if (playerCards.length >= maxCards) {
       maxCardsLimit = true;
      }
      
      
     card.addEventListener("click", () => {
        playerCards.forEach((card) => {
       
        card.classList.remove("selectedCard");
        })
        card.classList.add("selectedCard");
        playCardBtn.style.display = "inline-block";
        playCardBtn.disabled = false;
      });
    });
}


function play() {
   
   playerPlay();
   identifyCard();
   
   if (playerPlayedCard.cardType === "element") {
     
     dealerPlay();
     identifyCard();
     
     if (dealerPlayedCard.cardType === "element") {
       compareElementCards();
     } else {
       
       damageTo = "dealer";
       dealDamage(playerPlayedCard.damage);
       
       damageTo = "player";
       dealDamage(dealerPlayedCard.damage);
       dealerPlayedCard.specialMove("dealer");
       
     }
     
     
   } else if (playerPlayedCard.cardType === "creature") {
    
     damageTo = "dealer";
     dealDamage(playerPlayedCard.damage);
     dealerAttack();
     
   } else if (playerPlayedCard.cardType === "special") {
  
     
     damageTo = "dealer";
     dealDamage(playerPlayedCard.damage);
     
     playerPlayedCard.specialMove("dealer");
     
     dealerAttack();
     
   }
   
   
   
   if (!maxCardsLimit) {
     for (var i = 0; i < addCards; i++) {
       drawCards();
     }
   }
   
   checkWinner();
   
}


function dealerAttack() {
   
   dealerPlay();
   identifyCard();
   
   if (dealerPlayedCard.cardType === "element") {
  
   damageTo = "player";
   dealDamage(dealerPlayedCard.damage);
   
   } else if (dealerPlayedCard.cardType === "creature") {
    
     damageTo = "player";
     dealDamage(dealerPlayedCard.damage);
     
   } else if (dealerPlayedCard.cardType === "special"){
     
     damageTo = "player";
     dealDamage(dealerPlayedCard.damage);
     dealerPlayedCard.specialMove("player");
     
   }
}


function playerPlay() {
   
   playerCards.forEach((card) => {
     
     if (card.classList.contains("selectedCard")) {
       
       playerBoardCard.src = card.src;
       card.remove();
       
       playCardBtn.disabled = true;
       
     }
   });
}


function dealerPlay() {
   
   let dealerCards = dealerCardsBox.querySelectorAll(".card");
   let index = Math.floor(Math.random() * dealerCards.length);
   
   dealerBoardCard.src = dealerCards[index].src;
   
   dealerCards[index].remove();
   playCardBtn.style.display = "inline-block";
}


function identifyCard() {
   
   
   let playerCardName = playerBoardCard.src.slice(44);
   playerCardName = playerCardName.replace(".png", "");
   
   let dealerCardName = dealerBoardCard.src.slice(44);
   dealerCardName = dealerCardName.replace(".png", "");
   
   
   for (let card of original_deck) {
     
     if (card.cardName === playerCardName) {
       
       playerPlayedCard = card;
       
     }
   }
   
   for (let card of original_deck) {
     
     if (card.cardName === dealerCardName) {
       
       dealerPlayedCard = card;
       
     }
   }
}


function compareElementCards() {
   
   if (
     playerPlayedCard.cardName === "FIRE-M1" && dealerPlayedCard.cardName === "EARTH-M1" ||
     playerPlayedCard.cardName === "EARTH-M1" && dealerPlayedCard.cardName === "AIR-M1" ||
     playerPlayedCard.cardName === "AIR-M1" && dealerPlayedCard.cardName === "WATER-M1" ||
     playerPlayedCard.cardName === "WATER-M1" && dealerPlayedCard.cardName === "FIRE-M1" 
     ) {
     
     damageTo = "dealer";
     dealDamage(dealerPlayedCard.damage);
     
   } else if (
     dealerPlayedCard.cardName === "FIRE-M1" && playerPlayedCard.cardName === "EARTH-M1" ||
     dealerPlayedCard.cardName === "EARTH-M1" && playerPlayedCard.cardName === "AIR-M1" ||
     dealerPlayedCard.cardName === "AIR-M1" && playerPlayedCard.cardName === "WATER-M1" ||
     dealerPlayedCard.cardName === "WATER-M1" && playerPlayedCard.cardName === "FIRE-M1" 
     ) {
       
     damageTo = "player";
     dealDamage(playerPlayedCard.damage);
     
   } else {
     
     damageTo = "player";
     dealDamage(playerPlayedCard.damage);
     damageTo = "dealer";
     dealDamage(dealerPlayedCard.damage);
     
   }
}


function dealDamage(damage) {
   
   if (damageTo === "player") {
     
     playerHealth -= damage;
     
   } else if (damageTo === "dealer") {
     
     dealerHealth -= damage;
    
   }
}


function checkWinner() {
   
   playerHealthBar.innerText = playerHealth;
   dealerHealthBar.innerText = dealerHealth;
   console.log("dealer h=>",dealerHealth);
   console.log("player h=>",playerHealth);
   
   
   if (playerHealth <= 0 || dealerHealth <= 0) {
     gameOver = true;
   }
   
   
   playerCards = playerCardsBox.querySelectorAll(".card");
   
   if (maxCardsLimit && playerCards.length == 0) {
     gameOver = true;
   }
   
   
   
   if (!gameOver) return;
   playCardBtn.style.display = "none";
   playerCardsBox.style.display = "none";
   dealerCardsBox.style.display = "none";
   
   
   
   if (playerHealth > dealerHealth) {
   
     board.innerHTML = `<span id="blue">Player Won!</sapan>`;
     
   } else if (playerHealth < dealerHealth) {
     
     board.innerHTML = `<span id="red">Dealer Won!</sapan>`;
     
   } else if (playerHealthBar.innerText === dealerHealthBar.innerText) {
     
     board.innerHTML = `<span id="draw">its a draw!</sapan>`;
     
   }
}




