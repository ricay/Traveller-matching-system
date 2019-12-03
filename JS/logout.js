function adminLogout() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You will go back to home page.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            window.location.href = 'index.html';
        }
    });
}

function userLogout() {
    const url = '/logout';
    fetch(url)
        .then((res) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You will go back to home page.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.value) {
                    window.location.href = 'index.html';
                }
            });        

        }).catch((error) => {
            log(error)
        })
    
}