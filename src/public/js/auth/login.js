let loginForm = document.getElementById("loginForm");
let emailLogin = document.querySelector("#loginForm .email-login");
let passLogin = document.querySelector("#loginForm .pass-login");
let errorLogin = document.querySelector("#loginForm .error-login");
let successLogin = document.querySelector("#loginForm .success-login");

loginForm.addEventListener("submit", () => {
  const login = {
    email: emailLogin.value,
    password: passLogin.value,
  };
  console.log("login", login);

  fetch("/post-login", {
    method: "POST",
    body: JSON.stringify(login),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.isSuccess) {
        errorLogin.style.display = "block";
        successLogin.style.display = "none";
        errorLogin.innerText = data.message;
      } else {
        successLogin.style.display = "block";
        errorLogin.style.display = "none";
        successLogin.innerText = data.message;
        window.location.reload();
      }
    });
});
