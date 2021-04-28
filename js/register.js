$(() => {
    let cloud = window.location.hostname.split('.')[0]; // Get cloud name
    let cloudURL = `https://${cloud}.team22.sweispring21.tk`;

    $("#fname").on('input', function () { validateString(nameRegex, this) });
    $("#lname").on('input', function () { validateString(nameRegex, this) });
    $("#phoneNumber").on('input', function () { validateString(phoneNumberRegex, this) });
    $("#email").on('input', function () { validateString(emailAddressRegex, this) });
    $("#username").on('input', function () { validateString(usernameRegex, this) });
    $("#password").on('input', function () { passwordValidation(this) });

    $('.bi-question-circle').popover( {
        container: 'body',
        content: 'Your password should: <br> - be at least 8 characters long <br> - contain one upper case<br> - contain one lower case<br>- contain at least a number.',
        html: true
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
