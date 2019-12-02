const log = console.log;
function jumpTo(url) {
    window.location.href = url;
}

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

    // Server use
    url = '/admin/login/'+userNameInput+'/'+passWordInput;
    const request = new Request(url, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        }
    });
    fetch(request).then(function(res) {
        if (res.status === 200) {
            jumpTo("admin_main.html");
        } else {
            incorrectMessage.textContent = "Incorrect Username/Password! Please enter again.";
        }
    }).catch((error) => {
        log(error);
    });
}
