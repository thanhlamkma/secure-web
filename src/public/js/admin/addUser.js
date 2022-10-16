let formAdd = document.getElementById("formAdd");
let firstName = document.querySelector("#formAdd #firstName");
let lastName = document.querySelector("#formAdd #lastName");
let email = document.querySelector("#formAdd #email");
let address = document.querySelector("#formAdd #address");
let gender = document.querySelector("#formAdd #gender");
let phone = document.querySelector("#formAdd #phone");
let roleId = document.querySelector("#formAdd #roleId");
let password = document.querySelector("#formAdd #password");
var btnClose = document.querySelector("#formAdd .btn-close");

// Alert message
var myAlert = document.getElementById("toastNotice"); //select id of toast
var bsAlert = new bootstrap.Toast(myAlert); //inizialize it
var toastBody = document.querySelector(".toast-body");
var successAlert = document.querySelector(".toast-body .success-alert");
var errorAlert = document.querySelector(".toast-body .error-alert");

function alertMsg(success, message) {
  bsAlert.show(); //show it
  _btnClose.click();
  if (!success) {
    errorAlert.style.display = "block";
    successAlert.style.display = "none";
    errorAlert.innerText = message;
  } else {
    successAlert.style.display = "block";
    errorAlert.style.display = "none";
    successAlert.innerText = message;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

formAdd.addEventListener("submit", () => {
  const user = {
    email: email.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    gender: gender.value,
    roleId: roleId.value,
    phone: phone.value,
  };
  console.log("user", user);

  fetch("/admin/add-user", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      alertMsg(data.isSuccess, data.message);
    });
});
