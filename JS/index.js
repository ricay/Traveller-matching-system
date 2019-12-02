const log = console.log
function jumpTo(url) {
    window.location.href = url;
}

function logIn() {
    const welcomeBasicInfo = document.getElementById("welcome-basic-info");
    const newUser = document.getElementById("new_user");
    const newMessageContainer = document.createElement("div");
    newMessageContainer.id = "message";
    const newMessage = document.createTextNode("Welcome back!");
    newMessageContainer.appendChild(newMessage);
    newMessageContainer.style.fontSize = "250%";
    welcomeBasicInfo.replaceChild(newMessageContainer, newUser);

    const authorization_container = document.createElement("form");
    authorization_container.className = "authorization-container";

    const userName_input1 = document.createElement("div");
    userName_input1.className = "form-group input-group";
    const userName_input2 = document.createElement("div");
    userName_input2.className = "input-group-prepend";
    const userName_span = document.createElement("span");
    userName_span.className = "input-group-text";
    const userName_i = document.createElement("i");
    userName_i.className = "fa fa-user";
    const userName = document.createElement("input");
    userName.name = "";
    userName.id = "userName";
    userName.className = "form-control";
    userName.placeholder = "Username";
    userName.type = "text";
    userName_span.appendChild(userName_i);
    userName_input2.appendChild(userName_span);
    userName_input1.appendChild(userName_input2);
    userName_input1.appendChild(userName);

    const passWord_input1 = document.createElement("div");
    passWord_input1.className = "form-group input-group";
    const passWord_input2 = document.createElement("div");
    passWord_input2.className = "input-group-prepend";
    const passWord_span = document.createElement("span");
    passWord_span.className = "input-group-text";
    const passWord_i = document.createElement("i");
    passWord_i.className = "fa fa-user";
    const passWord = document.createElement("input");
    passWord.name = "";
    passWord.id = "passWord";
    passWord.className = "form-control";
    passWord.placeholder = "Password";
    passWord.type = "text";
    passWord_span.appendChild(passWord_i);
    passWord_input2.appendChild(passWord_span);
    passWord_input1.appendChild(passWord_input2);
    passWord_input1.appendChild(passWord);

    authorization_container.appendChild(userName_input1);
    authorization_container.appendChild(passWord_input1);

    const buttonContainer = document.getElementById("buttons-container");
    const signUpButton = document.getElementById("signup-button");
    const logInButton = document.getElementById("login-button");
    buttonContainer.replaceChild(authorization_container, signUpButton);
    logInButton.textContent = "Enter";
    logInButton.setAttribute('onclick', "checkLogIn()");

    const signUpMessage = document.createElement("p");
    signUpMessage.textContent = "Don't have an account? ";
    const linkToIndex = document.createElement("a");
    linkToIndex.href = "index.html";
    linkToIndex.textContent = "Go Back";
    signUpMessage.appendChild(linkToIndex);
    buttonContainer.appendChild(signUpMessage);

    document.addEventListener('keyup', function(event) {
        if (event.code === 'Enter') {
            logInButton.click()
        }
    });
}

function checkLogIn() {

    // const req = new Request('/users', {
    //         method: 'GET',
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     })

    // fetch(req).then(result => {
    //     log(result)
    // })
    fetch('/users').then(result => {
        log(result.json())
    })

    let userNameInput = document.querySelector("#userName").value;
    let passWordInput = document.querySelector("#passWord").value;
    const incorrectMessage = document.getElementById("incorrect_message");

    // if ((userNameInput !== "user" || passWordInput !== "user") && (userNameInput !== "admin" || passWordInput !== "admin")) {
    //     incorrectMessage.textContent = "Incorrect Username/Password! Please enter again.";
    // } else 
    if (userNameInput === "admin" && passWordInput === "admin"){
        incorrectMessage.textContent = "Please go to admin page to log in as admin.";
    } else {
        // incorrectMessage.hidden = true;
        // jumpTo("plan_trip.html")
        const data = {
            userName: userNameInput,
            password: passWordInput
        }
        const request = new Request('/users/login', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetch(request)
        .then(function(res) {
            if (res.status === 404) {
                incorrectMessage.textContent = "Wrong username or password";
                log(res.status)
            } else {
                window.location.href = res.url;
            }
        }).catch((error) => {
            log(error);
        })
    }
}
