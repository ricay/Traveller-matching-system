const log = console.log;

let activePlans = 0;

onload = function() {
    url = '/allPlan';

    fetch(url).then((res) => {
        if (res.status === 200) {
            return res.json();
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }).then((json) => {
        const allPlans = json.plans;
        log(allPlans);
        for (let i = 0; i < allPlans.length; i++) {
            const deletePlanTable = document.getElementById('planTable');
            const newRow = deletePlanTable.insertRow(0);
            newRow.id = '' + i;
            const cell = newRow.insertCell(0);
            //const content = document.getElementById('pinBoot');
            const plan = document.createElement('div');
            plan.className = "white-panel";
            plan.id = allPlans[i]._id;
            // const img = document.createElement('IMG');
            const Author = document.createElement('p');
            Author.innerHTML = 'Author:  ' + allPlans[i].Author;
            const DeleteButton = document.createElement('button');
            DeleteButton.textContent = 'DeleteThisPlan';
            DeleteButton.className = "delete-button";
            const Description = document.createElement('p');
            Description.innerHTML = allPlans[i].description;

            // img.src = Plan.Img;
            // img.alt = "";
            // img.className = "icon";
            // plan.appendChild(img);

            plan.appendChild(Author);
            plan.appendChild(Description);
            plan.appendChild(DeleteButton);

            cell.appendChild(plan);

            DeleteButton.onclick = function(){deletePlan(newRow.id)};
            activePlans++;
        }
    }).catch((error) => {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        });
        log(error);
    })
};

function deletePlan(id){
    const plan = document.getElementById(id);
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Deleted!',
                'This plan has been deleted.',
                'success'
            );
            plan.hidden = true;
            activePlans--;
            if (activePlans === 0) {
                Swal.fire({
                    title: 'There are no more plans to delete.',
                    showClass: {
                        popup: 'animated fadeInDown faster'
                    },
                    hideClass: {
                        popup: 'animated fadeOutUp faster'
                    }
                })
            }
        }
    });
}

