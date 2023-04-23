// Hamburger Menu
let hamburgerButton = document.querySelector("#hamburgerButton")
hamburgerButton.addEventListener('click', (e) => {
    let navMenu = document.querySelector("#navMenu")
    navMenu.classList.toggle("open")
})