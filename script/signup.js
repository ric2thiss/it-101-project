import { 
    isMaxAndMinLengthValid, hasSpecialChar, 
    isValidIDFormat, hasLetter, hasDoubleSpace,
    isFirstLetterCapital, hasConsecutiveChars,
    isWordFormatValid, isExtensionValid,
    isEmailValid, hasDigit, checkPasswordStrength,
    isPasswordMatch, services

} from './global.js';


// Save to localStorage whenever input changes
document.addEventListener("input", (e) => {
  if (e.target.tagName === "INPUT") {
    const name = e.target.name;
    const value = e.target.value;
    if (name) {
      localStorage.setItem(name, value);
    }
  }
});

// Restore saved data on page load
window.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    const name = input.name;
    if (name) {
      const savedValue = localStorage.getItem(name);
      if (savedValue) {
        input.value = savedValue;
      }
    }
  });
});



function IDNumberValidation(){
    const idNumberInput = document.getElementById("idnumber").value;
    const idnumber_error = document.getElementById("idnumber-error");

    if(!idNumberInput){
        idnumber_error.textContent = "Please enter your Id number";
        return false;
    }

    if(hasLetter(idNumberInput)){
        idnumber_error.textContent = "No letters allowed in the ID input. Please enter numbers only."
        return false;
    }

    if (!isMaxAndMinLengthValid(idNumberInput, 6, 10)) {
        idnumber_error.textContent = "The ID Number must be at least 6 to 10 digits"
        return false;
    }

    if(hasSpecialChar(idNumberInput)){
        idnumber_error.textContent = "Id Number must not contain special Character except -"
        return false;
    }

    if(!isValidIDFormat(idNumberInput)){
        idnumber_error.textContent = "ID number must follow this format xxxx-xxxx"
        return false;
    }

    idnumber_error.textContent = ''

    return true;
}

function firstNameValidation(){
    const firstname = document.getElementById("firstname").value;
    const firstname_error = document.getElementById("firstname-error");

    if(!firstname){
        firstname_error.textContent = "Please enter your first name."
        return false;
    }

    if (!isMaxAndMinLengthValid(firstname, 3, 15)) {
        firstname_error.textContent = "The first name must be between 3 and 15 letters."
        return false;
    }

    if(hasDoubleSpace(firstname)){
        firstname_error.textContent = "The first name field must not contain two or more consecutive spaces."
        return false;
    }

    if(hasDigit(firstname)){
        firstname_error.textContent = "The first name field must not contain numbers"
        return false;
    }

    if(!isFirstLetterCapital(firstname)){
        firstname_error.textContent = "The first letter of every word in the first name must be capitalized. Example: Juan Karlos."
        return false;
    }

    if (!isWordFormatValid(firstname)) {
        firstname_error.textContent = "Invalid first name format. Example: Juan Karlos. Only the first letter of each word should be capitalized."
        return false;
    }

    if(hasConsecutiveChars(firstname)){
        firstname_error.textContent = "The first name must not contain three identical consecutive characters. Example: hhh or HHH."
        return false;
    }

    firstname_error.textContent = '';
    return true;
}


function lastNameValidation(){
    const lastname = document.getElementById("lastname").value;
    const lastname_error = document.getElementById("lastname-error")

    if(lastname_error === null) return console.log("Last Name Error field is null");

    if(!lastname){
        lastname_error.textContent = "Please enter your last name."
        return false;
    }

    if (!isMaxAndMinLengthValid(lastname, 3, 15)) {
        lastname_error.textContent = "The last name must be between 3 and 15 letters."
        return false;
    }

    if(hasDoubleSpace(lastname)){
        lastname_error.textContent = "The last name field must not contain two or more consecutive spaces."
        return false;
    }

    if(hasDigit(lastname)){
        lastname_error.textContent = "The last name field must not contain numbers"
        return false;
    }

    if(!isFirstLetterCapital(lastname)){
        lastname_error.textContent = "The first letter of every word in the last name must be capitalized. Example: Juan Karlos."
        return false;
    }

    if (!isWordFormatValid(lastname)) {
        lastname_error.textContent = "Invalid last name format. Example: Juan Karlos. Only the first letter of each word should be capitalized."
        return false;
    }

    if(hasConsecutiveChars(lastname)){
        lastname_error.textContent = "The last name must not contain three identical consecutive characters. Example: hhh or HHH."
        return false;
    }

    lastname_error.textContent = ''

    return true;
}

