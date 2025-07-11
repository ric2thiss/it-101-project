export function hasDigit(param){
    return /\d/.test(param);
}

export function hasSpecialChar(param){
    return /[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`]/.test(param);
}

export function hasDoubleSpace(param) {
    // Check if the input starts with a space in case if the trim doesnt work 
    // This shoud be like a call back
    if (param.startsWith(" ")) {
        return true;
    }
    // Check for two or more consecutive spaces
    return /\s{2,}/.test(param);
}

export function hasConsecutiveChars(param) {
    let consecutiveCount = 1;
    param = param.toLowerCase(); // To handle both upper and lower case
    for (let i = 1; i < param.length; i++) {
        if (param[i] === param[i - 1]) {
            consecutiveCount++;
            if (consecutiveCount === 3) {
                return true;
            }
        } else {
            consecutiveCount = 1;
        }
    }
    return false;
}

export function isExtensionValid(param) {
    const validExtensions = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'Jr', 'Sr'];
    return param === '' || validExtensions.includes(param) ? true : false;
}

export function isEmailValid(email) {
    const atSymbolIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    if (atSymbolIndex === -1 || dotIndex === -1 || atSymbolIndex > dotIndex || atSymbolIndex < 1 || dotIndex - atSymbolIndex < 2) {
        return false;
    }
    return true;
}

export function isFirstLetterCapital(param){
    const arr = param.split(" ")
    const regex = /^[A-Z]/;
    for(let i = 0; i < arr.length; i++){
        if(!regex.test(arr[i])){
            return false;
        }
    }
    return true;
}

export function isWordFormatValid(param){
    const regex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
    return regex.test(param);
}

export function isMaxAndMinLengthValid(param, min, max) {
    const value = param.trim();
    return value.length >= min && value.length <= max;
}

export function isValidIDFormat(input) {
    return /^\d{4}-\d+$/.test(input);
}

export function hasLetter(input) {
    return /[a-zA-Z]/.test(input);
}

// Check password strength
export function checkPasswordStrength(password) {
    const length = password.length;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`]/.test(password);

    if (length >= 8 && hasLetter && hasDigit && hasSpecialChar) {
        return "Strong password";
    } else if (length >= 8 && hasLetter && hasDigit) {
        return "Medium password";
    } else if (length >= 8 && hasLetter) {
        return "Weak password";
    } else {
        return "Invalid";
    }

}

export function isPasswordMatch(password, reEnteredPassword) {
    if (password !== reEnteredPassword) {
        return false
    }

    return true;
}


// // Get input data and save to localStorage
// export function getInputDataAndSave() {
//   const inputs = document.querySelectorAll("input");

//   inputs.forEach((input) => {
//     const name = input.name || input.id; // Use 'name', fallback to 'id'
//     const value = input.value;

//     if (name) {
//       localStorage.setItem(name, value);
//     }
//   });
// }



// Registration function
const insert = async (data) => {
    const URL = `http://localhost/paquibot/server/registration.php`;

    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const result = await response.json();
        // console.table(result);
        return result;

    } catch (error) {
        console.error('Error:', error);
    }
};



// Login function
const login = async (data) => {
    const URL = `http://localhost/paquibot/server/login.php`;

    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
           
            throw new Error(result.message || `HTTP error status: ${response.status}`);
        }

        return {
            status: "success",
            data: result
        };

    } catch (error) {
        console.error('Login Error:', error.message);

        return {
            status: "error",
            message: error.message
        };
    }
};


// Service layer controller
export const services = async (method, data, action) => {
    const request = method.trim().toUpperCase();

    if (request === "POST" && action === "register") {
        return await insert(data); 
    }

    if (request === "POST" && action === "login") {
        return await login(data);
    }

    return {
        status: "error",
        message: "Invalid method or action"
    };
};

