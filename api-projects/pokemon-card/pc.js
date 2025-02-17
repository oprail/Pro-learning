const generateCardBtn = document
  .querySelector("#generate-card-btn");
const pokemonImage = document
  .querySelector(".pokemon-image");
const pokemonId = document
  .querySelector(".pokemon-id");
const pokemonType = document
  .querySelector(".type");
const pokemonName = document
  .querySelector(".pokemon-name");
const pokemonHeight = document
  .querySelector(".pokemon-height");
const pokemonWeight = document
  .querySelector(".pokemon-weight");
const pokemonCard = document
  .querySelector(".card");


async function getPokemonData() {
  
  
  setTimeout(() => {
    pokemonCard.style.display = "block";
  },500);
  
  generateCardBtn.disabled = true;
  pokemonCard.classList.toggle("hidden");

  pokemonIdData = Math.floor(Math.random() * 1010) + 1;
  let URL =`https://pokeapi.co/api/v2/pokemon/${pokemonIdData}`;

  try {
    let response = await fetch(URL);
    let pokemonData = await response.json();

    if (!response.ok) {
      console.log("didnt able to get response");
    } else {

      pokemonName.innerText = pokemonData.name;
      pokemonType.innerText = `Type : ${pokemonData.types[0].type.name}`
      pokemonImage.src = pokemonData.sprites.other["official-artwork"].front_default;
      pokemonHeight.innerText = `height : ${pokemonData.height}`;
      pokemonWeight.innerText = `weight : ${pokemonData.weight}`;
      pokemonId.innerText = `#${pokemonIdData}`;

      setTimeout(() => {
        pokemonCard.classList.remove("hidden");
        generateCardBtn.disabled = false;
      }, 500)
    }
  } catch (e) {
    throw e
  }

}

generateCardBtn.addEventListener(
  "click", getPokemonData);
// window.addEventListener("load",getPokemonData);