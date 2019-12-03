const log = console.log;
function jumpTo(url) {
    window.location.href = url;
}

function insertRecommendation() {
    const newName = document.getElementById("planName").value;
    const newDestination = document.getElementById("Destination").value;
    const newTimePeriod = document.getElementById("RecommendedTimePeriod").value;
    const newExpectCost = document.getElementById("ExpectCost").value;
    const newDescription = document.querySelector("#Description").value;
    // const newImage = document.getElementById("dragImage").value;
    const newRecommendation = {
        name: newName,
        creator: "admin",
        places: [newDestination],
        transportation: "By preference",
        cost: newExpectCost,
        startTime: "By preference",
        endTime: "Will last for " + newTimePeriod,
        poolMember: [],
        description: newDescription
    };
    log(newRecommendation);
    const request = new Request('/admin/insertRecommendation', {
        method: 'post',
        body: JSON.stringify(newRecommendation),
        headers: {
            'Content-type': 'application/json'
        }
    });
    fetch(request)
        .then(function(res) {
            if (res.status === 200) {
                Swal.fire(
                    'Success!',
                    'You inserted a new recommendation!',
                    'success'
                )
            } else {
                log("Failed to add new recommendation");
            }
        }).catch((error) => {
            log(error);
    })
}