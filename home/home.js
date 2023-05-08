// Cards
let cards = document.querySelectorAll(".card")
cards.forEach((e, i) => {
    e.addEventListener("click", (ev) => {
        let cards = document.querySelectorAll(".card")
        cards.forEach((elem, ind) => {
            if(ind==i) {
                elem.classList.toggle("active")
            } else {
                elem.classList.remove("active")
            }
        })
    })
})