function middleNameValidation(){
    const middleInitial = document.getElementById("middleinitial").value
    const middleinitial_error = document.getElementById("middleinitial-error");

    if(middleinitial_error === null) return console.log("Middle initial error field is null");

    if(hasDigit(middleInitial)){
        firstname_error.textContent = "The Middle Initial must not contain numbers"
        return false;
    }
    if(!isMaxAndMinLengthValid(middleInitial, 0, 1)){
        middleinitial_error.textContent = "Middle Initial must only 1-2 characters."
        return false;
    }

    middleinitial_error.textContent = ''

    return true;
}

function extentionNameValidation(){
    const extName = document.getElementById("extensionname").value;
    const extensionname_error = document.getElementById("extensionname-error");

    if(extensionname_error === null) return console.log("Extension Name error field is null");

    if(hasDoubleSpace(extName)){
        extensionname_error.textContent = "Extension name must not contain double spaces."
        return false;
    }

    if(!isMaxAndMinLengthValid(extName, 0, 5)){
        extensionname_error.textContent = "Extension name must not be longer than 5 characters."
        return false;
    }

    if(!isExtensionValid(extName)){
        extensionname_error.textContent = "Extension name must be valid. Examples: 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'Jr', 'Sr'."
        return false;
    }

    extensionname_error.textContent = ''

    return true;
}


function emailValidation(){
    const email = document.getElementById("email").value;
    const email_error = document.getElementById("email-error")

    if(email_error === null) return console.log("Email Error field is null")

    if(!email){
        email_error.textContent = "Email is required."
        return false;
    }

    if (!isMaxAndMinLengthValid(email, 15, 20)) {
        email_error.textContent = "The email must be between 15 and 20 characters."
        return false;
    }

    if(hasDoubleSpace(email)){
        email_error.textContent = "The email field must not contain two or more consecutive spaces."
        return false;
    }

    if(!isEmailValid(email)){
        email_error.textContent = "Invalid email format. Please follow this format: myemail@gmail.com."
        return false;
    }

    email_error.textContent = ''
    return true;
}


function sexValidation(){
      const form = document.forms["myForm"];
      const sex = form["sex"].value;

      const sex_error = document.getElementById("sex-error");

      if(sex_error === null) return console.log("Sex error field is null")

      if(!sex){
        sex_error.textContent = "Sex is required. Please select your gender identity."
        return false;
      }

      sex_error.textContent = ''
      return true;
}


const birthDateInput = document.getElementById("birthDate");

birthDateInput.addEventListener("change", (e) => {
  birthDateValidation(e.target.value);
});

function birthDateValidation(value = document.getElementById("birthDate").value) {
  if (!value) {
    document.getElementById("birthDate-error").textContent = "Please enter a valid birthdate.";
    document.getElementById("birthDateData").value = "";
    return false;
  }

  const birthDate = new Date(value);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Show age in the input box
  document.getElementById("birthDateData").value = age;

  // Show error if under 18
  if (age < 18) {
    document.getElementById("birthDate-error").textContent = "You must be 18 years or older to register.";
    return false;
  }

  // Clear error if age is valid
  document.getElementById("birthDate-error").textContent = "";
  return true;
}



function birthValidation(){
    const birthDate = new Date(document.getElementById("birthDate").value);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if(!age){
        document.getElementById("birthDate-error").textContent = "Birthdate is required.";
        return false;
    }

    if (age < 18){
        return false;
    }

    return true;
}


