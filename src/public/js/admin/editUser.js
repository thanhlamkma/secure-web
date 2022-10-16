let formEdit = document.getElementById("formEdit");
let _firstName = document.querySelector("#formEdit #firstName");
let _lastName = document.querySelector("#formEdit #lastName");
let _email = document.querySelector("#formEdit #email");
let _address = document.querySelector("#formEdit #address");
let _gender = document.querySelector("#formEdit #gender");
let _phone = document.querySelector("#formEdit #phone");
let _roleId = document.querySelector("#formEdit #roleId");
let _password = document.querySelector("#formEdit #password");
var _btnClose = document.querySelector("#formEdit .btn-close");

let userId;

const getUserInfo = (id) => {
  userId = id;
  fetch(`/admin/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(({ data, isSuccess, message }) => {
      if (isSuccess) {
        _email.value = data.email;
        // _password.value = data.password;
        _firstName.value = data.firstName;
        _lastName.value = data.lastName;
        _address.value = data.address;
        _gender.value = data.gender ? true : false;
        _roleId.value = data.roleId;
        _phone.value = data.phone;
      }
    });
};

formEdit.addEventListener("submit", () => {
  const user = {
    id: Number(userId),
    email: _email.value,
    password: _password.value,
    firstName: _firstName.value,
    lastName: _lastName.value,
    address: _address.value ? _address.value : undefined,
    gender: _gender.value === "true" ? true : false,
    roleId: _roleId.value,
    phone: _phone.value ? _phone.value : undefined,
  };
  console.log("user", user);

  fetch("/admin/edit-user", {
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
