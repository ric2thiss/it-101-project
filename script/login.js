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



let error_counts = 0;
try {
    const storedErrorCounts = JSON.parse(localStorage.getItem("error-counts"));
    error_counts = Number(storedErrorCounts) || 0;
} catch (e) {
    console.error("Error parsing error-counts from localStorage:", e);
    error_counts = 0;
}



function timerStart(countdownTime){
    // Set the countdown time in seconds (e.g., 5 minutes = 300 seconds)
    // let countdownTime = 300; // 5 minutes

    // Function to format the time in mm:ss
    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;

        // Format to always show two digits (e.g., 09 instead of 9)
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Update the timer every second
    const timerElement = document.getElementById("timer");
    const interval = setInterval(function() {
        if (countdownTime <= 0) {
            clearInterval(interval); // Stop the countdown when it reaches zero
            // timerElement.remove()
        } else {
            timerElement.textContent = formatTime(countdownTime);
            countdownTime--; // Decrease the time
        }
    }, 1000);
}


async function login(username, password) {
    const request = await services("POST", { username, password }, "login");
    const error_message = document.getElementById("error-message");

    if(request.data.message ==="The password is wrong."){
        error_message.classList.remove("d-none");
        error_message.textContent = `${request.data.message}`;

        if(error_counts > 9) error_counts = 0;
        
        error_counts = error_counts + 1

        localStorage.setItem("error-counts", JSON.stringify(error_counts))

        const latestCount = JSON.parse(localStorage.getItem("error-counts"));


        error_counts = Number(latestCount);


        return;
    }

    console.log(error_counts)
        
     // Handle different error messages
    const errorMessages = [
        "Username is not registered.",
        "Username and password are required."
    ];

    // Check if the response contains any of the error messages
    if (errorMessages.includes(request.data.message)) {
        error_message.classList.remove("d-none");
        error_message.textContent = request.data.message;
        return; // Early return on error
    }

    return request;
}

async function validateLoginForm(event) {
    event.preventDefault();

    const form = document.forms["myForm"]; 
    const username = form["username"].value.trim();
    const password = form["password"].value.trim();

    const isUsernameValid = usernameValidation();
    const isPasswordValid = passwordValidation();

    if (isUsernameValid && isPasswordValid) {
        const response = await login(username, password);

        if(error_counts === 3){
            timerStart(15);
        }else if(error_counts === 6){
            timerStart(30);
        }else if(error_counts === 9){
            timerStart(60);
        }

        if (response !== undefined && response.data.message === "Login successful!") {
            localStorage.setItem("account", JSON.stringify(response.data.user));
            console.log(response.data.message)
        }


    } else {
        console.log("Validation ERROR");
    }

    return true;
}

document.querySelector("form").addEventListener("submit", validateLoginForm);

