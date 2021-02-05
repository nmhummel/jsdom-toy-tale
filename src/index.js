let addToy = false;
const toyCollection = document.getElementById('toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// need fetch, after fetch req. add to DOM
fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(json => gotToys(json)) //callback function need def of func. 
// .then(gotToys) json gets passed as arg automatically

function gotToys(toys) {
  //debugger
  toys.forEach(toy => {
    createCard(toy)
  });
}

function createCard(toy) {
  // make a div with class card
  const card = document.createElement('div')
  card.classList.add('card')
  
  const h2 = document.createElement('h2')
  h2.innerText = toy.name

  const image = document.createElement('img')
  image.classList.add('toy-avatar')
  image.src = toy.image

  const para = document.createElement('p')
  para.innerText = `${toy.likes} Likes`

  const button = document.createElement('button')
  button.classList.add('like-btn')
  button.innerText = "Like <3"

  toyCollection.appendChild(card)
  card.appendChild(h2)
  card.appendChild(image)
  card.appendChild(para)
  card.appendChild(button)
}

function updateLike(e, toy){
  // needs to increase by every click & capture how many likes there are
  // update innerText & our database
  let likes = toy.likes
  likes++;
  toy.likes = likes
  e.target.parentElement.querySelector('p').innerText = `${likes} likes`
}
  
  //fetch post to /toys
function createToy(toy) {
  fetch(`http://localhost:3000/items/${id}`, configObj)
  .then(r => r.json())
  .then(json => alert(json.message))
}


const toyInfo = {
  "name": toy.name.value,
  "image": toy.image.value,
  "likes": toy.likes.value
}

const configObj = {
  method: 'POST',
  headers: {
     "Content-Type": "application/json",
     Accept: "application/json"
  },
  body: JSON.stringify(toyInfo)
}