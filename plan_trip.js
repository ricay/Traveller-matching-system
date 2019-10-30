const libraryBooks = []
const HotTable = document.getElementById('HotPlaceTable');
var num_row = 0;
const row = HotTable.insertRow(num_row);
function addNewHotTable(place,index) {

    /*const HotTable = document.getElementById('HotPlaceTable');
    const row = HotTable.insertRow(index);*/
    const cell = row.insertCell(index);
    const HotButton = document.createElement('button')
    HotButton.className = 'btn btn-outline-success my-2 my-sm-0'
    HotButton.style.backgroundColor = 'purple'
    HotButton.id = place

    //HotButton.onclick = function(){changeBackground()}
    //place.addEventListener('button',changeBackground)
    HotButton.appendChild(document.createTextNode(place))
    cell.appendChild(HotButton);
    document.getElementById(place).onclick = function(){changeBackground(place)}
    /*document.getElementsByClassName("HotButton").style.height = "100px";*/
}
addNewHotTable('Santorini',0)
addNewHotTable('Machu_Picchu',1)

function changeBackground(ID) {
    console.log(ID)
    const background = ID + '.jpg'
    document.getElementById("background_img").src = background
    //document.body.style.backgroundImage = "background2.jpg";

}