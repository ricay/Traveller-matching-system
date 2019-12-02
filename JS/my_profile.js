
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

function jumpTo(url) {
    window.location.href = url;
}

//
function editProfile(){
    // the URL for the request
    const url = '/editProfile';

    // The data we are going to send in our request
    let data = {
        name: document.querySelector('#userName').value,
        first: document.querySelector('#firstName').value,
        last: document.querySelector('#lastName').value,
        gender: document.querySelector('#Gender').value,
        dob: document.querySelector('#Birthday').value,
        email: document.querySelector('#Email').value,
        phone:document.querySelector('#Phone').value,
        // language: document.querySelector('Languages').value,
        description:document.querySelector('Description').value,
    }
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            window.location.href = '/user_profile.html' //???????????
        })
        .catch(error => console.log(error))
}


