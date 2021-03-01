// Assignment Code
var generateBtn = document.querySelector("#generate");

// Global Variables
const minLength = 8;
const maxLength = 128;

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Prompt to support each password rule
function generatePassword() {
  // Function Variables
  var allowLowerChars = "";
  var allowUpperChars = "";
  var allowSpecialChars = "";
  var charactersAllowed = "";
  var charactersAllowedLength = 0;
  var errorText = "";
  var messageText = "What length of password do you want (" + minLength + " - " + maxLength + ")?";
  var password = "";
  var passwordLength = 0;

  //Contant Variables
  const charactersAlpha = "abcdefghijklmnopqrstuvwxyz";
  const charactersSpecial = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  // Password length
  do {
    passwordLength = getInput(messageText, errorText);
    errorText = validateLength(passwordLength);
  } while (errorText !== "")

  // User must select to allow for at least 1: lowercase, uppercase or special chars
  do {
    // Allow Lowercase Characters
    messageText = "Include lowercase characters?"
    do {
      allowLowerChars = getInput(messageText, errorText);
      errorText = validateYesNo(allowLowerChars);
    } while (errorText !== "")
    allowLowerChars = allowLowerChars.trim().toLowerCase().substr(0, 1);

    // Allow Upppercase Characters
    messageText = "Include uppercase characters?"
    do {
      allowUpperChars = getInput(messageText, errorText);
      errorText = validateYesNo(allowUpperChars);
    } while (errorText !== "")
    allowUpperChars = allowUpperChars.trim().toLowerCase().substr(0, 1);

    // Allow Special Characters
    messageText = "Include special characters?"
    do {
      allowSpecialChars = getInput(messageText, errorText);
      errorText = validateYesNo(allowSpecialChars);
    } while (errorText !== "")
    allowSpecialChars = allowSpecialChars.trim().toLowerCase().substr(0, 1);

    errorText = "You must select at least 1: Allow Lower, Allow Upper, or Allow Special";
  } while (allowLowerChars !== "y" && allowUpperChars !== "y" && allowSpecialChars !== "y")

  if (allowLowerChars === "y") charactersAllowed = charactersAlpha;
  if (allowUpperChars === "y") charactersAllowed += charactersAlpha.toUpperCase();
  if (allowSpecialChars === "y") charactersAllowed += charactersSpecial;

  charactersAllowedLength = charactersAllowed.length;
  for (var i = 0; i < passwordLength; i++) {
    password += charactersAllowed.charAt(Math.floor(Math.random() * charactersAllowedLength));
  }
  console.log(charactersAllowed);
  console.log(password);
  return password;
}

// Get Input from prompt
function getInput(messageText, errorText) {
  if (errorText !== undefined && errorText.trim() !== "") {
    messageText = errorText.trim() + "\n\n" + messageText.trim();
  }
  var input = prompt(messageText);
  return input;
}

// Validate Password Length
function validateLength(passwordLength) {
  var errorText = "";
  if (passwordLength < minLength || passwordLength > maxLength) {
    errorText = "Length must be between " + minLength + " and " + maxLength + ".";
  }
  return errorText;
}

// Validate Yes or No Input
function validateYesNo(yesNo) {
  var errorText = "";
  if (yesNo.trim().toLowerCase() !== 'y' && yesNo.trim().toLowerCase() !== 'yes' &&
    yesNo.trim().toLowerCase() !== 'n' && yesNo.trim().toLowerCase() !== 'no') {
    errorText = "Input must be 'Y' or 'N'.";
  }
  return errorText;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
