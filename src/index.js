let addToy = false;
const toyCollection = document.getElementById('toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  addToyForm()
  gotToys()
  const toyForm = document.querySelector(".add-toy-form")
  toyForm.addEventListener('submit', createToy)
});  

function addToyForm(){
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
  })
};

// need fetch, after fetch req. add to DOM
fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(json => gotToys(json)) //callback function need def of func. 
// .then(gotToys) json gets passed as arg automatically

function gotToys(toys) {
  toys.forEach(toy => { createCard(toy) });
};

function createToy(event) {
  event.preventDefault()
  const nameInput = event.target.name
  const imageInput = event.target.image
  const toyName = nameInput.value 
  const toyImage = imageInput.value 
  
  const formData = { name: toyName, image: toyImage, likes: 0 }

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch("http://localhost:3000/toys", configObj)
    .then((resp) => resp.json())
    .then((object) => { createToyCard(object) })
    .catch((error) => { console.log(error.message) })
    
    //clear form
  nameInput.value = ""
  imageInput.value = ""
};

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
  button.addEventListener('click', (e) => updateLike(e, toy))
};

function updateLike(e, toy) {
  // needs to increase by every click & capture how many likes there are
  // update innerText & our database
  toy.likes++
  //let totalLikes = toy.likes
  //totalLikes++;
  //toy.likes = totalLikes
  e.target.parentElement.querySelector('p').innerText = `${toy.likes} likes`

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({"likes": toy.likes})
  }) 
  .then(res => res.json())
  .then(json => totalLikes)// you are here
};

