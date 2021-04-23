$(() => {
    let cloud = window.location.hostname.split('.')[0]; // Get cloud name
    let cloudURL = `https://${cloud}.team22.sweispring21.tk`;

    $("#registerButton").click(() => {
        let fname = $("#fname").val().trim();
        let lname = $("#lname").val().trim();
        let phoneNumber = $("#phoneNumber").val().trim();
        let email = $("#email").val().trim();
        let username = $("#username").val().trim();
        let password = $("#password").val();

        $('#errorAlert').addClass('d-none');
        $('.card-body').addClass('was-validated');
        let errorVisible = $('.invalid-feedback:visible').length

        if (errorVisible !== 0) {
            console.log("There are currently errors in validation. User needs to fix those errors before proceeding.")
            return
        }

        let hashedPassword = hash(username.toLowerCase(), password)

        let data = {
            'cloud': cloud,
            'firstName': fname,
            'lastName': lname,
            'address': "",
            'phoneNumber': phoneNumber,
            'email': email,
            'username': username.toLowerCase(),
            'password': hashedPassword
        };

        fetch(cloudURL + `/api/v1/common-services/register`, {
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
            window.location.replace("./login.html");
        }).catch(error => {
            console.warn('Something went wrong.', error);
            let code = error.status;
            if (code === 401) {
                // On text change remove invalid and add as valid
                $('#username').addClass('is-invalid').change(() => {
                    $(this).removeClass('is-invalid');
                    $(this).addClass('is-valid');
                    $(this).next().text("Make sure username is not empty.");
                    $(this).off('change');
                }).next().text("This username is taken.");
            } else {
                // TODO: Handle error based on status code
                $('#errorAlert').removeClass('d-none').text('There was an error communicating with the server.');
            }
        });
    })
})
