const log = console.log;
var email;


function loadPage() {
    const url = '/creator';

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                //log(res.json())
                ; return res.json();
            } else {
                alert('Could not get creator info')
            }
        }).then((json) => {  // the resolved promise with the JSON body
        //const plans = json.plans;

        email = json.creator[0].email;
        log(email)


    }).catch((error) => {
        log(error)
    })
}



function jumpTo(url) {

    const transportation = document.getElementById("MethodOfTravel").value;

    const planname = document.getElementById("PlanName").value;
    const cost = document.getElementById("ExceptCost").value;
    const startTime = document.getElementById("StartDate").value;
    const endTime = document.getElementById("EndDate").value;
    const poolMember = [];
    const startPlace = document.getElementById("StartPlace").value;
    const endPlace = document.getElementById("EndPlace").value;
    const places = [];
    places.push(startPlace);
    places.push(endPlace);
    const description = document.querySelector("#Description").value;
    const data = {
        name: planname,
        places: places,
        transportation: transportation,
        cost: cost,
        startTime: startTime,
        endTime: endTime,
        poolMember:poolMember,
        description: description,
        creatoremail: email
    };
    const request = new Request('/plan', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })
    fetch(request)
        .then(function(res) {
            if (res.status === 200) {
                log(res);
                window.location.href = url;
            } else {
                log("Failed to add new plan");
            }
        }).catch((error) => {
            log(error);
    })
}