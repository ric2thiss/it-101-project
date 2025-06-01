import {
    isMaxAndMinLengthValid,
    hasDoubleSpace,
    hasConsecutiveChars,
    services
} from './global.js';

// ==== DOM ELEMENTS ====
const error_message = document.getElementById("error-message");
const login_button = document.getElementById("button-login");
const timerElement = document.getElementById("timer");

// ==== HELPER FUNCTIONS ====
function showError(message) {
    if (!error_message) return;
    error_message.classList.remove("d-none");
    error_message.textContent = message;
}

function hideError() {
    if (!error_message) return;
    error_message.classList.add("d-none");
    error_message.textContent = "";
}

function disableLogin() {
    if (login_button) {
        login_button.disabled = true;
        login_button.style.backgroundColor = "lightgray";
        login_button.style.cursor = "not-allowed";
    }
}

function enableLogin() {
    if (login_button) {
        login_button.disabled = false;
        login_button.style.backgroundColor = ""; // reset to original
        login_button.style.cursor = "";
    }
}

function disableHistoryNavigation() {
    // history.pushState(null, null, location.href);
    // window.onpopstate = () => history.go(0);
    history.pushState(null, null, location.href);
    window.onpopstate = () => {
        history.pushState(null, null, location.href);
    };
}

function enableHistoryNavigation() {
    window.onpopstate = null;
}

// ==== TIMER ====
function timerStart(seconds) {
    const endTime = Date.now() + seconds * 1000;
    localStorage.setItem("lockoutEndTime", endTime);
    showError("Too many failed attempts. Please wait...");

    disableLogin();
    disableHistoryNavigation();

    const interval = setInterval(() => {
        const remaining = Math.floor((endTime - Date.now()) / 1000);

        if (remaining <= 0) {
            clearInterval(interval);
            timerElement.textContent = "";
            localStorage.removeItem("lockoutEndTime");
            hideError();
            enableLogin();
            enableHistoryNavigation();
        } else {
            const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
            const seconds = String(remaining % 60).padStart(2, '0');
            timerElement.textContent = `${minutes}:${seconds}`;
        }
    }, 1000);
}

// ==== RESTORE TIMER ON PAGE LOAD ====
window.addEventListener("DOMContentLoaded", () => {
    const storedEndTime = localStorage.getItem("lockoutEndTime");
    if (storedEndTime) {
        const remainingTime = Math.floor((Number(storedEndTime) - Date.now()) / 1000);
        if (remainingTime > 0) {
            timerStart(remainingTime);
        } else {
            localStorage.removeItem("lockoutEndTime");
        }
    }
});

// ==== VALIDATION ====
function usernameValidation() {
    const username = document.forms["myForm"]["username"].value.trim();

    if (!username) return showError("Username is required."), false;
    if (!isMaxAndMinLengthValid(username, 4, 15)) return showError("Username must be between 4 and 15 characters."), false;
    if (hasDoubleSpace(username)) return showError("Username must not contain double spaces."), false;
    if (hasConsecutiveChars(username)) return showError("Username must not contain three identical consecutive characters."), false;

    return true;
}

function passwordValidation() {
    const password = document.forms["myForm"]["password"].value.trim();
    if (!password) return showError("Password is required."), false;
    return true;
}

// ==== ERROR COUNT HANDLING ====
let error_counts = Number(localStorage.getItem("error-counts")) || 0;
const forgetPassword = document.getElementById("forget-password");
console.log(forgetPassword)

if(error_counts > 1){
    forgetPassword.classList.remove("d-none");
    forgetPassword.style.display = "block";
}

async function login(username, password) {
    const request = await services("POST", { username, password }, "login");

    if (request.data.message === "The password is wrong.") {
        showError(request.data.message);

        error_counts = (error_counts + 1) % 10;
        localStorage.setItem("error-counts", error_counts);

       if (error_counts === 2) {
            forgetPassword.classList.remove("d-none");
            forgetPassword.style.display = "block";
        } else if (error_counts === 3) {
            timerStart(17);
        } else if (error_counts === 6) {
            timerStart(32);
        } else if (error_counts === 9) {
            timerStart(62);
        }



        return;
    }

    if (["Username is not registered.", "Username and password are required."].includes(request.data.message)) {
        showError(request.data.message);
        return;
    }

    return request;
}

// ==== FORM SUBMIT ====
async function validateLoginForm(event) {
    event.preventDefault();

    if (!usernameValidation() || !passwordValidation()) return;

    const username = document.forms["myForm"]["username"].value.trim();
    const password = document.forms["myForm"]["password"].value.trim();

    const response = await login(username, password);

    if (response && response.data.message === "Login successful!") {
        localStorage.setItem("account", JSON.stringify(response.data.user));
        localStorage.setItem("error-counts", "0");
        hideError();
        console.log(response.data);
        localStorage.setItem("userloggedIn", JSON.stringify(response.data));
        window.location.href = 'index.html';
    }
}

document.querySelector("form").addEventListener("submit", validateLoginForm);
