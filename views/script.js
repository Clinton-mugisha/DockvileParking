// validation
const validate = () => {
  // picking input fields with their names or ids.
  let FirstName = document.registration.firstname
  let LastName = document.registration.lastname
  let phone = document.registration.phone
  let nin = document.registration.nin
  let carType = document.getElementById("car-type")



  // Picking error fields
  let firstNameError = document.getElementById("firstname-error")
  let lastNameError = document.getElementById("lastname-error")
  let phoneError = document.getElementById("phone-error")
  let carTypeError = document.getElementById("car-type-error")
  let ninError = document.getElementById("nin-error")


  // validation fullname input fields.
  // validating for emptyness errors
  if (FirstName.value == "") {
    FirstName.style.border = "2px solid red";
    firstNameError.textContent = "first name is required";
    firstNameError.style = "color: red; font-size:11px; font-family:Helvetica,Arial,sans-serif;";
    FirstName.focus();
    return false;
  }

  else if (FirstName.value.length < 2) {
    FirstName.style.border = "2px solid red";
    firstNameError.textContent = "First name must be at least 2 characters";
    firstNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    FirstName.focus();
    return false;
  }
  else if (FirstName.value.length > 15) {
    FirstName.style.border = "1px solid red";
    firstNameError.textContent = "First name must no be greater than 15 characters";
    firstNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    FirstName.focus();
    return false;
  }
  else {
    FirstName.style.border = "1px solid green";
    firstNameError.textContent = "";
    LastName.focus();
  }

  if (LastName.value == "") {
    LastName.style.border = "1px solid red";
    lastNameError.textContent = "Last name is required";
    lastNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    LastName.focus();
    return false;
  }
  else if (LastName.value.length < 2) {
    LastName.style.border = "2px solid red";
    lastNameError.textContent = "First name must be at least 2 characters";
    lastNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    LastName.focus();
    return false;
  }
  else if (LastName.value.length > 15) {
    LastName.style.border = "1px solid red";
    lastNameError.textContent = "First name must no be greater than 15 characters";
    lastNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    LastName.focus();
    return false;
  }
  else {
    LastName.style.border = "1px solid green";
    lastNameError.textContent = "";
    LastName.focus();
  }

  // Validating Phone number.
  if (phone.value == "") {
    phone.style.border = "1px solid red";
    phoneError.textContent = "Phone number is required";
    phoneError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    phone.focus();
    return false;
  }
  let phoneRegex = /^[+][2][5][6][0-9]{9}$/
  // /^\+256\d{9}$/

  if (!phoneRegex.test(phone.value)) {
    phone.style.border = "1px solid red";
    phoneError.textContent = "Phone number should start with +256";
    phoneError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    phone.focus();
    return false;
  }

  // validation for car type.
  if (carType.value == "") {
    carType.style.border = "1px solid red";
    carTypeError.textContent = "Select a car type";
    carTypeError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    carType.focus();
    return false;
  }
  // Validating for NIN
  if (nin.value == "") {
    nin.style.border = "1px solid red";
    ninError.textContent = "NIN is required";
    ninError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    nin.focus();
    return false;
  }
  const ninRegex = /^CF([a-zA-Z0-9]{12})+$/


  if (!ninRegex.test(nin.value)) {
    nin.style.border = "1px solid red";
    ninError.textContent = "NIN should look like CFXXXXXXX";
    ninError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    nin.focus();
    return false;
  }

}
// validating number
const numberInput = document.getElementById('numberInput');
let usedNumbers = [];

function validateNumberInput() {
  const selectedNumber = numberInput.value;
  const otherInputs = document.querySelectorAll('input[type="number"]:not(#numberInput)');

  // Check if the selected number has been used today
  if (usedNumbers.includes(selectedNumber)) {
    numberInput.setCustomValidity('This number is already taken');
    numberInput.reportValidity();
  } else {
    numberInput.setCustomValidity('');
  }

  // Check for duplicate numbers in other input fields
  otherInputs.forEach(input => {
    if (input.value === selectedNumber) {
      input.setCustomValidity('This number is already taken');
      input.reportValidity();
    } else {
      input.setCustomValidity('');
    }
  });
}

function startNewDay() {
  usedNumbers = [];
}

// Call startNewDay function when a new day begins
startNewDay();







