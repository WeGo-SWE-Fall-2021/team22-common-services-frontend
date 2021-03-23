function sendRegistration() {
    var username = document.getElementById("username").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var address = document.getElementById("address").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("phoneNumber").value;

    let cloud = window.location.hostname.split('.')[0]

    let data = {
        'cloud': cloud,
        'fname': fname,
        'lname': lname,
        'address': address,
        'phoneNumber': phoneNumber,
        'email': email,
        'username': username,
        'password': password
    };

    fetch(`https://${cloud}.team22.sweispring21.tk/api/v1/common-services/register`, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response)
    }).then(data => {
        console.log(data);
        window.location.assign("./login.html");
    }).catch(error => {
        console.warn('Something went wrong.', error);
        // TODO: Handle error based on status code
    });
}
