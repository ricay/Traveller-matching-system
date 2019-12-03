function logout() {
    url = '/logout';
    fetch(url).then((res) =>{
        if (res.status === 200) {
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
                    res.redirect('/index.html')
                }
            });
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }).catch((error) => {
        console.log(error);
    })
}