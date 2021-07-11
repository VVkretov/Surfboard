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