function addressValidation() {
    const form = document.forms["myForm"];

    const purok = form["purok"].value.trim();
    const barangay = form["barangay"].value.trim();
    const city = form["city"].value.trim();
    const province = form["province"].value.trim();
    const country = form["country"].value.trim();
    const zip = form["zip"].value.trim();

    // Error Fields

    const purok_error = document.getElementById("purok-error")
    const barangay_error = document.getElementById("barangay-error")
    const city_error = document.getElementById("city-error")
    const province_error = document.getElementById("province-error")
    const country_error = document.getElementById("country-error")
    const zip_error = document.getElementById("zip-error")

    // if(!purok || !barangay || !city || !province || !country || !zip) {
    //     purok_error.textContent = "Purok field is required."
    //     barangay_error.textContent = "Barangay field is required."
    //     city_error.textContent = "City field is required."
    //     province_error.textContent = "Province field is required."
    //     country_error.textContent = "Country field is required."
    //     zip_error.textContent = "Zip field is required."
    //     return false;
    // }

    if(!purok){
        purok_error.textContent = "Purok field is required."
        return false;
    }else{
         purok_error.textContent = ""
    }
    if(!barangay){
        barangay_error.textContent = "Barangay field is required."
        return false;
    }else{
        barangay_error.textContent = ""
    }
    if(!city){
        city_error.textContent = "City field is required."
        return false;
    }else{
        province_error.textContent = ""
    }
    if(!province){
        province_error.textContent = "Province field is required."
        return false;
    }else{
        country_error.textContent = ""
    }
    if(!country){
        country_error.textContent = "Country field is required."
        return false;
    }else{
        country_error.textContent = ""
    }
    if(!zip){
        zip_error.textContent = "Zip field is required."
        return false;
    }else{
        zip_error.textContent = ""
    }

    // -------------------------- Check for double spaces -------------------------- //
    if(hasDoubleSpace(purok)) {
        purok_error.textContent = "Purok field should not contain multiple consecutive spaces."
        return false;
    }

    if(hasDoubleSpace(barangay)) {
        barangay_error.textContent = "Barangay field should not contain multiple consecutive spaces."
        return false;
    }

    if(hasDoubleSpace(city)) {
        city_error.textContent = "City field should not contain multiple consecutive spaces."
        return false;
    }

    if(hasDoubleSpace(province)) {
        province_error.textContent = "Province field should not contain multiple consecutive spaces."
        return false;
    }

    if(hasDoubleSpace(country)) {
        country_error.textContent = "Country field should not contain multiple consecutive spaces."
        return false;
    }

    if(hasDoubleSpace(zip)) {
        zip_error.textContent = "Zip code should not contain multiple consecutive spaces."
        return false;
    }

    // -------------------------- Check length constraints -------------------------- //
    if(!isMaxAndMinLengthValid(purok, 1, 20)) {
        purok_error.textContent = "Purok must be between 4 and 20 characters."
        return false;
    }

    if(!isMaxAndMinLengthValid(barangay, 4, 20)) {
        barangay_error.textContent = "Barangay must be between 4 and 20 characters."
        return false;
    }

    if(!isMaxAndMinLengthValid(city, 4, 20)) {
        city_error.textContent = "City must be between 4 and 20 characters."
        return false;
    }

    if(!isMaxAndMinLengthValid(province, 4, 20)) {
        province_error.textContent = "Province must be between 4 and 20 characters."
        return false;
    }

    if(!isMaxAndMinLengthValid(country, 4, 20)) {
        country_error.textContent = "Country must be between 4 and 20 characters."
        return false;
    }

    if(!isMaxAndMinLengthValid(zip, 4, 6)) {
        zip_error.textContent = "Zip code must be between 4 and 6 digits."
        return false;
    }

    // -------------------------- Check for consecutive characters -------------------------- //
    if(hasConsecutiveChars(purok)) {
        purok_error.textContent = "Purok should not contain three or more identical consecutive characters. Example: 'aaa' or 'PPP'"
        return false;
    }

    if(hasConsecutiveChars(barangay)) {
        barangay_error.textContent = "Barangay should not contain three or more identical consecutive characters. Example: 'aaa' or 'PPP'"
        return false;
    }

    if(hasConsecutiveChars(city)) {
        city_error.textContent = "City should not contain three or more identical consecutive characters. Example: 'aaa' or 'PPP'"
        return false;
    }

    if(hasConsecutiveChars(province)) {
        province_error.textContent = "Province should not contain three or more identical consecutive characters. Example: 'aaa' or 'PPP'"
        return false;
    }

    if(hasConsecutiveChars(country)) {
        country_error.textContent = "Country should not contain three or more identical consecutive characters. Example: 'aaa' or 'PPP'"
        return false;
    }

    // -------------------------- Word formatting validation -------------------------- //
    // const pattern = /^([A-Z][a-z0-9]*(?:-[A-Z0-9][A-Za-z0-9]*)?)(\s[A-Z][a-z0-9]*(?:-[A-Z0-9][A-Za-z0-9]*)?)*$/;
    // const pattern = /^((?:[A-Z][a-z0-9]*(?:-[A-Z0-9][A-Za-z0-9]*)?)|(?:\d+-[a-zA-Z]))(\s((?:[A-Z][a-z0-9]*(?:-[A-Z0-9][A-Za-z0-9]*)?)|(?:\d+-[a-zA-Z])))*$/;
    // const pattern = /^((?:[A-Z][a-z0-9]*(?:-[A-Z0-9][A-Za-z0-9]*)?)|(?:\d+-[a-zA-Z]))(?:\s((?:[A-Z][a-z0-9]*(?:-[A-Z0-9][A-Za-z0-9]*)?)|(?:\d+-[a-zA-Z])))*$/;
    // const pattern = /^(Purok(?:-[0-9A-Z]+| [A-Z][a-z]+)?|[0-9]+(?:-[A-Z])?|[A-Z])$/;
    const pattern = /^(Purok(-\d+)?|[0-9]+[A-Z]?)$/

    // Sample tests:
    // console.log(pattern.test("Purok"));           // true
    // console.log(pattern.test("Purok Bayabas"));   // true
    // console.log(pattern.test("Purok-2A"));        // true
    // console.log(pattern.test("Purok bayabas"));   // false
    // console.log(pattern.test("purok Bayabas"));   // false
    // console.log(pattern.test("1-A"));             // true
    // console.log(pattern.test("1-a"));             // true
    // console.log(pattern.test("1"));             // true
    // console.log(pattern.test("1-"));              // false
    // console.log(pattern.test("asdasdasdasd"));    // false

    if (!pattern.test(purok)) {
        purok_error.textContent = "Please enter a valid value. Allowed formats: a number (e.g., '1'), a number followed by a capital letter (e.g., '1A'), 'Purok', or 'Purok' followed by a dash and a number (e.g., 'Purok-1')";
        return false;
    }


    if(!isWordFormatValid(barangay)) {
        barangay_error.textContent = "Invalid format in Barangay. Example: 'Bayanihan'. Each word must start with a capital letter. All Caps are not allowed. No special characters allowed."
        return false;
    }

    if(!isWordFormatValid(city)) {
        city_error.textContent = "Invalid format in City. Example: 'Cabadbaran City'. Each word must start with a capital letter.  All Caps are not allowed. No special characters allowed."
        return false;
    }

    if(!isWordFormatValid(province)) {
        province_error.textContent = "Invalid format in Province. Example: 'Agusan Del Norte'. Each word must start with a capital letter.  All Caps are not allowed. No special characters allowed."
        return false;
    }

    if(!isWordFormatValid(country)) {
        country_error.textContent = "Invalid format in Country. Example: 'Philippines'. Each word must start with a capital letter. All Caps are not allowed. No special characters allowed."
        return false;
    }

    // -------------------------- Zip code should contain digits only -------------------------- 

    if(hasLetter(zip)){
        zip_error.textContent = "Zip code should contain numbers only. Letters are not allowed."
        return false;
    }
    

    purok_error.textContent = ""
    barangay_error.textContent = ""
    city_error.textContent = ""
    province_error.textContent = ""
    country_error.textContent = ""
    zip_error.textContent = ""
    
    return true;
}

