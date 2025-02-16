const moreBtn = document.querySelector(
  "#more-btn");


function displayMoreDogs() {
  
  const dogCount = 5;

  for (var i = 0; i <
    dogCount; i++) {
    getDogs();
  }

}


async function getDogs() {

  let URL = "https://dog.ceo/api/breeds/image/random";

  let response = await fetch(URL);
  let dogData = await response.json();
  
  let imageUrl = dogData.message;
  displayDogs(imageUrl);
}

function displayDogs(imageUrl) {

  let dog = document
    .createElement("div");
  let image = document.createElement(
    "img");

  dog.setAttribute("id",
    "dog");
  image.setAttribute("id",
    "dog-img");

  image.src = imageUrl;
  

  const dogsImageContainer = document
    .querySelector(
      "#dogs-image-container");


  dog.append(image);
  dogsImageContainer.append(
    dog);

}


window.addEventListener("load",
  displayMoreDogs);
moreBtn.addEventListener("click",
  displayMoreDogs);