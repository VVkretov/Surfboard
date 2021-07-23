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

//////////////////////////////////////////////////////////team/////////////////////////////////////////////////////////


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
const playerContainer = $(".player");
 
let eventsInit = () => {
 $(".player__start").click(e => {
   e.preventDefault();
 
   if (playerContainer.hasClass("paused")) {
     player.pauseVideo();
   } else {
     player.playVideo();
   }
 });
 
 $(".player__playback").click(e => {
   const bar = $(e.currentTarget);
   const clickedPosition = e.originalEvent.layerX;
   const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
   const newPlaybackPositionSec =
     (player.getDuration() / 100) * newButtonPositionPercent;
 
   $(".player__playback-button").css({
     left: `${newButtonPositionPercent}%`
   });
 
   player.seekTo(newPlaybackPositionSec);
 });
 
 $(".player__splash").click(e => {
   player.playVideo();
 })
};
 
const formatTime = timeSec => {
 const roundTime = Math.round(timeSec);
 
 const minutes = addZero(Math.floor(roundTime / 60));
 const seconds = addZero(roundTime - minutes * 60);
 
 function addZero(num) {
   return num < 10 ? `0${num}` : num;
 }
 
 return `${minutes} : ${seconds}`;
};
 
const onPlayerReady = () => {
 let interval;
 const durationSec = player.getDuration();
 
 $(".player__duration-estimate").text(formatTime(durationSec));
 
 if (typeof interval !== "undefined") {
   clearInterval(interval);
 }
 
 interval = setInterval(() => {
   const completedSec = player.getCurrentTime();
   const completedPercent = (completedSec / durationSec) * 100;
 
   $(".player__playback-button").css({
     left: `${completedPercent}%`
   });
 
   $(".player__duration-completed").text(formatTime(completedSec));
 }, 1000);
};
 
const onPlayerStateChange = event => {
 /*
   -1 (воспроизведение видео не начато)
   0 (воспроизведение видео завершено)
   1 (воспроизведение)
   2 (пауза)
   3 (буферизация)
   5 (видео подают реплики).
 */
 switch (event.data) {
   case 1:
     playerContainer.addClass("active");
     playerContainer.addClass("paused");
     break;
 
   case 2:
     playerContainer.removeClass("active");
     playerContainer.removeClass("paused");
     break;
 }
};
 
function onYouTubeIframeAPIReady() {
 player = new YT.Player("yt-player", {
   height: "390",
   width: "660",
   videoId: "LXb3EKWsInQ",
   events: {
     onReady: onPlayerReady,
     onStateChange: onPlayerStateChange
   },
   playerVars: {
     controls: 0,
     disablekb: 0,
     showinfo: 0,
     rel: 0,
     autoplay: 0,
     modestbranding: 0
   }
 });
}
 
eventsInit();

//////////////////////////////////////////////////////////forma///////////////////////////////////////////////////////// 

// const form = document.querySelector("#myForm");
// const submitButton = document.querySelector("#sendForm");



// function validateForm (form) {
//     let valid = true;

//     if (!validate(form.elements.name)) {
//         valid = false;
//     }
//     if (!validate(form.elements.nomber)) {
//         valid = false;
//     }
//     if (!validate(form.elements.comment)) {
//         valid = false;
//     }
//     return valid;
// }

// function validate(element) {
//     const minlength = parseInt(element.getAttribute("minlength"));

//     if (element.value.length < 1) {
//         element.nextElementSibling.classList.add("form__error--active");
//         element.nextElementSibling.textContent = "Заполните это поле!";
//         element.style.border = "3px solid red";
//         return false;
//     } else if (element.value.length < minlength) {
//         element.nextElementSibling.classList.add("form__error--active");
//         element.nextElementSibling.textContent = "маловато символов бро";
//         element.style.border = "3px solid red";
//         return false;    
//     } else {
//         element.nextElementSibling.textContent = "Оставте впечатления";
//         element.nextElementSibling.classList.remove("form__error--active");
//         element.style.border = "3px solid transparent";
//         return true;
//     }

// }

// submitButton.addEventListener("click", function(e) {
//     e.preventDefault();
//     if (validateForm(form)) {
//         alert("Форма валидна, отправляем на сервер!");
//     }
// });

// const validateFields = (form, fieldsArray) => {
//     fieldsArray.forEach(field => {
//         field.removeClass("input-error");

//         if(field.val().trim() == "") {
//             field.addClass("input-error");
//         }
//     });

//     const errorFields = form.find(".input-error");

//     return errorFields.length == 0;
// }


/*Скрипт отправки данных с формы на сервер*/
$("#myForm").submit(function() {

    const form = $(this);

    $.ajax({
        type: "POST",
        url: "server.php",
        data: form.serialize(),
    }).done(function() {
        console.log('done');
    })
    return false;


    // $.fancybox.open({
    //     src: "#modal",
    //     type: "inline"
    // });
});

