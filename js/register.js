$(() => {
    var submitPressed = false;

    let cloud = window.location.hostname.split('.')[0]; // Get cloud name
    let cloudURL = `https://${cloud}.team22.sweispring21.tk`;

    $("#fname").on('input', function () { submitPressed ? validateString(nameRegex, this) : null });
    $("#lname").on('input', function () { submitPressed ? validateString(nameRegex, this) : null });
    $("#phoneNumber").on('input', function () { submitPressed ? phoneNumberValidation(this) : null });
    $("#email").on('input', function () { submitPressed ? validateString(emailAddressRegex, this) : null });
    $("#username").on('input', function () { submitPressed ? validateString(usernameRegex, this) : null });
    $("#password").on('input', function () { submitPressed ? passwordValidation(this) : null });
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

    $('.bi-question-circle').popover( {
        container: 'body',
        content: 'Your password should: <br> - be at least 8 characters long <br> - contain one upper case<br> - contain one lower case<br>- contain at least a number.',
        html: true
    });

    $("#registerButton").click(() => {
        submitPressed = true;

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
            if (error.status != undefined && error.status === 401) {    
                error.json().then(function (data) {
                    for (var i = 0; i < data.values.length; i++) {
                        let id = data.values[i].id;
                        let message = data.values[i].message;
                        $(`#${id}`).addClass('invalid-input').next(".invalid-feedback").text(message).addClass("d-block");        
                    }    
                });
            } else {
                $('#errorAlert').removeClass('d-none').text('There was an error communicating with the server.');
            }
        });
    })
})
