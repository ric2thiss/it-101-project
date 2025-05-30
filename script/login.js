import { isMaxAndMinLengthValid, hasDoubleSpace, hasConsecutiveChars
    ,services
 } from './global.js';

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

function passwordValidation() {
    const form = document.forms["myForm"];
    const password = form["password"].value.trim();
    const error_message = document.getElementById("error-message");

    if (password === "" || !password || password.length === 0) {
        error_message.classList.remove("d-none");
        error_message.textContent = "Password is required.";
        return false;
    }

    error_message.classList.add("d-none");
    error_message.textContent = "";

    return true;
}



let error_counts = localStorage.getItem("error-counts") || 0;
const form = document.forms["myForm"];


// async function validateLoginWithServerConnection() {
//     const isUsernameValid = usernameValidation();
//     const isPasswordValid = passwordValidation();

//     if(isUsernameValid && isPasswordValid){
//         const request = await services("POST", {username, password})

//         if(request.status === "success"){
//             return error_counts+=1;
//         }
//     }
//     return isUsernameValid && isPasswordValid; 
// }

async function login(username, password) {
    const request = await services("POST", { username, password }, "login");
    return request;
}

async function validateLoginForm(event) {
    event.preventDefault();

    const form = document.forms["myForm"]; // ✅ Define form first
    const username = form["username"].value.trim();
    const password = form["password"].value.trim();

    const isUsernameValid = usernameValidation();
    const isPasswordValid = passwordValidation();

    if (isUsernameValid && isPasswordValid) {
        const response = await login(username, password);
        console.log(response);
    } else {
        console.log("Validation ERROR");
    }

    return true;
}

document.querySelector("form").addEventListener("submit", validateLoginForm);