//validate form script
$(function(){
    $('#myForm').validate({
        rules: {
            name: {
                required: true
            },
            phone: {
                required: true,
                digits: true
            }
        },
        focusCleanup: true,
		focusInvalid: false,
		submitHandler: function (form) {

			var form = $('#myForm');
			$.fancybox.open({
				src: '#modal',
				type: 'inline',
				afterClose: function () {
					form.trigger("reset");
				}
			});
			
		},

        // invalidHandler: function(event, validator){
        //     $('.js-message').text('Пожалуйста заполните необходимые поля')
        // },
        // onkeyup: function(element) {
		// 	$('.js-message').text('')
			
        // },
        errorPlacement: function(error, element) {
            return true
        }
    });
});

$(".app-close-modal").click(e => {
    e.preventDefault();

    $.fancybox.close();
});

/*END Скрипт отправки данных с формы на сервер*/


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


//////////////////////////////////////////////////////menu-section/////////////////////////////////

const mesureWidth = item => {
    let regItemWidth = 0;

    const screenWidth = $(window).width();

    const container = item.closest(".products-menu");
    const titlesBlocks = container.find(".products-menu__title");
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;
    
 

    const textContainer = item.find(".products-menu__container");
    const paddingLeft = parseInt( textContainer.css("padding-left"));
    const paddingRig = parseInt( textContainer.css("padding-right"));

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        regItemWidth = screenWidth - titlesBlocks.width(); //(screenWidth - titlesWidth)
    } else {
        regItemWidth = 520;
    };

    return {
        container: regItemWidth,
        textContainer: regItemWidth - paddingLeft - paddingRig
    };
};

const closeEveryItemContainer = container => {
    const items = container.find(".products-menu__item");
    const content = container.find(".products-menu__content");

    container.removeClass("active");
    items.removeClass("active");
    content.width(0);
}

const openItems = (item, container) => {

    const hiddenContent = item.find(".products-menu__content");
    const regWidth = mesureWidth(item);
    const textBlock = item.find(".products-menu__container");
     
    container.addClass("active");
    item.addClass("active");
    hiddenContent.width(regWidth.container);
    textBlock.width(regWidth.textContainer);
};

$(".products-menu__title").on("click", e => {
 e.preventDefault();

 const $this = $(e.currentTarget);
 const item = $this.closest(".products-menu__item");

 const itemOpened = item.hasClass("active");
 const container = $this.closest(".products-menu");

 if (itemOpened) {
    closeEveryItemContainer(container);
 } else {
    closeEveryItemContainer(container);
    openItems(item, container);
    

 }
});

$(".products-menu__content").on("click", e => {
    e.preventDefault();

    closeEveryItemContainer($(".products-menu"));

});


//////////////////////////////////////////////////////ops/////////////////////////////


const sections = $("section");
const display = $(".main-content");
const sideMenu = $(".fixed-menu");
const menuItemss = sideMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobiles = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
    const position = sectionEq * -100;
    
    if (isNaN(position)) {
        console.error("передано неверное значение в countSectionPosition");
        return 0;
    }

    return position;
}

const changeMenuThemeForSection = (sectionEq) => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const activeClass = "fixed-menu--shadowed";
    

    if (menuTheme == "black") {
        sideMenu.addClass(activeClass);
    } else {
        sideMenu.removeClass(activeClass);
    }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const perfomTransition = sectionEq => {
    if (inScroll) return;

    const transitionOver = 1000;
    const mouseInertiaOver = 300;    

    inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);    

    display.css({
        transform: `translateY(${position}%)`
    });

    resetActiveClassForItem(sections, sectionEq, "active");

    setTimeout(() => {
        inScroll = false;

        resetActiveClassForItem(menuItemss, sectionEq, "fixed-menu__item--active");

    }, transitionOver + mouseInertiaOver);
};

const ViewportScroller = () => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if (nextSection.length) {
                perfomTransition(nextSection.index());
            }
        },
        prev() {
            if (prevSection.length) {
                perfomTransition(prevSection.index());
            }
        },
    };
};

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = ViewportScroller();
    

    if (deltaY > 0) { 
        scroller.next();
    }

    if (deltaY < 0) {
        scroller.prev();
    }
});

$(window).on("keydown", e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName == "input" || tagName == "textarea"
    const scroller = ViewportScroller();

    if (userTypingInInputs) return;

    switch (e.keyCode) {
        case 38:
            scroller.prev();
            break;
    
        case 40:
            scroller.next();
            break;
    }  
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    perfomTransition(reqSection.index());
});

if (isMobiles) {
    // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
   
        $("body").swipe({
            swipe: function(event, direction) {
            const scroller = ViewportScroller();
            let scrollDirection = "";

            if (direction == "up") scrollDirection = "next";
            if (direction == "down") scrollDirection = "prev";
            
            scroller[scrollDirection]();
        },
    });
};
