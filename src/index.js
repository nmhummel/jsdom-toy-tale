let addToy = false;
const toyCollection = document.getElementById('toy-collection')
const sortByLikes = document.getElementById("sort-by-likes")

document.addEventListener("DOMContentLoaded", () => {
  addToyForm()
  //gotToys()
  sortByLikes.addEventListener("click", () => Toy.sortLikes())
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
  console.log(toys)
  toys.forEach(toy => { 
    // instantiate a new toy object
    let t = new Toy(toy) // = new Toy(toy.name, toy.image, toy.likes, toy.id) 
    // add to DOM on toy
    t.createCard()
  });
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
    .then((object) => { 
      let t = new Toy(object)
      t.createCard() 
    })
    .catch((error) => { console.log(error.message) })
    
    //clear form
  nameInput.value = ""
  imageInput.value = ""
};
