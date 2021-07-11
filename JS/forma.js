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
        element.nextElementSibling.textContent = "Заполните это поле! будте любезны";
        element.style.border = "3px solid red";
        return false;
    } else if (element.value.length < minlength) {
        element.nextElementSibling.classList.add("form__error--active");
        element.nextElementSibling.textContent = "маловато символов бро";
        element.style.border = "3px solid red";
        return false;    
    } else {
        element.nextElementSibling.textContent = "";
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