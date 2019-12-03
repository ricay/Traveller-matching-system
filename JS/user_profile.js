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

// function replaceInfo(){
//     const user=document.getElementById("userName").innerHTML=;
// }


onload = function () {
    url = '/getProfile';

    fetch(url).then((res) =>{
        if (res.status === 200){
            return res.json();
        }else {
            alert('Could not get profile.')
        }
        }).then((json) => { //get  profiles
        console.log(json)
            const profile = json.profile;

            const user = document.getElementById("name1");
            const new_user = document.createElement("h6");
            new_user.innerHTML=profile.userName;
            user.appendChild(new_user);

            const first = document.getElementById("name2");
            const new_first = document.createElement("p");
            new_first.innerHTML=profile.firstName;
            first.appendChild(new_first);

            const last = document.getElementById("name3");
            const new_last = document.createElement("p");
            new_last.innerHTML=profile.lastName;
            last.appendChild(new_last);

            const gen = document.getElementById("gen");
            const new_gen = document.createElement("p");
            new_gen.innerHTML=profile.gender;
            gen.appendChild(new_gen);

            const ema = document.getElementById("ema");
            const new_ema = document.createElement("p");
            new_ema.innerHTML=profile.email;
            ema.appendChild(new_ema);

            const ph = document.getElementById("ph");
            const new_ph = document.createElement("p");
            new_ph.innerHTML=profile.phone;
            ph.appendChild(new_ph);

            // const lan = document.getElementById("lan");
            // const new_lan = document.createElement("p");
            // new_lan.innerHTML=profile.userName;
            // lan.appendChild(new_lan)

            const des = document.getElementById("des");
            const new_des = document.createElement("textarea");
            new_des.className="form-control";
            new_des.placeholder="max 200 words";
            new_des.innerHTML=profile.description;
            des.appendChild(new_des);

            // const dash = document.getElementById("dash");
            // const new_dash = document.createElement("h6");
            // new_dash.innerHTML = profile.userName;
            // dash.appendChild(new_dash);

            const dash2 = document.getElementById("dash");
            const new_dash2 = document.createElement("h7");
            new_dash2.innerHTML=profile.description;
            dash2.appendChild(new_dash2);

            const dash3 = document.getElementById("dash");
            const new_dash3 = document.createElement("h7");
            new_dash3.innerHTML="Review of me:";
            const new_dash4 = document.createElement("h7");
            new_dash4.innerHTML="Rate of me:";
            dash3.appendChild(new_dash3);
            dash3.appendChild(new_dash4);





    })
}