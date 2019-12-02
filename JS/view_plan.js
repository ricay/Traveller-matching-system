var planList = [];
var numberOfPlans = 1;
const log = console.log;


var planList = [];

const myPlanTable = document.getElementById('myPlanList');
var num_row = 0;
var row;
var index = 0;




function jumpTo(url) {
    window.location.href = url;
}

// class Plan {
//     constructor(StartPlace, EndPlace, MethodOfTravel,ExceptCost,StartDate,EndDate,Img,Author) {
//         this.StartPlace = StartPlace;
//         this.EndPlace = EndPlace;
//         this.MethodOfTravel = MethodOfTravel;
//         this.ExceptCost = ExceptCost;
//         this.StartDate = StartDate;
//         this.EndDate = EndDate;
//         this.SpotList = [];
//         this.PlanID = numberOfPlans;
//         this.PlanID = numberOfPlans;
//         this.Img = Img;
//         this.Author = Author;
//         this.numPeople = 1;
//         this.disPlay = false;
//         numberOfPlans++;
//     }
// }

function clicked(bool, id) {
    if (bool === true) {
        let numPeople = document.getElementById("numPeople");
        numPeople.textContent = (parseInt(numPeople.textContent) + 1).toString();
    }
    document.getElementById(id).hidden = true;
}

function loadMyPlan(){

    const url = '/plan';

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                //log(res.json())
;               return res.json();
            } else {
                alert('Could not get my plans')
            }
        }).then((json) => {  // the resolved promise with the JSON body
        const plans = json.plans;
        log(plans);
        for (let i=0;i<plans.length;i++){


                addNewPlanToView(plans[i],index);
                index++;


        }


    }).catch((error) => {
        log(error)
    })

}




function addNewPlanToView(Plan,index){
    if (index % 4 == 0){
        log(myPlanTable);
        row = myPlanTable.insertRow(num_row);
        num_row+=1;
    }


    const cell = row.insertCell(index % 4);
    //const content = document.getElementById('pinBoot');
    const plan = document.createElement('div');
    plan.className = "white-panel";
    plan.id = Plan.PlanID;

    plan.style.background = 'white';
    plan.style.height = 'max-content';
    plan.style.width = '20vw';
    plan.style.borderRadius = '5%';
    plan.style.padding = '10px';

    //const img = document.createElement('IMG');
    const StartPlace = document.createElement('p');
    StartPlace.innerHTML = 'StartPlace:  ' + Plan.places[0];
    const EndPlace = document.createElement('p');
    EndPlace.innerHTML = 'EndPlace:  ' + Plan.places[1];
    const MethodOfTravel = document.createElement('p');
    MethodOfTravel.innerHTML = 'Method of Travel:  ' + Plan.transportation;
    const ExceptCost = document.createElement('p');
    ExceptCost.innerHTML = 'Except Cost:  ' + Plan.cost + ' dollars';
    const StartDate = document.createElement('p');
    StartDate.innerHTML = 'StartDate:  ' + Plan.startTime;
    const EndDate = document.createElement('p');
    EndDate.innerHTML = 'EndDate:  ' + Plan.endTime;
    const Author = document.createElement('p');
    Author.innerHTML = 'Author:  ' + Plan.creator;
    const Id = document.createElement('p');
    Id.innerHTML =Plan._id;
    Id.hidden = true;
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete this plan'
    deleteButton.onclick = function(){deletePlan(Plan._id)};



        //img.src = Plan.Img;
    //img.alt = "";
    //img.className = "place";

    //plan.appendChild(img);
    plan.appendChild(StartPlace);
    plan.appendChild(EndPlace);
    plan.appendChild(MethodOfTravel);
    plan.appendChild(ExceptCost);
    plan.appendChild(StartDate);
    plan.appendChild(EndDate);
    plan.appendChild(Author);
    plan.appendChild(Id);
    plan.appendChild(deleteButton);




    cell.appendChild(plan);

    //document.getElementById(JoinButton.id).onclick = function(){changeNumPeople(JoinButton.id,planList)};

}
function deletePlan(ID) {
    log(ID);
    const url =  '/plan/'+ID;
    const request = new Request(url, {
        method: 'delete',
        headers: {
            'Content-type': 'application/json'
        }
    });
    fetch(request)
        .then(function(res) {
            if (res.status === 200) {
                window.location.href = 'view_plan.html';
            } else {
                alert('should not happened!')
            }
        }).catch((error) => {
        log(error);
    })
}