const log = console.log;

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
    url = '/editProfile';

    // The data we are going to send in our request
    let data = {
        userName: document.querySelector('#userName').value,
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        gender: document.querySelector('#Gender').value,
        birthday: document.querySelector('#Birthday').value,
        email: document.querySelector('#Email').value,
        phone:document.querySelector('#Phone').value,
        // language: document.querySelector('Languages').value,
        description:document.querySelector('#Detail').value,
        placeName:document.querySelector('place').value,
        date:document.querySelector('date').value,
        feel:document.querySelector('fe').value,
    };
    log(data);
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request).then(function(res) {
        if (res.status === 200) {
            log('edited');
            jumpTo('user_profile.html');
        } else {
            log('failed edit');
        }
    }).catch((error) => {
        log(error)
    })
}

app.put('/editProfile', (req, res) => {
    const userName = req.body.userName;
    const first = req.body.firstName;
    const last = req.body.lastName;
    const gender = req.body.gender;
    const dob = req.body.birthday;
    const email = req.body.email;
    const phone = req.body.phone;
    // const language = req.body.language;
    const description = req.body.description;
    const placeName = req.body.placeName;
    const data = req.body.date;
    const fe = req.body.fe;


    log(req.session.userName);

    //save to database
    Profile.findOne({userName:req.session.userName}).then(profile => {
        log(profile);
        if (!profile) {
            res.status(404).send()
        } else {
            profile.userName = userName;
            profile.firstName = first;
            profile.lastName = last;
            profile.gender = gender;
            profile.birthday = dob;
            profile.email = email;
            profile.phone = phone;
            // profile.language = language;
            profile.description = description;
            profile.placeName = placeName;
            profile.data = data;
            profile.fe = fe;

            profile.save().then((result) => {
                res.send({result});
            }, (error) => {
                res.status(404).send(error)
            });
        }
    }).catch((error) => {
        log(2);
        res.status(500).send()
    });
});



