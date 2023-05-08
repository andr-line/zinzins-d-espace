function onLoad() {
    vertical()
}
onLoad()

// Hamburger Menu
let hamburgerButton = document.querySelector("#hamburgerButton")
hamburgerButton.addEventListener("click", (e) => {
    let navMenu = document.querySelector("#navMenu")
    navMenu.classList.toggle("open")
    let hamburgerChildren = document.querySelectorAll(".line")
    hamburgerChildren.forEach((e, i) => {
		e.classList.toggle("open")
    })
})

// Orientation (for small widths on phones)
window.addEventListener("resize", onLoad())

function vertical() {
    // Add .vertical to all elements if width is smaller than a threshold
    if(window.innerWidth < 40 * parseInt(document.defaultView.getComputedStyle(document.body, null).getPropertyValue('font-size'))) {
        let elements = document.querySelectorAll("*")
        elements.forEach((e, i) => {
            e.classList.add("vertical")
        })
    }
}