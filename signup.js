'use strict';


function jumpTo(url) {
  
    const a = document.getElementById("email").value;
    const b = document.getElementById("uname").value;
    const c = document.getElementById("password").value;
    const d = document.getElementById("password2").value;
    const e = document.getElementById("birthday").value;
    const f = document.getElementById("fname").value;
    const g = document.getElementById("lname").value;
    const phone = document.getElementById("phone_msg").value;
    const gender = document.getElementById("gender_msg").value;

    var result = true;    


    const regName = /[a-zA-Z]+/;
	const regEmail = /\S+@\S+\.\S+/;
	const regPhone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
	const regPassword = /(?=.*\d)(?=.*[a-z]).{6,}/;
   
   
    document.getElementById("email_msg").innerHTML ="";
    document.getElementById("uname_msg").innerHTML ="";
    document.getElementById("pswd_msg").innerHTML ="";
    document.getElementById("pswdr_msg").innerHTML ="";
 
    if (a==null || a==""||!regEmail.test(a))
        {	   
	    document.getElementById("email_msg").innerHTML="Email is empty or invalid(example: billhu@gmail.com)";
           result = false;
        }
	
    if (b==null || b=="")
    {
        document.getElementById("uname_msg").innerHTML="Username can not be empty";
        result = false;
    }

    if (c==null || c=="" || !regPassword.test(c))
    {
        document.getElementById("pswd_msg").innerHTML="Please Enter the password correctly(at least 6 characters long, at least one non-letter)";
        result = false;
    }

    if (d==null || d=="" || d != c)
    {
        document.getElementById("pswdr_msg").innerHTML="Two passwords do not match!";
        result = false;
    }

    if (e== null || e=="")
    {
        document.getElementById("birthday_msg").innerHTML="Please select the date";
        result = false;
    }

    if (f==null || f=="")
    {
        document.getElementById("fname_msg").innerHTML="First name can not be empty";
        result = false;
    }

    if (g==null || g=="")
    {
        document.getElementById("lname_msg").innerHTML="Last name can not be empty";
        result = false;
    }

    if (phone==null || regPhone.test(phone))
    {
        document.getElementById("phone_msg").innerHTML="Invalid phone. example:1234567890 or 123-456-7890";
        result = false;
    }

    if (gender==null || !(gender=="male" || gender=="female"))
    {
        document.getElementById("gender_msg").innerHTML="Please enter male or female";
        result = false;
    }


  if(result == false )
        {    
            event.preventDefault();
        }

    if (result == true)
    {
    	window.location.href = url;
        alert("Signup successfully!")
    }
}


function SignUpResetForm()
{
    document.getElementById("email_msg").innerHTML ="";
    document.getElementById("uname_msg").innerHTML ="";
    document.getElementById("pswd_msg").innerHTML ="";
    document.getElementById("pswdr_msg").innerHTML ="";
    document.getElementById("birthday_msg").innerHTML ="";
    document.getElementById("fname_msg").innerHTML ="";
    document.getElementById("lname_msg").innerHTML ="";
    document.getElementById("phone_msg").innerHTML ="";
    document.getElementById("gender_msg").innerHTML ="";
}