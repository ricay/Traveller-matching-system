function jumpTo(url) {
    window.location.href = url;
}

function transit_home() {
    const home = document.getElementById("home");
    const pro = document.getElementById("profile");
    home.hidden = false;
    home.className = "tab-pane fade show active";
    pro.hidden = true;
    pro.className = "tab-pane fade";
    const homeLink= document.getElementById('home-tab');
    const proLink= document.getElementById('profile-tab');
    proLink.className  = "nav-link";
    proLink.setAttribute("aria-selected", "false");
    homeLink.className = "nav-link active show";
    homeLink.setAttribute("aria-selected","true");

}

function transit_pro(){
    const home = document.getElementById("home");
    const pro = document.getElementById("profile");
    home.hidden = true;
    home.className = "tab-pane fade";
    pro.hidden = false;
    pro.className = "tab-pane fade show active";
    const homeLink= document.getElementById('home-tab');
    const proLink= document.getElementById('profile-tab');
    proLink.className  = "nav-link active show";
    proLink.setAttribute("aria-selected", "true");
    homeLink.className = "nav-link";
    homeLink.setAttribute("aria-selected","false");
    console.log(homeLink);
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
    document.addEventListener('keyup', function(event) {
        if (event.code === 'Enter') {
            logInButton.click()
        }
    });
}

function checkLogIn() {
    let userNameInput = document.querySelector("#userName").value;
    let passWordInput = document.querySelector("#passWord").value;
    const incorrectMessage = document.getElementById("incorrect_message");

    if ((userNameInput !== "user" || passWordInput !== "user") && (userNameInput !== "admin" || passWordInput !== "admin")) {
        incorrectMessage.textContent = "Incorrect Username/Password! Please enter again.";
    } else if (userNameInput === "admin" && passWordInput === "admin"){
        incorrectMessage.textContent = "Please go to admin page to log in as admin.";
    } else {
        incorrectMessage.hidden = true;
        jumpTo("create_plan.html")
    }
}
