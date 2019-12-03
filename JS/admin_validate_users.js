const log = console.log;
let activeUsers = 0;
onload = function() {
    url = '/admin/getUsers';
    // Get all profiles
    fetch(url).then((res) => {
        if (res.status === 200) {
            return res.json();
        } else {
            alert('Could not get all profiles.')
        }
    }).then((json) => { // Got all profiles
        const profiles = json.profiles;
        // Generate table accordingly
        const tbody = document.getElementById("tbody");
        for (let i = 0; i < profiles.length; i++) {
            const newRow = document.createElement("tr");
            newRow.id = 'row' + i;
            const newEmail = document.createElement("td");
            newEmail.class = "col-2";
            newEmail.textContent = profiles[i].email;
            const newUserName = document.createElement("td");
            newUserName.className = 'col-2';
            newUserName.textContent = profiles[i].userName;
            const newFirstName = document.createElement("td");
            newFirstName.className = "col-2";
            newFirstName.textContent = profiles[i].firstName;
            const newLastName = document.createElement("td");
            newLastName.className = "col-2";
            newLastName.textContent = profiles[i].lastName;
            const newPhone = document.createElement("td");
            newPhone.className = "col-2";
            newPhone.textContent = profiles[i].phone;
            const newGender = document.createElement("td");
            newGender.className = "col-2";
            newGender.textContent = profiles[i].gender;
            const newCol = document.createElement("td");
            newCol.className = "col-2";
            const newButton = document.createElement("button");
            newButton.className = "btn btn-sm btn-outline-danger";
            newButton.type = "button";
            newButton.setAttribute('onclick',
                'deleteUser(false, this.parentElement.parentElement.id)');
            newButton.textContent = "delete";
            newCol.appendChild(newButton);
            newRow.appendChild(newEmail);
            newRow.appendChild(newUserName);
            newRow.appendChild(newFirstName);
            newRow.appendChild(newLastName);
            newRow.appendChild(newPhone);
            newRow.appendChild(newGender);
            newRow.appendChild(newCol);
            tbody.appendChild(newRow);
            activeUsers++;
        }
    }).catch((error) => {
        log(error)
    })
};

function deleteUser(bool, id) {
    const user = document.getElementById(id);
    const userName = user.getElementsByTagName("td")[1].textContent;
    url = '/admin/deleteUser/' + userName;
    const request = new Request(url, {
        method: 'delete',
        headers: {
            'Content-type': 'application/json'
        }
    });
    fetch(request).then(function(res) {
        if (res.status === 200) {
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
                        'This user has been deleted.',
                        'success'
                    );
                    user.hidden = true;
                    activeUsers--;
                    if (activeUsers === 0) {
                        Swal.fire({
                            title: 'There are no more users to delete.',
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
            log('deleted');
        } else {
            log('deletion failed');
        }
    }).catch((error) => {
        log(error)
    })
}
