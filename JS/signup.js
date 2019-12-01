const log = console.log
function jumpTo(url) {
  
    const email = document.getElementById("email").value;
    const uname = document.getElementById("uname").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const phone = document.getElementById("phone").value;
    const gender = document.getElementById("gender").value;

    var result = true;

    const regName = /[a-zA-Z]+/;
    const regEmail = /\S+@\S+\.\S+/;
    const regPhone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    // const regPassword = /(?=.*\d)(?=.*[a-z]).{6,}/;

    document.getElementById("email_msg").innerHTML ="";
    document.getElementById("uname_msg").innerHTML ="";
    document.getElementById("pswd_msg").innerHTML ="";
    document.getElementById("pswdr_msg").innerHTML ="";
    document.getElementById("fname_msg").innerHTML ="";
    document.getElementById("lname_msg").innerHTML ="";
    document.getElementById("phone_msg").innerHTML ="";
    document.getElementById("gender_msg").innerHTML ="";
 
    if (email==null || email===""||!regEmail.test(email))
        {      
        document.getElementById("email_msg").innerHTML="Email is empty or invalid(example: user@gmail.com)";
           result = false;
        }
    
    if (uname==null || uname==="")
    {
        document.getElementById("uname_msg").innerHTML="Username can not be empty";
        result = false;
    }

    if (password==null || password==="" || password.length < 4)
    {
        document.getElementById("pswd_msg").innerHTML="Please Enter the password correctly";
        result = false;
    }

    if (password2==null || password2==="" || password2 !== password)
    {
        document.getElementById("pswdr_msg").innerHTML="Two passwords do not match!";
        result = false;
    }

    if (fname==null || fname==="")
    {
        document.getElementById("fname_msg").innerHTML="First name can not be empty";
        result = false;
    }

    if (lname==null || lname==="")
    {
        document.getElementById("lname_msg").innerHTML="Last name can not be empty";
        result = false;
    }

    
    if (phone==null || !regPhone.test(phone))
    {
        document.getElementById("phone_msg").innerHTML="Invalid phone. example:1234567890 or 123-456-7890";
        result = false;
    }

    if (gender==null || !(gender==="male" || gender==="female"))
    {
        document.getElementById("gender_msg").innerHTML="Please enter male or female";
        result = false;
    }


    if(result === false )
        {    
            event.preventDefault();
        }

    const data = {
        email: email,
        userName: uname,
        password: password,
        firstName: fname,
        lastName: lname,
        phone: phone,
        gender: gender
    }
    if (result === true)
    {   
        const request = new Request('/users/signup', {
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
                alert('Congratulations, you have successfully signed up.\nPlease log in.')
                window.location.href = 'index.html';
            } else {
                // alert("Failed to signup, userName has been used");
                document.getElementById("uname_msg").innerHTML="Failed to signup, userName has been used";
            }
        }).catch((error) => {
            log(error);
        })
    }
}


function SignUpResetForm()
{
    document.getElementById("email_msg").innerHTML ="";
    document.getElementById("uname_msg").innerHTML ="";
    document.getElementById("pswd_msg").innerHTML ="";
    document.getElementById("pswdr_msg").innerHTML ="";
    document.getElementById("fname_msg").innerHTML ="";
    document.getElementById("lname_msg").innerHTML ="";
    document.getElementById("phone_msg").innerHTML ="";
    document.getElementById("gender_msg").innerHTML ="";
}