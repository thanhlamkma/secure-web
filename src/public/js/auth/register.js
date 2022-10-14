let registerForm = document.getElementById("registerForm");
let emailRegister = document.querySelector("#registerForm .emailRegister");
let passRegister = document.querySelector("#registerForm .passRegister");
let firstName = document.querySelector("#registerForm .firstName");
let lastName = document.querySelector("#registerForm .lastName");
let address = document.querySelector("#registerForm .address");
let phone = document.querySelector("#registerForm .phone");
let gender = document.querySelector("#registerForm #gender");
let errorRegister = document.querySelector("#registerForm .error-register");
let successRegister = document.querySelector("#registerForm .success-register");

registerForm.addEventListener("submit", () => {
  const register = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    phone: phone.value,
    gender: gender.value,
    email: emailRegister.value,
    password: passRegister.value,
  };
  console.log("register", register);

  fetch("/post-register", {
    method: "POST",
    body: JSON.stringify(register),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.isSuccess) {
        errorRegister.style.display = "block";
        successRegister.style.display = "none";
        errorRegister.innerText = data.message;
      } else {
        successRegister.style.display = "block";
        errorRegister.style.display = "none";
        successRegister.innerText = data.message;
      }
    });
});
