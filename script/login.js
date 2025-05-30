import {
    isMaxAndMinLengthValid,
    hasDoubleSpace,
    hasConsecutiveChars,
    services
} from './global.js';

// ========== USERNAME VALIDATION ==========
function usernameValidation() {
    const form = document.forms["myForm"];
    const username = form["username"].value.trim();
    const error_message = document.getElementById("error-message");

    if (!error_message) {
        console.log("error_message field is null");
        return false;
    }

    if (!username) {
        error_message.classList.remove("d-none");
        error_message.textContent = "Username is required.";
        return false;
    }

    if (!isMaxAndMinLengthValid(username, 4, 15)) {
        error_message.classList.remove("d-none");
        error_message.textContent = "Username must be between 4 and 15 characters.";
        return false;
    }

    if (hasDoubleSpace(username)) {
        error_message.classList.remove("d-none");
        error_message.textContent = "Username must not contain multiple consecutive spaces.";
        return false;
    }

    if (hasConsecutiveChars(username)) {
        error_message.classList.remove("d-none");
        error_message.textContent = "Username must not contain three identical consecutive characters. Example: 'aaa' or 'HHH'";
        return false;
    }

    // If valid, hide the error message
    error_message.classList.add("d-none");
    error_message.textContent = "";
    return true;
}

// ========== PASSWORD VALIDATION ==========
function passwordValidation() {
    const form = document.forms["myForm"];
    const password = form["password"].value.trim();
    const error_message = document.getElementById("error-message");

    if (!password) {
        error_message.classList.remove("d-none");
        error_message.textContent = "Password is required.";
        return false;
    }

    error_message.classList.add("d-none");
    error_message.textContent = "";
    return true;
}

// ========== ERROR COUNT FROM LOCAL STORAGE ==========
let error_counts = 0;
try {
    const storedErrorCounts = JSON.parse(localStorage.getItem("error-counts"));
    error_counts = Number(storedErrorCounts) || 0;
} catch (e) {
    console.error("Error parsing error-counts from localStorage:", e);
    error_counts = 0;
}

// ========== TIMER START FUNCTION ==========
function timerStart(countdownTime) {
    const timerElement = document.getElementById("timer");
    const endTime = Date.now() + countdownTime * 1000;
    localStorage.setItem("lockoutEndTime", endTime);

    // Prevent back and forward navigation
    // history.pushState(null, null, location.href);
    // window.onpopstate = () => history.go(0);

    // Prevent refresh or tab close
    // window.addEventListener("onload", function (e) {
    //     window.onpopstate = () => history.go(1);
    // });

    // Format mm:ss
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Update timer
    const interval = setInterval(() => {
        const remainingTime = Math.floor((endTime - Date.now()) / 1000);

        if (remainingTime <= 0) {
            clearInterval(interval);
            timerElement.textContent = "";
            localStorage.removeItem("lockoutEndTime");
            window.onpopstate = null;
        } else {
            timerElement.textContent = formatTime(remainingTime);
        }
    }, 1000);
}

// ========== RESTORE TIMER ON PAGE LOAD ==========
window.addEventListener("DOMContentLoaded", () => {
    const storedEndTime = localStorage.getItem("lockoutEndTime");

    if (storedEndTime) {
        const remainingTime = Math.floor((Number(storedEndTime) - Date.now()) / 1000);
        history.pushState(null, null, location.href);
        window.onpopstate = () => history.go(0);
        if (remainingTime > 0) {
            timerStart(remainingTime);
            history.pushState(null, null, location.href);
            window.onpopstate = () => history.go(0);
        } else {
            localStorage.removeItem("lockoutEndTime");
        }
    }
});

// ========== LOGIN FUNCTION ==========
async function login(username, password) {
    const request = await services("POST", { username, password }, "login");
    const error_message = document.getElementById("error-message");

    if (request.data.message === "The password is wrong.") {
        error_message.classList.remove("d-none");
        error_message.textContent = request.data.message;

        if (error_counts > 9) error_counts = 0;
        error_counts += 1;

        localStorage.setItem("error-counts", JSON.stringify(error_counts));
        error_counts = Number(JSON.parse(localStorage.getItem("error-counts")));

        return;
    }

    const errorMessages = [
        "Username is not registered.",
        "Username and password are required."
    ];

    if (errorMessages.includes(request.data.message)) {
        error_message.classList.remove("d-none");
        error_message.textContent = request.data.message;
        return;
    }

    return request;
}

// ========== VALIDATE LOGIN FORM ON SUBMIT ==========
async function validateLoginForm(event) {
    event.preventDefault();

    const form = document.forms["myForm"];
    const username = form["username"].value.trim();
    const password = form["password"].value.trim();

    const isUsernameValid = usernameValidation();
    const isPasswordValid = passwordValidation();

    if (isUsernameValid && isPasswordValid) {
        const response = await login(username, password);

        if (error_counts === 3) {
            timerStart(15);
        } else if (error_counts === 6) {
            timerStart(30);
        } else if (error_counts === 9) {
            timerStart(60);
        }

        if (response && response.data.message === "Login successful!") {
            localStorage.setItem("account", JSON.stringify(response.data.user));
            console.log(response.data.message);
        }
    } else {
        console.log("Validation ERROR");
    }

    return true;
}

// ========== ATTACH EVENT LISTENER ==========
document.querySelector("form").addEventListener("submit", validateLoginForm);
