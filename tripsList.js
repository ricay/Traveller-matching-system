var planList = [];
var numberOfPlans = 1;

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
        this.PlanID = numberOfPlans;
        this.Img = Img;
        this.Author = Author;
        this.numPeople = 1;
        this.disPlay = false;
        numberOfPlans++;
    }
}

var Trip1 = new Plan('Athens','Santorini','bike',1000,'2019.11.01','2019.12.01','pic/Santorini1.jpg','Tony');
Trip1.SpotList.push('Athens');
Trip1.SpotList.push('Santorini');

function addNewPlan(Plan) {
    planList.push(Plan);
}

function addNewPlanToView(Plan){
    const content = document.getElementById('pinBoot');
    const plan = document.createElement('article');
    plan.className = "white-panel";
    plan.id = "white-panel-id";
    const img = document.createElement('IMG');
    const StartPlace = document.createElement('p');
    StartPlace.innerHTML = 'StartPlace:  ' + Plan.StartPlace;
    const EndPlace = document.createElement('p');
    EndPlace.innerHTML = 'EndPlace:  ' + Plan.EndPlace;
    const MethodOfTravel = document.createElement('p');
    MethodOfTravel.innerHTML = 'Method of Travel:  ' + Plan.MethodOfTravel;
    const ExceptCost = document.createElement('p');
    ExceptCost.innerHTML = 'Except Cost:  ' + Plan.ExceptCost + ' dollars';
    const StartDate = document.createElement('p');
    StartDate.innerHTML = 'StartDate:  ' + Plan.StartDate;
    const EndDate = document.createElement('p');
    EndDate.innerHTML = 'EndDate:  ' + Plan.EndDate;
    const Author = document.createElement('p');
    Author.innerHTML = 'Author:  ' + Plan.Author;
    const NumPeople = document.createElement('pnum');

    NumPeople.innerHTML = 'Currently ' + Plan.numPeople + ' user(s) interested      ';
    NumPeople.id = Plan.PlanID + 'people';

    const JoinButton = document.createElement('button');
    JoinButton.innerHTML = 'Join the Trip';
    JoinButton.id = Plan.PlanID;

    img.src = Plan.Img;
    img.alt = "";
    img.className = "place";

    plan.appendChild(img);
    plan.appendChild(StartPlace);
    plan.appendChild(EndPlace);
    plan.appendChild(MethodOfTravel);
    plan.appendChild(ExceptCost);
    plan.appendChild(StartDate);
    plan.appendChild(EndDate);
    plan.appendChild(Author);
    plan.appendChild(NumPeople);
    plan.appendChild(JoinButton);

    content.appendChild(plan);

    document.getElementById(JoinButton.id).onclick = function(){changeNumPeople(JoinButton.id,planList)};

}

function changeNumPeople(ID,PlanList){

    for (let i = 0; i<PlanList.length;i++){

        if (PlanList[i].PlanID == ID){
            const numID = PlanList[i].PlanID + 'people';
            const Num = document.getElementById(numID);
            console.log(PlanList[i].numPeople);
            PlanList[i].numPeople+=1;
            Num.innerHTML = 'Currently ' + PlanList[i].numPeople + ' user(s) interested     ';

        }
    }
}

addNewPlan(Trip1);
function displayTrip(planList) {
    console.log('Hello');
    for (let i=0; i<planList.length; i++){
        for (let j= 0; j < planList[i].length; j++){
            if (planList[i].SpotList[j] == spot){
                console.log(planList[i].SpotList[j]);
                addNewPlanToView(planList[i])
            }
        }
    }
}
displayTrip(planList);
addNewPlanToView(Trip1);
