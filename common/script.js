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
cards.forEach((e, i) => {
    e.addEventListener('click', (ev) => {
        let cards = document.querySelectorAll(".card")
        cards.forEach((elem, ind) => {
            elem.classList.remove('active')
        })
        cards[i].classList.add('active')
    })
})