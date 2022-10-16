let deleteModal = document.getElementById("deleteModal");
var modalBody = document.querySelector("#deleteModal .modal-body");
var btnCloseDelete = document.querySelector("#deleteModal .btn-close-delete");
var btnDelete = document.querySelector("#deleteModal .btn-delete");

const deleteUser = (id, name) => {
  userId = id;
  modalBody.innerText = "Are you sure to delete user " + name + " ?";
};

btnDelete.addEventListener("click", () => {
  fetch(`/admin/delete-user`, {
    method: "POST",
    body: JSON.stringify({ id: userId }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      btnCloseDelete.click();
      alertMsg(data.isSuccess, data.message);
    });
});
