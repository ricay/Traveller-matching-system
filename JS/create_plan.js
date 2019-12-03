const log = console.log;
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
        description: description
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