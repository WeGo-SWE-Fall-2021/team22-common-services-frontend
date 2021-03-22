function sendRegistration() {
    var username = document.getElementById("username").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var address = document.getElementById("address").value;
    var password = document.getElementById("password").value;

    let cloud = window.location.hostname.split('.')[0]

    let data = {
        'cloud': cloud,
        'username': username,
        'fname': fname,
        'lname': lname,
        'address': address,
        'password': password
    };

    fetch(`https://${cloud}.team22.sweispring21.tk/api/v1/common-services/register`, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(response) {
        console.log(response.status);
        if (response.status === 201)
        {
            window.location.assign("./login.html");
        }
    });
}
