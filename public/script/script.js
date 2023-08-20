const validate = (event) => {
    // picking input fields with their names or ids.
    let Name = document.registration.name
    let passwordd = document.registration.passwordd
     let email = document.registration.email
    let NameError = document.getElementById("nameerror")
    let passworddError = document.getElementById("passwordderror")
     let emailError = document.getElementById("emailerror")

    let error = 0

    if (Name.value == "") {
        Name.style.border = "2px solid red";
        NameError.textContent = " Name is required";
        NameError.style = "color: red; font-size:11px; font-family:Helvetica,Arial,sans-serif;";
        Name.focus();
        error++;
    } else if (Name.value.length < 2) {
        Name.style.border = "2px solid red";
        NameError.textContent = " name must be at least 2 characters";
        NameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
        Name.focus();
        error++;
      }
      else if (Name.value.length > 20) {
        Name.style.border = "1px solid red";
        NameError.textContent = " name must no be greater than 20 characters";
        NameError.style = "color: red; font-size:11px; font-family:helvetica,Arial,sans-serif;";
        Name.focus();
        error++;
      } else if (!/^[A-Z][a-zA-Z]*$/.test(Name.value)) {
        Name.style.border = "2px solid red";
        NameError.textContent = " Name should start with a capital letter and contain only alphabetic characters";
        NameError.style = "color: red; font-size:11px; font-family:Helvetica,Arial,sans-serif;";
        Name.focus();
        error++;
      } else {
        Name.style.border = "1px solid green";
        NameError.textContent = "";
        Name.focus();
      }


      if (passwordd.value == "") {
        passwordd.style.border = "2px solid red";
        passworddError.textContent = " password is required";
        passworddError.style = "color: red; font-size:11px; font-family:Helvetica,Arial,sans-serif;";
        passwordd.focus();
        error++;
    }

    if (email.value == "") {
        email.style.border = "2px solid red";
        emailError.textContent = " Email is required";
        emailError.style = "color: red; font-size:11px; font-family:Helvetica,Arial,sans-serif;";
        email.focus();
        error++;
      } else if (!validateEmailFormat(email.value)) {
        email.style.border = "2px solid red";
        emailError.textContent = " Invalid email format";
        emailError.style = "color: red; font-size:11px; font-family:Helvetica,Arial,sans-serif;";
        email.focus();
        error++;
      } else {
        email.style.border = "1px solid green";
        emailError.textContent = "";
      }


    if (error > 0) {
        event.preventDefault();

    }

}
function validateEmailFormat(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validatte = (event) => {
    // picking input fields with their names or ids.
    let passwordd = document.registra.passworddd
     let email = document.registra.emaill
    let passworddError = document.getElementById("passworddderror")
     let emailError = document.getElementById("emaillerror")

    let error = 0


      if (passwordd.value == "") {
        passwordd.style.border = "2px solid red";
        passworddError.textContent = " password is required";
        passworddError.style = "color: red; font-size:11px; font-family:Helvetica,Arial,sans-serif;";
        passwordd.focus();
        error++;
    }

    if (email.value == "") {
        email.style.border = "2px solid red";
        emailError.textContent = " Email is required";
        emailError.style = "color: red; font-size:11px; font-family:Helvetica,Arial,sans-serif;";
        email.focus();
        error++;
      } else if (!validateEmailFormat(email.value)) {
        email.style.border = "2px solid red";
        emailError.textContent = " Invalid email format";
        emailError.style = "color: red; font-size:11px; font-family:Helvetica,Arial,sans-serif;";
        email.focus();
        error++;
      } else {
        email.style.border = "1px solid green";
        emailError.textContent = "";
      }


    if (error > 0) {
        event.preventDefault();

    }

}