const log = console.log;
var planList = [];
var numberOfPlans = 1;
const tripListTable = document.getElementById('tripsListTable');
var num_row = 0;
var row
var index = 0;
function jumpTo(url) {
    window.location.href = url;
}

class Plan {
    constructor(StartPlace, EndPlace, MethodOfTravel,ExceptCost,StartDate,EndDate,Img,Author) {
        this.StartPlace = StartPlace;
        this.EndPlace = EndPlace;
        this.MethodOfTravel = MethodOfTravel;
        this.ExceptCost = ExceptCost;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.SpotList = [];

        this.PlanID = numberOfPlans;
        this.Img = Img;
        this.Author = Author;
        this.numPeople = 1;
        this.disPlay = false;
        numberOfPlans++;
        console.log(numberOfPlans)
    }
}
function loadSearchResult()
    {
        const url = '/plan/search';

        // Since this is a GET request, simply call fetch on the URL
        fetch(url)
            .then((res) => {
                return res.json();
            }).then((json) => {  // the resolved promise with the JSON body
                const location = json;
                log(location)
            fetch('/allPlan')
                .then((res) => {
                    return res.json();
                }).then((plans) => {
                // log(plans.plans[0]);
                for (let i=0;i<plans.plans.length;i++){
                    // here!!!
                    if(plans.plans[i].places.includes(location)){
                        log(plans.plans[i].places);
                        addNewPlanToView(plans.plans[i],index);
                        index++;
                    }

                }
            })


        }).catch((error) => {
            log(error)
        })

}
const Trip1 = new Plan('Athens','Santorini','bike',1000,'2019.11.01','2019.12.01','PIC/Santorini1.jpg','Tony');
Trip1.SpotList.push('Athens');
Trip1.SpotList.push('Santorini');
const Trip2 = new Plan('Athens','Santorini','bike',2000,'2019.12.01','2020.1.01','PIC/Santorini1.jpg','Bony');
Trip2.SpotList.push('Athens');
Trip2.SpotList.push('Santorini');
const Trip3 = new Plan('Athens','Santorini','bike',3000,'2030.12.01','2020.1.01','PIC/Santorini1.jpg','Dony');
Trip3.SpotList.push('Athens');
Trip3.SpotList.push('Santorini');
const Trip4 = new Plan('Athens','Santorini','bike',4000,'2040.12.01','2020.1.01','PIC/Santorini1.jpg','Tony');
Trip4.SpotList.push('Athens');
Trip4.SpotList.push('Santorini');
const Trip5 = new Plan('Athens','Santorini','bike',5000,'2050.12.01','2020.1.01','PIC/Santorini1.jpg','Tony');
Trip5.SpotList.push('Athens');
Trip5.SpotList.push('Santorini');

function addNewPlan(Plan) {
    planList.push(Plan);
}

function addNewPlanToView(Plan,index){
    if (index % 4 == 0){
        row = tripListTable.insertRow(num_row);
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
    const NumPeople = document.createElement('pnum');

    NumPeople.innerHTML = 'Currently ' + Plan.poolMember.length + ' user(s) interested      ';
    NumPeople.id = Plan.PlanID + 'people';

    const JoinButton = document.createElement('button');
    JoinButton.innerHTML = 'Join the Trip';
    JoinButton.id = Plan.PlanID;

    const warnMessage = document.createElement("p");
    warnMessage.id = "warnMessage";
    warnMessage.style.color = "red";
    warnMessage.textContent = "You have already joined this trip";
    warnMessage.hidden = true;

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
    plan.appendChild(NumPeople);
    plan.appendChild(JoinButton);
    plan.appendChild(warnMessage);

    cell.appendChild(plan);

    document.getElementById(JoinButton.id).onclick = function(){changeNumPeople(JoinButton.id,Plan._id)};

}

function changeNumPeople(buttonID,ID){// add current person to the plan
    const url =  '/addToPlan/'+ID;
    const request = new Request(url, {
        method: 'put',
        headers: {
            'Content-type': 'application/json'
        }
    });
    fetch(request)
        .then(function(res) {
            if (res.status === 200) {
                window.location.href = 'tripList.html';
            } else {
                alert('should not happened!')
            }
        }).catch((error) => {
        log(error);
    })

}

addNewPlan(Trip1);
addNewPlan(Trip2);
addNewPlan(Trip3);
addNewPlan(Trip4);
addNewPlan(Trip5);


//addNewPlanToView(Trip1,0);
//addNewPlanToView(Trip2,1);
//addNewPlanToView(Trip3,2);
//addNewPlanToView(Trip4,3);
//addNewPlanToView(Trip5,4);
