const HotTable = document.getElementById('HotPlaceTable');
var num_row = 0;
var disPlayList = [];
const row = HotTable.insertRow(num_row);

const PlaceInfoForm = document.querySelector('#PlaceInfoForm');
PlaceInfoForm.addEventListener('submit', searchATrip);

function jumpTo(url) {
    window.location.href = url;
}

function addNewHotTable(place,index,text) {
    const cell = row.insertCell(index);
    const Introduction = document.createElement('div');
    const HotButton = document.createElement('button');
    HotButton.className = 'btn btn-outline-success my-2 my-sm-0';
    // HotButton.style.backgroundColor = 'rgba(255,255,255,0.6)';
    // HotButton.style.color= 'black';
    HotButton.id = place;
    HotButton.appendChild(document.createTextNode(place));
    cell.appendChild(Introduction);
    const Description = document.createElement('p');
    const DescriptionText = document.createTextNode(text);
    Description.appendChild(DescriptionText);

    Description.style.margin = '5%';

    Introduction.appendChild(HotButton);
    Introduction.appendChild(Description);
    document.getElementById(place).onclick = function(){changeBackground(place)}
}
addNewHotTable('Santorini',0,"Santorini, officially Thira and classic Greek Thera, is an island in the southern Aegean Sea, about 200 km (120 mi) southeast of Greece's mainland. It is the largest island of a small, circular archipelago, which bears the same name and is the remnant of a volcanic caldera. It forms the southernmost member of the Cyclades group of islands, with an area of approximately 73 km2 (28 sq mi) and a 2011 census population of 15,550. The municipality of Santorini includes the inhabited islands of Santorini and Therasia, as well as the uninhabited islands of Nea Kameni, Palaia Kameni, Aspronisi and Christiana. The total land area is 90.623 km2 (34.990 sq mi).");
addNewHotTable('Machu Picchu',1,"Machu Picchu is a 15th-century Inca citadel, located in the Eastern Cordillera of southern Peru, on a 2,430-metre (7,970 ft) mountain ridge. It is located in the Cusco Region, Urubamba Province, Machupicchu District, above the Sacred Valley, which is 80 kilometres (50 mi) northwest of Cuzco and through which the Urubamba River flows, cutting through the Cordillera and creating a canyon with a tropical mountain climate.");
function changeBackground(ID) {
    document.getElementById("background_img").src = 'PIC/' + ID + '.jpg';
    let new_rgb = getAverageRGB(document.getElementById("background_img"));
    let new_rgb_str = 'rgb('+new_rgb.r+', '+new_rgb.g+', '+new_rgb.b+')';
    document.getElementById("HotProject").style.color = new_rgb_str;
    console.log(new_rgb_str);
}

function searchATrip(e) {
    e.preventDefault();
    disPlayList = [];
    const InterestedPlaces = document.querySelector('#searchInterestedPlaces').value;
    console.log(planList);
    console.log(InterestedPlaces);
    for (let i=0 ; i<planList.length; i++){
        for (let j=0; j< planList[i].SpotList.length;j++){
            console.log(planList[i].SpotList[j]);
            if (planList[i].SpotList[j] == InterestedPlaces){
                //addNewPlanToView(planList[i]);
                console.log(planList[i]);
                disPlayList.push(i);
                console.log(planList[i].disPlay);
                jumpTo('tripsList.html');
            }
        }
    }
}
function getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

}