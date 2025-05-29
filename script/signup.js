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

function sexValidation(){
      const form = document.forms["myForm"];
      const sex = form["sex"].value;

      if(!sex){
        console.log("Sex is required! Please select for your identity.");
        return false;
      }

      return true;
}

function addressValidation(){
    const form = document.forms["myForm"];

    const purok = form["purok"].value.trim();
    const barangay = form["barangay"].value.trim();
    const city = form["city"].value.trim();
    const province = form["province"].value.trim();
    const country = form["country"].value.trim();
    const zip = form["zip"].value.trim();

    if (!purok || !barangay || !city || !province || !country || !zip) {
        console.log("All address fields are required.");
        return false;
    }

    // --------------------------Checking if hasDoubleSpaces---------------------------------------- //

    if(hasDoubleSpace(purok)){
        console.log("Purok field should not have 2 or more white spaces.")
        return false;
    }

    if(hasDoubleSpace(barangay)){
        console.log("Barangay field should not have 2 or more white spaces.")
        return false;
    }

    if(hasDoubleSpace(city)){
        console.log("City field should not have 2 or more white spaces.")
        return false;
    }

    if(hasDoubleSpace(province)){
        console.log("Province field should not have 2 or more white spaces.")
        return false;
    }

    if(hasDoubleSpace(country)){
        console.log("Country field should not have 2 or more white spaces.")
        return false;
    }

    if(hasDoubleSpace(zip)){
        console.log("Zipcode field should not have 2 or more white spaces.")
        return false;
    }

// -----------------------------------Checking the length------------------------------------------ //

    if(!isMaxAndMinLengthValid(purok, 4, 20)){
        console.log("Purok field must be at least 4 to 20 letters")
        return false;
    }

    if(!isMaxAndMinLengthValid(barangay, 4, 20)){
        console.log("Barangay field must be at least 4 to 20 letters")
        return false;
    }

    if(!isMaxAndMinLengthValid(city, 4, 20)){
        console.log("City field must be at least 4 to 20 letters")
        return false;
    }

    if(!isMaxAndMinLengthValid(province, 4, 20)){
        console.log("Province field must be at least 4 to 20 letters")
        return false;
    }

    if(!isMaxAndMinLengthValid(country, 4, 20)){
        console.log("Country field must be at least 4 to 20 letters")
        return false;
    }

    if(!isMaxAndMinLengthValid(zip, 4, 6)){
        console.log("Zipcode field must be at least 4 to 6 numbers")
        return false;
    }

// ----------------------------Checking for word Formating ------------------------------------ //
    if (!isWordFormatValid(purok)) {
        console.log("Purok is invalid format! Please follow this format example 'Purok Bayabas'. Only in the first letter of every word must be capital letter.");
        return false;
    }

    if (!isWordFormatValid(barangay)) {
        console.log("Barangay is invalid format! Please follow this format example 'Bayanihan'. Only in the first letter of every word must be capital letter.");
        return false;
    }
    
    if (!isWordFormatValid(city)) {
        console.log("City is invalid format! Please follow this format example 'Cabadbarna City'. Only in the first letter of every word must be capital letter.");
        return false;
    }


    if (!isWordFormatValid(province)) {
        console.log("Province is invalid format! Please follow this format example 'Agusan Del Norte'. Only in the first letter of every word must be capital letter.");
        return false;
    }
    
    if (!isWordFormatValid(country)) {
        console.log("Country is invalid format! Please follow this format example 'Philippines'. Only in the first letter of every word must be capital letter.");
        return false;
    }

    // Check the zipcode if has a letter then throw an error

    if(hasLetter(zip)){
        console.log("Zipcode should not have a letters. Please input a numbers only!");
        return false;
    }


// -----------------------Checking if there are consecutive characters------------------------- //

    if(hasConsecutiveChars(purok)){
        console.log("Purok should not have 3 the same consecutive characters. Example: hhh or HHH");
        return false;
    }

    if(hasConsecutiveChars(barangay)){
        console.log("Barangay should not have 3 the same consecutive characters. Example: hhh or HHH");
        return false;
    }

    if(hasConsecutiveChars(city)){
        console.log("City should not have 3 the same consecutive characters. Example: hhh or HHH");
        return false;
    }

    if(hasConsecutiveChars(province)){
        console.log("Province should not have 3 the same consecutive characters. Example: hhh or HHH");
        return false;
    }

    if(hasConsecutiveChars(country)){
        console.log("Country should not have 3 the same consecutive characters. Example: hhh or HHH");
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

    if(!sexValidation()) return false;

    if(!addressValidation()) return false;


    

    console.log("Form is valid");
    return true;
}

document.querySelector("form").addEventListener("submit", validateRegForm);
