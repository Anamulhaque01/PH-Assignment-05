document.getElementById("login-btn").addEventListener("click", function (event) {
    event.preventDefault();

    const userName = document.getElementById("userName");
    const userNameValue = userName.value;

    const userPass = document.getElementById("userPass");
    const userPassValue = userPass.value;

    if (userNameValue === "admin" && userPassValue === "admin123") {
        alert("Login Success");
        window.location.href("main.html");
        userName.value = "";
        userPass.value = "";
    }
    else {
        alert("Login Failed");
        userName.value = "";
        userPass.value = "";
        return;
    }

})