var planList = [];
var numberOfPlans = 1;

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