function usernameValidation(){
    const form = document.forms["myForm"];
    const username = form["username"].value.trim();

    const username_error = document.getElementById("username-error")

    if(username_error === null) return console.log("Username error field is null")

    if (!username) {
        username_error.textContent = "Username is required."
        return false;
    }

    if (!isMaxAndMinLengthValid(username, 4, 15)) {
        username_error.textContent = "Username must be between 4 and 15 characters."
        return false;
    }

    if (hasDoubleSpace(username)) {
        username_error.textContent = "Username must not contain multiple consecutive spaces."
        return false;
    }

    if (hasConsecutiveChars(username)) {
        username_error.textContent = "Username must not contain three identical consecutive characters. Example: 'aaa' or 'HHH'"
        return false;
    }

    username_error.textContent = "";

    return true;
}


function passwordValidation(){
    const form = document.forms["myForm"];
    const password = form["password"].value.trim();
    const reenteredPassword = form["reenterpassword"].value.trim();

    const password_error = document.getElementById("password-error");
    const reenteredPassword_error = document.getElementById("reenterpassword-error")

    if(password_error === null || reenteredPassword_error === null) return console.log("Passwords Error fields are null")

    if (!password || !reenteredPassword) {
        password_error.textContent = "Both password fields are required.";
        reenteredPassword_error.textContent = "Both password fields are required.";
        return false;
    }
 
    if(!isPasswordMatch(password, reenteredPassword)){
        password_error.textContent = "Passwords do not match."
        reenteredPassword_error.textContent = "Passwords do not match."
        return false;
    }

    const strength = checkPasswordStrength(password);
    if(strength === "Invalid") {

        password_error.textContent = `Password is ${strength}. Please enter at least 8 characters`
        reenteredPassword_error.textContent = `Password is ${strength}. Please enter at least 8 characters`
        return false;
    }

    password_error.textContent = ""
    reenteredPassword_error.textContent = ""
    

    return true;
}

