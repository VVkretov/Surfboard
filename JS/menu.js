const openButton = document.querySelector("#hamburger");
const menu = document.querySelector(".fulscreen-menu");
const close = document.querySelector(".fulscreen-menu__close");
const menuItems = document.querySelectorAll(".fulscreen-menu .menu--vertical__link");
const body = document.querySelector("body");

function toggleClass() { 
    menu.classList.toggle("fulscreen-menu--active");
    body.classList.toggle("body--active");
}

openButton.addEventListener("click", toggleClass);

close.addEventListener("click",toggleClass);

menuItems.forEach((link) => {
    link.addEventListener("click", toggleClass);
});



// openButton.addEventListener("click", e => {
//     const overlayElement = document.createElement("div");
//     overlayElement.classList.add("overlay");

//     overlayElement.addEventListener("click", e => {
//         if(!e.target.classList.contains("content")) {
//             closeElement.click();
//         }
//     })

//     const containerElement = document.createElement("div");
//     containerElement.classList.add("modal-container");

//     const ulElement = document.createElement("ul");
//     ulElement.classList.add("list");

//     const contentElement = document.createElement("li");
//     contentElement.classList.add("content");

//     contentElement.innerHTML = "О нас";

//     contentElement.innerHTML = "Серфборды";

//     const closeElement = document.createElement("a");
//     closeElement.classList.add("close");
//     closeElement.textContent = "x";
//     closeElement.href = "#";

//     closeElement.addEventListener("click", e => {
//         e.preventDefault();
//         body.removeChild(overlayElement);


//     })

//     overlayElement.appendChild(containerElement);
//     containerElement.appendChild(closeElement);
//     containerElement.appendChild(ulElement);
//     ulElement.appendChild(contentElement);
//     body.appendChild(overlayElement);
// })