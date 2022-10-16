let formChangePermission = document.getElementById("formChangePermission");
let allPermission = document.querySelector("#formChangePermission #allPermission");
let readPermission = document.querySelector("#formChangePermission #readPermission");
var btnClose = document.querySelector("#formChangePermission .btn-close");

// Alert message
var myAlert = document.getElementById("toastNotice"); //select id of toast
var bsAlert = new bootstrap.Toast(myAlert); //inizialize it
var toastBody = document.querySelector(".toast-body");
var successAlert = document.querySelector(".toast-body .success-alert");
var errorAlert = document.querySelector(".toast-body .error-alert");


function getUserPermission()

formChangePermission.addEventListener("submit", () => {
  const user = {
    
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
