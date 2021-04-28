let charactersOnlyRegex = /^[a-zA-Z]+(?:[\s][a-zA-Z]+)*$/;
let zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
let nameRegex = /^[a-z ,.'-]+$/i;
let stringEmpty = /^(?!\s*$).+/
let phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/
let emailAddressRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/

function validateString(regex, element) {
    let value = $(element).val().trim();
    let valid = value.match(regex)
    validOrNot(element, valid)
}

function passwordValidation(element) {
    let value = $(element).val().trim();
    var minLenght = value.match(/.{8}/);
    var digits = value.match(/\d+/g);
    var upperCase = value.match(/[A-Z]/);
    var lowerCase = value.match(/[a-z]/);

    validOrNot(element, minLenght && digits && lowerCase && upperCase)
}

function validOrNot(element, valid) {
    let value = $(element).val().trim()
    if (valid) {
        $(element).next(".invalid-feedback").removeClass("d-block");
        $(element).removeClass("invalid-input");
    } else if (value.length == 0) {
        $(element).addClass("invalid-input");
        let label = $(element).prev('label').text().toLowerCase();
        $(element).next(".invalid-feedback").text(`Make sure ${label} is not empty.`).addClass("d-block");
    } else {
        $(element).addClass("invalid-input");
        let label = $(element).prev('label').text().toLowerCase();
        $(element).next(".invalid-feedback").text(`Make sure ${label} is valid.`).addClass("d-block");
    }
}