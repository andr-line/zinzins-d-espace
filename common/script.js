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