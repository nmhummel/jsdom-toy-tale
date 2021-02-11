class Toy {

    static allToys = []

    constructor({name, image, likes, id}) {
        this.name = name
        this.image = image
        this.likes = likes
        this.id = id
        Toy.allToys.push(this)
    }

    createCard() {
        const card = document.createElement('div')
            card.classList.add('card')
        const h2 = document.createElement('h2')
            h2.innerText = this.name
        const image = document.createElement('img')
            image.classList.add('toy-avatar')
            image.src = this.image
        const para = document.createElement('p')
            para.innerText = `${this.likes} Likes`
        const button = document.createElement('button')
            button.classList.add('like-btn')
            button.innerText = "Like <3"
        toyCollection.appendChild(card)
        card.appendChild(h2)
        card.appendChild(image)
        card.appendChild(para)
        card.appendChild(button)
        button.addEventListener('click', (e) => this.updateLike(e))
    }

    updateLike(e){
        this.likes++
        e.target.parentElement.querySelector('p').innerText = `${this.likes} likes`
        fetch(`http://localhost:3000/toys/${this.id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({"likes": this.likes})
        }) 
        // optimistic rendering  - no need for .thens 
    }

    static sortLikes = () => {
        //sortByLikes.addEventListener("click", (e) => console.log(e))
        //debugger
        Toy.allToys.sort(function(a,b) {
            return a.likes - b.likes
        })
    }
}

// clear the DOM
// re add items to DOM - rerun 