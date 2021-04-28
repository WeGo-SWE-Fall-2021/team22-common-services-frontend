let charactersOnlyRegex = /^[a-zA-Z]+(?:[\s][a-zA-Z]+)*$/;
let zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
let nameRegex = /^[a-z ,.'-]+$/i;
let stringEmpty = /^(?!\s*$).+/
let phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/
let emailAddressRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let usernameRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

function validateString(regex, element) {
    let value = $(element).val().trim();
    if (!value.match(regex)) {
        $(element).addClass("invalid-input");
        let label = $(element).prev('label').text().toLowerCase();
        $(element).next(".invalid-feedback").text(`Make sure ${label} is ` + (value === "" ?  "not empty." : "valid.")).addClass("d-block");
    } else {
        $(element).next(".invalid-feedback").removeClass("d-block")
        $(element).removeClass("invalid-input");
    }
}