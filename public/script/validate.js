// validation
const validate=(event)=>{
    // picking input fields with their names or ids.
    let FirstName = document.registration.firstname
    let LastName = document.registration.lastname
    let phone = document.registration.phone
    let numberPlate = document.getElementById("number-plate");
    let color = document.getElementById("color");
    let arrivalTime = document.getElementById("arrival-time");
    let departureTime = document.getElementById("departure-time");
    let date = document.getElementById("date");
    let gender = document.getElementById("gender");
    let period =  document.getElementById("period");
    let amount = document.getElementById("amount");
    let carType = document.getElementById("car-type")

// Picking error fields
let firstNameError = document.getElementById("firstname-error")
let lastNameError = document.getElementById("lastname-error")
let phoneError = document.getElementById("phone-error")
let carTypeError = document.getElementById("car-type-error")
let numberPlateError = document.getElementById("number-plate-error");
    let colorError = document.getElementById("color-error");
    let arrivalTimeError = document.getElementById("arrival-time-error");
    let departureTimeError = document.getElementById("departure-time-error");
    let dateError = document.getElementById("date-error");
    const periodError = document.getElementById("period-error");
    let amountError = document.getElementById("amount-error");
    let genderError = document.getElementById("gender-error");
    

let error=0

// validation fullname input fields.
// validating for emptyness errors
if(FirstName.value ==""){
   FirstName.style.border = "2px solid red";
   firstNameError.textContent = "first name is required";
   firstNameError.style = "color: red; font-size:11px; font-family:Helvetica,Arial,sans-serif;";
   FirstName.focus();
   error++;
}

else if (FirstName.value.length <2 ){
    FirstName.style.border = "2px solid red";
    firstNameError.textContent = "First name must be at least 2 characters";
    firstNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    FirstName.focus();
    error++;
}
else if (FirstName.value.length >15){
    FirstName.style.border = "1px solid red";
    firstNameError.textContent = "First name must no be greater than 15 characters";
    firstNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    FirstName.focus();
    error++;
}else if (!/^[A-Z][a-zA-Z]*$/.test(FirstName.value)) {
    FirstName.style.border = "2px solid red";
    firstNameError.textContent = "First name should start with a capital letter and contain only alphabetic characters";
    firstNameError.style = "color: red; font-size:11px; font-family:Helvetica,Arial,sans-serif;";
    FirstName.focus();
    error++;
}else{
    FirstName.style.border = "1px solid green";
    firstNameError.textContent = "";
    LastName.focus(); 
}

if(LastName.value == ""){
    LastName.style.border = "1px solid red";
    lastNameError.textContent = "Last name is required";
    lastNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    LastName.focus();
    error++;
}else if (!/^[A-Z][a-zA-Z]*$/.test(LastName.value)) {
    LastName.style.border = "2px solid red";
    lastNameError.textContent = "Last name should start with a capital letter and contain only alphabetic characters";
    lastNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    LastName.focus();
    error++;
  }
else if (LastName.value.length <2 ){
    LastName.style.border = "2px solid red";
    lastNameError.textContent = "First name must be at least 2 characters";
    lastNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    LastName.focus();
    error++;
}
else if (LastName.value.length >15){
    LastName.style.border = "1px solid red";
    lastNameError.textContent = "First name must no be greater than 15 characters";
    lastNameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    LastName.focus();
    error++;
}
else{
    LastName.style.border = "1px solid green";
    lastNameError.textContent = "";
    LastName.focus(); 
}

// Validating Phone number.
if(phone.value == ""){
    phone.style.border = "1px solid red";
    phoneError.textContent = "Phone number is required";
    phoneError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    phone.focus();
    error++;   
}
let phoneRegex =/^[+][2][5][6][0-9]{9}$/
// /^\+256\d{9}$/

if(!phoneRegex.test(phone.value)){
    phone.style.border = "1px solid red";
        phoneError.textContent = "Phone number should start with +256";
        phoneError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
        phone.focus();
        error++;
}

// validation for car type.
if (carType.value == ""){
   carType.style.border = "1px solid red";
   carTypeError.textContent = "Select a car type";
   carTypeError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    carType.focus();
    error++;
}
// Validating for NIN
let nin = document.registration.nin
  let ninError = document.getElementById("nin-error")
if(nin.value == ""){
    nin.style.border = "1px solid red";
    ninError.textContent = "NIN is required";
    ninError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
    nin.focus();
    error++;
}
const ninRegex = /^CF([a-zA-Z0-9]{12})+$/
const ninRegex2 = /^CM([a-zA-Z0-9]{12})+$/


if(!(ninRegex.test(nin.value)|| ninRegex2.test(nin.value))){
  nin.style.border = "1px solid red";
      ninError.textContent = "NIN should look like CFXXXXXXX or CMXXXXXXX";
      ninError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
      nin.focus();
      error++;
}
else{
    nin.style.border = "1px solid green";
    ninError.textContent = "";
}
if(error > 0){
    event.preventDefault();
}
// Validation for number plate
    if (numberPlate.value.trim() === "") {
      numberPlate.style.border = "1px solid red";
      numberPlateError.textContent = "Number plate is required";
      numberPlateError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
      numberPlate.focus();
      error++;
    } else {
      numberPlate.style.border = "1px solid green";
      numberPlateError.textContent = "";
    }
  
    // Validation for color
    if (color.value.trim() === "") {
      color.style.border = "1px solid red";
      colorError.textContent = "Color is required";
      colorError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
      color.focus();
      error++;
    } else {
      color.style.border = "1px solid green";
      colorError.textContent = "";
    }
  
    // Validation for arrival time
    if (arrivalTime.value.trim() === "") {
      arrivalTime.style.border = "1px solid red";
      arrivalTimeError.textContent = "Arrival time is required";
      arrivalTimeError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
      arrivalTime.focus();
      error++;
    } else {
      arrivalTime.style.border = "1px solid green";
      arrivalTimeError.textContent = "";
    }
  
    // Validation for departure time
    if (departureTime.value.trim() === "") {
      departureTime.style.border = "1px solid red";
      departureTimeError.textContent = "Departure time is required";
      departureTimeError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
      departureTime.focus();
      error++;
    } else {
      departureTime.style.border = "1px solid green";
      departureTimeError.textContent = "";
    }
  
    // Validation for date
    if (date.value.trim() === "") {
      date.style.border = "1px solid red";
      dateError.textContent = "Date is required";
      dateError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
      date.focus();
      error++;
    } else {
      date.style.border = "1px solid green";
      dateError.textContent = "";
    }
  
    // Validation for period
if (period.value === "Period") {
  period.style.border = "1px solid red";
  periodError.textContent = "Please select a period";
  periodError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
  period.focus();
  error++;
} else {
  period.style.border = "1px solid green";
  periodError.textContent = "";
}

  
    // Validation for amount
    if (amount.value === "Amount") {
      amount.style.border = "1px solid red";
      amountError.textContent = "Please select an amount";
      amountError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
      amount.focus();
      error++;
    } else {
      amount.style.border = "1px solid green";
      amountError.textContent = "";
    }
// Validation for date
if (date.value.trim() === "") {
  date.style.border = "1px solid red";
  dateError.textContent = "Date is required";
  dateError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
  date.focus();
  error++;
} else {
  date.style.border = "1px solid green";
  dateError.textContent = "";
}

// Validation for gender
if(gender.value === "Gender") {
  gender.style.border = "1px solid red";
  genderError.textContent = "Please select a gender";
  genderError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
  gender.focus();
  error++;
} else {
  gender.style.border = "1px solid green";
  genderError.textContent = "";
}






// Generating unique id numbers
 const boddanumberRegex = /^BB-([0-9]{3})+$/
 const carnumberRegex = /^CR-([0-9]{3})+$/
 const trucknumberRegex = /^TK-([0-9]{3})+$/
 const coasternumberRegex = /^CA-([0-9]{3})+$/
 const taxinumberRegex = /^TX-([0-9]{3})+$/
//  eg BB-001, BB-002, BB-003


}

  