// -------------------- Password realtime checking ---------------------------- //
function passwordStrengthValidation() {
    const form = document.forms["myForm"];
    const password = form["password"].value.trim();
    const reenteredpassword = form["reenterpassword"].value.trim();

    const checkedPassword = checkPasswordStrength(password);

    const password_strength_checker = document.getElementById("password-strength-checker");
    if (password_strength_checker) {
        password_strength_checker.textContent = checkedPassword;
    }

    const password_match_checker = document.getElementById("password-checker-matched");
    if (password_match_checker) {
        if (password === reenteredpassword && password !== "") {
            password_match_checker.textContent = "Password Matched";
        } else {
            password_match_checker.textContent = "";
        }
    }
}

const passwordField = document.getElementById("password");
const reenterPasswordField = document.getElementById("reenterpassword");

if (passwordField) {
    passwordField.addEventListener("keyup", passwordStrengthValidation);
}

if (reenterPasswordField) {
    reenterPasswordField.addEventListener("keyup", passwordStrengthValidation);
}




// Form

function validateRegForm(event) {
    event.preventDefault();

    if(!IDNumberValidation()) return false;

    if(!firstNameValidation()) return false;

    if(!lastNameValidation()) return false;

    if(!middleNameValidation()) return false;

    if(!extentionNameValidation()) return false;

    if(!emailValidation()) return false;

    if(!sexValidation()) return false;

    if(!birthValidation()) return false;

    if(!addressValidation()) return false;

    if(!usernameValidation()) return false;

    if(!passwordValidation()) return false;

    // Retain all the data in the input fields


    // Finalization -> get all data from fields after validation

    const form = document.forms['myForm'];

    // Get input values
    const idnumber = form["idnumber"].value.trim();
    const firstname = form["firstname"].value.trim();
    const lastname = form["lastname"].value.trim();
    const middleinitial = form["middleinitial"].value.trim();
    const extensionname = form["extensionname"].value.trim();
    const email = form["email"].value.trim();
    const sex = form["sex"].value;
    const age = form["age"].value;
    const purok = form["purok"].value.trim();
    const barangay = form["barangay"].value.trim();
    const city = form["city"].value.trim();
    const province = form["province"].value.trim();
    const country = form["country"].value.trim();
    const zip = form["zip"].value.trim();
    const username = form["username"].value.trim();
    const password = form["password"].value.trim();


    const registrationData = {
        idnumber,
        firstname,
        lastname,
        email,
        sex,
        age,
        purok,
        barangay,
        city,
        province,
        country,
        zip,
        username,
        password,
        middleinitial,
        extensionname
    };

    const handleRegistration = async () => {
    console.log("Start")
    console.table(registrationData)
    const response = await services("POST", registrationData, "register");

        if (response.status === 'success') {
            alert(`${response.message}`);
            window.location.href = "login.html"
        } else {
            alert(response.message || `Registration Failed. Try Again!`);
        }
        
    };

    handleRegistration();



    
    return true;
}

document.querySelector("form").addEventListener("submit", validateRegForm);