const log = console.log;
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
        log(profiles);
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
        }
    }).catch((error) => {
        log(error)
    })
};

function deleteUser(bool, id) {
    const user = document.getElementById(id);
    const userName = user.getElementsByTagName("td")[1].textContent
    log(userName);
    url = '/admin/deleteUser/' + userName;
    log(url);
    const request = new Request(url, {
        method: 'delete',
        headers: {
            'Content-type': 'application/json'
        }
    });
    fetch(request).then(function(res) {
        if (res.status === 200) {
            user.hidden = true;
            log('deleted');
        } else {
            log('deletion failed');
        }
    }).catch((error) => {
        log(error)
    })
}
