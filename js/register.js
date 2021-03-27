$(function () {
    $("#registerButton").click(() => {
        let fname = $("#fname").val();
        let lname = $("#lname").val();
        // var address = document.getElementById("address").value;
        let phoneNumber = $("#phoneNumber").val();
        let email = $("#email").val();
        let username = $("#username").val();
        let password = $("#password").val();

        let cloud = window.location.hostname.split('.')[0]

        $('#errorAlert').addClass('d-none');

        $('.card-body').addClass('was-validated');

        let errorVisible = $('.invalid-feedback:visible').length

        if (errorVisible !== 0) {
            console.log("There are currently errors in validation. User needs to fix those errors before proceeding.")
            return
        }

        let data = {
            'cloud': cloud,
            'fname': fname,
            'lname': lname,
            'address': "",
            'phoneNumber': phoneNumber,
            'email': email,
            'username': username,
            'password': password
        };

        fetch(`https://${cloud}.team22.sweispring21.tk/api/v1/common-services/register`, {
            method: "POST",
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
            let code = error.status
            if (code === 401) {
                // On text change remove invalid and add as valid
                $('#username').addClass('is-invalid').change(() => {
                    $(this).removeClass('is-invalid')
                    $(this).addClass('is-valid')
                    $(this).next().text("Make sure username is not empty.")
                    $(this).off('change')
                }).next().text("This username is taken.");
            } else {
                // TODO: Handle error based on status code
                $('#errorAlert').removeClass('d-none').text('There was an error communicating with the server.');
                // TODO: Handle error based on status code
            }
        });
    })
})
