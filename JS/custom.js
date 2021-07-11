//////////////////////////////////////////////////////////menu/////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////slider/////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////open/////////////////////////////////////////////////////////


const openItem = item => {

    const container = item.closest(".team-list__item");
    const contentBlock = container.find(".team-list__bottom");
    const textBlock = container.find(".team-list__bottom-bot");
    const reqHeight = textBlock.height();

    container.addClass("active");
    contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
    const items = container.find(".team-list__bottom");
    const itemContainer = container.find(".team-list__item");

    itemContainer.removeClass("active");
    items.height(0); 
}

$(".team-list__top").click(e => {
    const $this = $(e.currentTarget);
    const container = $this.closest(".team");
    const elemContainer = $this.closest(".team-list__item")

    if (elemContainer.hasClass("active")) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this);
    }
});

// const openTop = document.querySelector(".team-list__top");
// const openBottom = document.querySelector(".team-list__bottom");
// const menuItems = document.querySelectorAll(".team-list .team-list__item");

// function toggleClass() { 
//     openTop.classList.toggle("team-list__top--active");
//     openBottom.classList.toggle("team-list__bottom--active");
// }

// openTop.addEventListener("click", toggleClass);

// close.addEventListener("click",toggleClass);

// menuItems.forEach((link) => {
//     link.addEventListener("click", toggleClass);
// });
 

//////////////////////////////////////////////////////////reviews/////////////////////////////////////////////////////////

 const findBlockByAlias = (alias) => {
    return $(".reviews__item").filter((ndx, item) => {
         return $(item).attr("data-linked-with") == alias;
     }); 
 };
 
 
 
 $(".interactive-avatar__link").click((e) => {
     e.preventDefault();
 
     const $this = $(e.currentTarget);
     const target = $this.attr("data-open");
     const itemToShow = findBlockByAlias(target);
     const curItem = $this.closest(".reviews__switcher-item");
 
     itemToShow.addClass("active").siblings().removeClass("active");
     curItem.addClass("active").siblings().removeClass("active");
 });


 //////////////////////////////////////////////////////////player///////////////////////////////////////////////////////// 


 let player;
//  const playerContainer = $(".player");
 
//  let eventsInit = () => {
//      $(".player__start").click(e => {
//          e.preventDefault();
 
//          if(playerContainer.hasClass("paused")) {
//              playerContainer.removeClass("paused");
//              player.pauseVideo();
//          } else {
//              playerContainer.addClass("paused");
//              player.playVideo();
//          }
 
//      });
//  };
 
//  const formatTime = timeSec => {
//      const roundTime = Math.round(timeSec);
 
//      const minutes = addZero(Math.floor(roundTime / 60));
//      const seconds = addZero(roundTime - minutes * 60);
 
//      function addZero(num) {
//          return num < 10 ? `0${num}` : num;
//      }; 
 
//      return `${minutes} : ${seconds}`;
//  }
 
 
//  const onPlayerReady = () => {
//      let interval;
//      const durationSec = player.getDuration();
 
//      $(".player__duration-estimate").text(formatTime(durationSec));
 
//      if(typeof interval !== "undefined") {
//          clearInterval(interval);
//      };
     
//      interval = setInterval(() => {
//          const completedSec = player.getСurrentTime();

//          const completedPercent = (completedSec / durationSec) * 100;

//          $(".player__playback-button").css({
//              left: `${completedPercent}%`
//          });
 
//          $(".player__duration-completed").text(formatTime(completedSec))
//      }, 1000);
//  };
 
       function onYouTubeIframeAPIReady() {
         player = new YT.Player('yt-player', {
           height: '390',
           width: '660',
           videoId: 'FmzHq3U0UFE',
           events: {
             onReady: onPlayerReady,
             // 'onStateChange': onPlayerStateChange
           },
           playerVars: {
               controls: 0,
               disablekd: 0,
               showinfo: 0,
               rel: 0,
               autoplay: 0,
               modestbranding: 0
           }
         });
       };
 


//////////////////////////////////////////////////////////forma///////////////////////////////////////////////////////// 

const form = document.querySelector("#myForm");
const submitButton = document.querySelector("#sendForm");



function validateForm (form) {
    let valid = true;

    if (!validate(form.elements.name)) {
        valid = false;
    }
    if (!validate(form.elements.nomber)) {
        valid = false;
    }
    if (!validate(form.elements.comment)) {
        valid = false;
    }
    return valid;
}

function validate(element) {
    const minlength = parseInt(element.getAttribute("minlength"));

    if (element.value.length < 1) {
        element.nextElementSibling.classList.add("form__error--active");
        element.nextElementSibling.textContent = "Заполните это поле!";
        element.style.border = "3px solid red";
        return false;
    } else if (element.value.length < minlength) {
        element.nextElementSibling.classList.add("form__error--active");
        element.nextElementSibling.textContent = "маловато символов бро";
        element.style.border = "3px solid red";
        return false;    
    } else {
        element.nextElementSibling.textContent = "Оставте впечатления";
        element.nextElementSibling.classList.remove("form__error--active");
        element.style.border = "3px solid transparent";
        return true;
    }

}

submitButton.addEventListener("click", function(e) {
    e.preventDefault();
    if (validateForm(form)) {
        alert("Форма валидна, отправляем на сервер!");
    }

})


$(".form").submit(e => {
    e.preventDefault();


    $.fancybox.open({
        src: "#modal",
        type: "inline"
    });
});


//////////////////////////////////////////////////////////map/////////////////////////////////////////////////////////


let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [55.354968, 86.087314],
        zoom: 11,
        controls: []
    });

    const coords = [
        [55.408617, 86.124100]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: "./sprite/group.svg",
        iconImageSize: [30, 42],
        iconImageOffset: [-3, -42]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);


