
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

function addProfile(){
    // the URL for the request
    const url = '/profiles';

    // The data we are going to send in our request
    let data = {
        name: document.querySelector('#Username').value,
        gender: document.querySelector('#Gender').value
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
        .then(function(res) {

            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            const message = document.querySelector('#message')
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                console.log('Added student')
                message.innerText = 'Success: Added a student.'
                message.setAttribute("style", "color: green")

            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                message.innerText = 'Could not add student'
                message.setAttribute("style", "color: red")

            }
            log(res)  // log the result in the console for development purposes,
            //  users are not expected to see this.
        }).catch((error) => {
        log(error)
    })
}


