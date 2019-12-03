const HotTable = document.getElementById('HotPlaceTable');
var num_row = 0;
var disPlayList = [];
/*const row = HotTable.insertRow(num_row);*/
var timer = null;
var alpha = 100;
var speed = 0;

const PlaceInfoForm = document.querySelector('#PlaceInfoForm');
PlaceInfoForm.addEventListener('submit', searchATrip);

function jumpTo(url) {
    window.location.href = url;
}

function jumpAndPost(url) {
    const data = {
        location: document.getElementById('searchInterestedPlaces').value
    }
    if (data.location) {
        const request = new Request('/plan/search', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetch(request)
            .then(function(res) {
                if (res.status === 200) {
                    // log(res);


                }

            }).catch((error) => {
            log(error);
        })
        jumpTo(url)
    } else{
        // alert('please enter a location')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please enter a location',
        })
    }
}



function searchTrip(){
    const searchPlace = document.querySelector('#searchInterestedPlaces')
    const url = '/plans';
    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json()
            } else {
                alert('Could not get plans')
            }
        })
}
function addNewHotTable(place,index,text) {
    const row = HotTable.insertRow(index);
    const cell = row.insertCell(0);
    const Introduction = document.createElement('div');
    const HotButton = document.createElement('button');
    HotButton.className = 'btn btn-outline-success my-2 my-sm-0';
    // HotButton.style.backgroundColor = 'rgba(255,255,255,0.6)';
    // HotButton.style.color= 'black';
    HotButton.id = place;
    HotButton.appendChild(document.createTextNode(place));
    cell.appendChild(Introduction);
    //*const Description = document.createElement('p');
    //*const DescriptionText = document.createTextNode(text);
    //*Description.appendChild(DescriptionText);

    //* Description.style.margin = '5%';

    Introduction.appendChild(HotButton);
    //*Introduction.appendChild(Description);
    document.getElementById(place).onclick = function(){changeBackground(place,text);}
    //document.getElementById(place).onmouseover = function(){changeBackgroundstart();}
    //document.getElementById(place).onmouseout = function(){changeBackgroundover();}
}
addNewHotTable('Santorini',0,"lkjadljasldjasjdlasjdasdasdasdas");
addNewHotTable('Machu Picchu',1,"hfjkhskjfhalkjalkjdasjdaslkd");
function changeBackground(ID,text) {
    document.getElementById("background_img").src = 'PIC/' + ID + '.jpg';
    const description = document.getElementById('description_place');
    description.innerHTML = text;
}
function changeBackgroundover() {
    startMove(0);
}
function changeBackgroundstart() {

    startMove(100);



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

function startMove(opTarget){
    clearInterval(timer);
    var opDiv = document.getElementById("background_img");
    timer = setInterval(function(){
        if(alpha<opTarget){
            speed = 10;
        }
        else if(alpha>opTarget){
            speed = -10;
        }
        if(alpha==opTarget){
            clearInterval(timer);
        }
        else {
            alpha += speed;
            opDiv.style.opacity = alpha/100;
            opDiv.style.filter = 'alpha(opacity='+alpha+')';
        }
    },50)
}

//*Machu Picchu is a 15th-century Inca citadel, located in the Eastern Cordillera of southern Peru, on a 2,430-metre (7,970 ft) mountain ridge. It is located in the Cusco Region, Urubamba Province, Machupicchu District, above the Sacred Valley, which is 80 kilometres (50 mi) northwest of Cuzco and through which the Urubamba River flows, cutting through the Cordillera and creating a canyon with a tropical mountain climate.
//*Santorini, officially Thira and classic Greek Thera, is an island in the southern Aegean Sea, about 200 km (120 mi) southeast of Greece's mainland. It is the largest island of a small, circular archipelago, which bears the same name and is the remnant of a volcanic caldera. It forms the southernmost member of the Cyclades group of islands, with an area of approximately 73 km2 (28 sq mi) and a 2011 census population of 15,550. The municipality of Santorini includes the inhabited islands of Santorini and Therasia, as well as the uninhabited islands of Nea Kameni, Palaia Kameni, Aspronisi and Christiana. The total land area is 90.623 km2 (34.990 sq mi).