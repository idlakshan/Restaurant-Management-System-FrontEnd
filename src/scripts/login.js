const userNameInput=document.querySelector(".userName");
const passwordInput=document.querySelector(".password");
const keypadButtons = document.querySelectorAll('.btns-login, .btns-login-number');

let selectedInput;

document.addEventListener("DOMContentLoaded", function () {
    Login();
});

//============Login Event============

function Login() {
    keypadButtons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    userNameInput.addEventListener('focus', () => {
        selectedInput = userNameInput;
    });

    passwordInput.addEventListener('focus', () => {
        selectedInput = passwordInput;
    });
}


function handleButtonClick(event) {
    const buttonValue = event.target.textContent;

    if (selectedInput == userNameInput) {
        if (buttonValue === '←') {
            selectedInput.value = selectedInput.value.slice(0, -1);
        } else if (buttonValue === 'Space') {
            selectedInput.value += ' ';
        } else if (/^[A-Za-z0-9]$/.test(buttonValue)) {
            selectedInput.value += buttonValue.toLowerCase();
        }
    } else if (selectedInput == passwordInput) {
        if (buttonValue === '←') {
            selectedInput.value = selectedInput.value.slice(0, -1);
        } else if (/^[A-Za-z0-9]$/.test(buttonValue)) {
            selectedInput.value += buttonValue;
        }
    }
}
