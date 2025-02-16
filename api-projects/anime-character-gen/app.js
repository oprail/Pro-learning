const moreBtn = document.querySelector(
  "#more-btn");


function displayMoreCharactors() {
  
  const characterCount = 5;

  for (var i = 0; i <
    characterCount; i++) {
    getCharacters();
  }

}


async function getCharacters() {

  let URL =
    "https://api.jikan.moe/v4/random/characters";

  let response = await fetch(URL);
  let data = await response.json();
  
  let characterUrl = data.data.images
    .jpg.image_url;
  let characterName = data.data.name;

  displayCharacter(characterUrl,
    characterName)

}

function displayCharacter(characterUrl,
  characterName) {

  let charactor = document
    .createElement("div");
  let image = document.createElement(
    "img");
  let nameP = document.createElement(
    "p");

  charactor.setAttribute("id",
    "character");
  image.setAttribute("id",
    "character-img");
  nameP.setAttribute("id",
    "character-name");

  image.src = characterUrl;
  nameP.innerText = characterName;


  const allCharacterContainer = document
    .querySelector(
      "#all-character-container");


  charactor.append(image);
  charactor.append(nameP);
  allCharacterContainer.append(
    charactor);

}


window.addEventListener("load",
  displayMoreCharactors);
moreBtn.addEventListener("click",
  displayMoreCharactors);