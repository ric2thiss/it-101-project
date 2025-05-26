import { 
    isMaxAndMinLengthValid, hasSpecialChar, 
    isValidIDFormat, hasLetter, hasDoubleSpace,
    isFirstLetterCapital, hasConsecutiveChars,
    isWordFormatValid, isExtensionValid,
    isEmailValid

} from './global.js';


function IDNumberValidation(){
    const idNumberInput = document.getElementById("idnumber").value;

    if(!idNumberInput){
        console.log("Please enter your Id number")
        return false;
    }

    if(hasLetter(idNumberInput)){
        console.log("No letters allowed in the ID input. Please enter numbers only.");
        return false;
    }

    if (!isMaxAndMinLengthValid(idNumberInput, 6, 10)) {
        console.log("The ID Number must be at least 6 to 10 digits");
        return false;
    }

    if(hasSpecialChar(idNumberInput)){
        console.log(isIdNumberHasSpecialChar)
        console.log("Id Number must not contain special Character except -");
        return false;
    }

    if(!isValidIDFormat(idNumberInput)){
        console.log("ID number must follow this format xxxx-xxxx");
        return false;
    }

    

    return true;
}

function firstNameValidation(){
    const firstname = document.getElementById("firstname").value;

    if(!firstname){
        console.log("Please enter your firstname")
        return false;
    }

    if (!isMaxAndMinLengthValid(firstname, 3, 15)) {
        console.log("The first name must be at least 3 to 10 letters");
        return false;
    }

    if(hasDoubleSpace(firstname)){
        console.log("The First Name Field must not have 2 or more spaces");
        return false;
    }

    if(!isFirstLetterCapital(firstname)){
        console.log("First letter of every word in the firstname field must be capital. Example: Juan Karlos");
        return false;
    }

    if (!isWordFormatValid(firstname)) {
        console.log("Your firstame is invalid format! Please follow this format example Juan Karlos. Only in the first letter of every word must be capital letter.");
        return false;
    }

    if(hasConsecutiveChars(firstname)){
        console.log("Firstname must not have 3 the same consecutive characters. Example: hhh or HHH");
        return false;
    }

    

    return true;
}

function lastNameValidation(){
    const lastname = document.getElementById("lastname").value;

    if(!lastname){
        console.log("Please enter your lastname")
        return false;
    }

    if (!isMaxAndMinLengthValid(lastname, 3, 15)) {
        console.log("The lastname must be at least 3 to 10 letters");
        return false;
    }

    if(hasDoubleSpace(lastname)){
        console.log("The lastname field must not have 2 or more spaces");
        return false;
    }

    if(!isFirstLetterCapital(lastname)){
        console.log("First letter of every word in the lastname field must be capital. Example: Juan Karlos");
        return false;
    }

    if (!isWordFormatValid(lastname)) {
        console.log("Your lastname is invalid format! Please follow this format example Juan Karlos. Only in the first letter of every word must be capital letter.");
        return false;
    }

    if(hasConsecutiveChars(lastname)){
        console.log("Lastname must not have 3 the same consecutive characters. Example: hhh or HHH");
        return false;
    }

    

    return true;
}

function middleNameValidation(){
    const middleInitial = document.getElementById("middleinitial").value

    if(!isMaxAndMinLengthValid(middleInitial, 0, 1)){
        console.log("Middle Initial must only 1-2 characters.");
        return false;
    }

    return true;
}

function extentionNameValidation(){
    const extName = document.getElementById("extensionname").value

    if(hasDoubleSpace(extName)){
        console.log("Extension name must not have double spaces.");
        return false;
    }

    if(!isMaxAndMinLengthValid(extName, 0, 5)){
        console.log("Extension Name must not greater than 5 characters");
        return false;
    }

    if(!isExtensionValid(extName)){
        console.log("Extension Name must be valid. The lists are the example Extension name ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'Jr', 'Sr']");
        return false;
    }

    return true;
}

function emailValidation(){
    const email = document.getElementById("email").value

    if(!email){
        console.log("Email is required!");
        return false;
    }

    if (!isMaxAndMinLengthValid(email, 15, 20)) {
        console.log("The Email is too long. It must be at least 15 to 20 characters");
        return false;
    }

    if(hasDoubleSpace(email)){
        console.log("The email field must not have 2 or more spaces");
        return false;
    }

    if(!isEmailValid(email)){
        console.log("Email is invalid format. Please follow this format, example: myemail@gmail.com");
        return false;
    }

    return true;


}

function validateRegForm(event) {
    event.preventDefault();

    if(!IDNumberValidation()) return false;

    if(!firstNameValidation()) return false;

    if(!lastNameValidation()) return false;

    if(!middleNameValidation()) return false;

    if(!extentionNameValidation()) return false;

    if(!emailValidation()) return false;
    

    console.log("Form is valid");
    return true;
}

document.querySelector("form").addEventListener("submit", validateRegForm);
