function logIn() {
    const authorizationContainer = document.getElementById("authorization-container");
    authorizationContainer.hidden = false;
    const logInButton = document.getElementById("login-button");
    logInButton.textContent = "Enter";
    logInButton.setAttribute('onclick', "checkLogIn()");
    document.addEventListener('keyup', function(event) {
        if (event.code === 'Enter') {
            logInButton.click()
        }
    });
}

function checkLogIn() {
    let userNameInput = document.querySelector("#userName").value;
    let passWordInput = document.querySelector("#passWord").value;
    const incorrectMessage = document.getElementById("incorrect-message");
    const buttonsContainer = document.getElementById("buttons-container");
    const functionContainer = document.getElementById("function-container");

    if ((userNameInput !== "user" || passWordInput !== "user") && (userNameInput !== "admin" || passWordInput !== "admin")) {
        incorrectMessage.textContent = "Incorrect Username/Password! Please enter again.";
    } else if (userNameInput === "user" && passWordInput === "user"){
        incorrectMessage.textContent = "Please go to user page to log in as user.";
    } else {
        incorrectMessage.hidden = true;
        buttonsContainer.hidden = true;
        functionContainer.hidden = true;
    }
}
