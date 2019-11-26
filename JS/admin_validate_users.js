$(function() {
    $(document).ready(function() {
        $('#example').DataTable();
    });
});


$('#your-table-id').mdbEditor({
    headerLength: 6,
    evenTextColor: '#000',
    oddTextColor: '#000',
    bgEvenColor: '',
    bgOddColor: '',
    thText: '',
    thBg: '',
    modalEditor: false,
    bubbleEditor: false,
    contentEditor: false,
    rowEditor: false
});

$('#dtBasicExample').mdbEditor({
    mdbEditor: true
});
$('.dataTables_length').addClass('bs-select');

//
console.log("get here");
const deletePlanTable = document.getElementById('hello')

console.log("get here");
var numberOfPlans = 1;
var planList = [];
var num_row = 0;
var row;

class Plan {
    constructor(description,Img,Author) {
        this.description = description;
        this.Author = Author;
        this.Img = Img;
        this.PlanID = numberOfPlans-1;
        numberOfPlans++;
        console.log(numberOfPlans)
        planList.push(this)
        addNewPlanToView(this)
        console.log(this)
    }
}
const plan1= new Plan("Hello",'PIC/anita.png',"Tony");
const plan2= new Plan("Boring Plan",'PIC/anita.png',"Bony");
const plan3= new Plan("Hello",'PIC/anita.png',"Tony");
const plan4 =new Plan("Hello",'PIC/anita.png',"Tony");
const plan5= new Plan("Hello",'PIC/anita.png',"Tony");
const plan6= new Plan("Hello",'PIC/anita.png',"Tony");
const plan7= new Plan("Hello",'PIC/anita.png',"Tony");
const plan8= new Plan("Hello",'PIC/anita.png',"Tony");
const plan9= new Plan("Hello",'PIC/anita.png',"Tony");
const plan10= new Plan("Hello",'PIC/anita.png',"Tony");





function addNewPlanToView(Plan){
    console.log(deletePlanTable)
    row = deletePlanTable.insertRow(planList.length-1);
    const cell = row.insertCell(0);
    //const content = document.getElementById('pinBoot');
    const plan = document.createElement('div');
    plan.className = "white-panel";
    plan.id = Plan.PlanID;
    plan.style.background = 'white';
    plan.style.height = 'max-content';
    plan.style.width = '20vw';
    plan.style.borderRadius = '5%';
    plan.style.padding = '10px';
    const img = document.createElement('IMG');
    const Author = document.createElement('p');
    Author.innerHTML = 'Author:  ' + Plan.Author;
    const DeleteButton = document.createElement('button');
    DeleteButton.innerHTML = 'DeleteThisPlan';
    DeleteButton.id = Plan.PlanID;
    const Description = document.createElement('p');
    Description.innerHTML = Plan.description;

    img.src = Plan.Img;
    img.alt = "";
    img.className = "icon";

    plan.appendChild(img);

    plan.appendChild(Author);
    plan.appendChild(Description);
    plan.appendChild(DeleteButton);


    cell.appendChild(plan);

    document.getElementById(DeleteButton.id).onclick = function(){deletePlan(DeleteButton.id,planList)};
    num_row++;
}


function deletePlan(id,planList){
    console.log(id);
    for (let i=0; i<planList.length; i++){
        if (planList[i].PlanID == id){
            planList.splice(i,1)
            deletePlanTable.deleteRow(i)
        }
    }
}


function clicked(bool, id) {
    // if (bool === true) {
    //     let numPeople = document.getElementById("numPeople");
    //     numPeople.textContent = (parseInt(numPeople.textContent) + 1).toString();
    // }
    document.getElementById(id).hidden = true;
}