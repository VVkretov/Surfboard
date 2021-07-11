const buttomLeft = document.querySelector('#sliderLeft');
const buttonRight = document.querySelector('#sliderRight');
const itemsList = document.querySelector("#slider");
const items = document.querySelectorAll(".assortment__item");

let step = items[0].getBoundingClientRect().width;
const minRight = 0;
let maxRight = (items.length -1) * step;

let currentRight = 0;
let currenStep = 0;

const listStyles = getComputedStyle(itemsList);
const initialTransition = `${listStyles["transition-property"]} ${listStyles["transition-duration"]}`;

itemsList.style.right = currentRight;

function updateSlider () {
    itemsList.style.transition = "none";
    step = items[0].getBoundingClientRect().width;
    maxRight = (items.length -1) * step;
    currentRight = step * currenStep;
    itemsList.style.right = `${currentRight}px`; 
}

window.addEventListener("resize", updateSlider);

buttonRight.addEventListener("click", e => {
    e.preventDefault();
     
    itemsList.style.transition = initialTransition;

    if(currentRight == maxRight) {
        currentRight = minRight;
        itemsList.style.right = `${currentRight}px`;
        currenStep = 0;
        return;
    }

    if(currentRight < maxRight) {
        currentRight += step;
        itemsList.style.right = `${currentRight}px`;
        currenStep++;
    }
});

buttomLeft.addEventListener("click", e => {
    e.preventDefault();

    itemsList.style.transition = initialTransition;

    if(currentRight == minRight) {
        currentRight = maxRight;
        itemsList.style.right = `${currentRight}px`;
        currenStep = items.length -1;
        return;
    }


    if(currentRight > minRight) {
        currentRight -= step;
        itemsList.style.right = `${currentRight}px`;
        currenStep--;
    }
});