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

async function validateLoginWithServerConnection() {
    const isUsernameValid = usernameValidation();
    const isPasswordValid = passwordValidation();
    let error_counts = 0;
    const tempLogs = localStorage.setItem("counts", error_counts);

    const form = document.forms["myForm"];

    const username = form["username"].value.trim()
    const password = form["password"].value.trim()

    if(isUsernameValid && isPasswordValid){
        const request = await services("POST", {username, password})

        if(request.status === "success"){
            return error_counts+=1;
        }
    }
    return isUsernameValid && isPasswordValid; 
}

function validateLoginForm(event) {
    event.preventDefault();

    const validated = validateLoginWithServerConnection();

    if(!validated) return false;


    console.log("Form is valid. Proceeding to the link..");
    // form.submit(); ← you can manually submit the form if needed
}

document.querySelector("form").addEventListener("submit", validateLoginForm);
