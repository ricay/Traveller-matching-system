const libraryBooks = []

function addNewHotTable(place,index) {

    const HotTable = document.getElementById('HotPlaceTable');
    const row = HotTable.insertRow(index);
    const cell = row.insertCell(0);
    const HotButton = document.createElement('button')
    HotButton.className = 'HotButton'
    HotButton.appendChild(document.createTextNode(place))
    cell.appendChild(HotButton);
}
addNewHotTable('New York',0)
addNewHotTable('London',1)