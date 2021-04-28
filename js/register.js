$(() => {
    let cloud = window.location.hostname.split('.')[0]; // Get cloud name
    let cloudURL = `https://${cloud}.team22.sweispring21.tk`;

    $("#fname").on('input', function () { validateString(nameRegex, this) });
    $("#lname").on('input', function () { validateString(nameRegex, this) });
    $("#phoneNumber").on('input', function () { validateString(phoneNumberRegex, this) });
    $("#email").on('input', function () { validateString(emailAddressRegex, this) });
    $("#username").on('input', function () { validateString(usernameRegex, this) });
    $("#password").on('input', function () {
        let value = $(this).val().trim();
        if (!value.match(passwordRegex)) {
            $(this).addClass("invalid-input");
            let label = $(this).prev('label').text().toLowerCase();
            if (label === "") {
                $(this).next(".invalid-feedback").text(`Make sure password is not empty.`).addClass("d-block");
            } else {
                $(this).next(".invalid-feedback").html(`Make sure password meets the following criteria: <br>- At least 8 characters long <br> - one upper case <br> - one lower case <br> - at least a number.`).addClass("d-block");
            }
        } else {
            $(this).next(".invalid-feedback").removeClass("d-block")
            $(this).removeClass("invalid-input");
        }
    });

    $("#verifyPassword").on('input', function () {
        let verifyPassword = $(this).val().trim();
        let passowrd = $('#password').val().trim();
        if (verifyPassword == "") {
            $(this).addClass("invalid-input");
            $(this).next(".invalid-feedback").text(`Make sure this field is not empty.`).addClass("d-block");
        } else if (verifyPassword != passowrd) {
            $(this).addClass("invalid-input")
            $(this).next(".invalid-feedback").text(`Make sure this field matches your password.`).addClass("d-block");
        } else {
            $(this).next(".invalid-feedback").removeClass("d-block")
            $(this).removeClass("invalid-input");
        }
    })

    $("#registerButton").click(() => {
        let fname = $("#fname").val().trim();
        let lname = $("#lname").val().trim();
        let phoneNumber = $("#phoneNumber").val().trim();
        let email = $("#email").val().trim();
        let username = $("#username").val().trim();
        let password = $("#password").val();

        $('input').trigger('input');
        $('#errorAlert').addClass('d-none');
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
                $('#username').addClass('invalid-input').next(".invalid-feedback").text("Username already taken.")
                .addClass("d-block");        
            } else {
                // TODO: Handle error based on status code
                $('#errorAlert').removeClass('d-none').text('There was an error communicating with the server.');
            }
        });
    })
})
