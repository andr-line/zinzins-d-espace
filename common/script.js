// Hamburger Menu
let hamburgerButton = document.querySelector("#hamburgerButton")
hamburgerButton.addEventListener('click', (e) => {
    let navMenu = document.querySelector("#navMenu")
    navMenu.classList.toggle("open")
    let hamburgerChildren = document.querySelectorAll(".line")
    hamburgerChildren.forEach((e, i) => {
		e.classList.toggle("open")
    })
})

// Cards
let cards = document.querySelectorAll(".card")
console.log(cards)
cards.forEach((e, i) => {
    e.addEventListener('click', (ev) => {
        console.log(ev)
        let cards = document.querySelectorAll(".card")
        cards.forEach((elem, ind) => {
            elem.classList.remove('active')
        })
        cards[i].classList.add('active')
        console.log(cards)
    })
})
// for(i=0; i<cards.length; i++) {
//     cards[i].addEventListener('click', (e) => {
//         console.log(this.className)
        
//         this.classList.add("active")
//     })
// }