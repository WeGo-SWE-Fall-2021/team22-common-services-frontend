/* Global Variables */
let cloud = window.location.hostname.split('.')[0]
let cloudUrl = `https://${cloud}.team22.sweispring21.tk`


/* Adds shadow on header once it passes height */
$(window).scroll(() => {
    let header = $("header")
    if (window.scrollY > 0) {
        header.addClass("header-scroll");
    } else {
        header.removeClass("header-scroll");
    }
});

$(window).resize(() => {
    let windowWidth = $(window).width();
    if (windowWidth > 991) {
        let navBar = $('#navbar');
        let hasMobileNavbar = navBar.hasClass('navbar-mobile');
        if (hasMobileNavbar) {
            navBar.removeClass('navbar-mobile');
            let mobileNavToggle = $('#mobile-nav-toggle');
            mobileNavToggle.removeClass('text-white');
            mobileNavToggle.addClass('text-secondary');
            mobileNavToggle.removeClass('bi-x');
            mobileNavToggle.addClass('bi-list');
        }
    }
});

$(() => {
    $('#mobile-nav-toggle').click(function () {
        let hasList = $(this).hasClass('bi-list');
        if (hasList) {
            $(this).removeClass('bi-list');
            $(this).addClass('bi-x');
            $(this).removeClass('text-secondary');
            $(this).addClass('text-white');
            $('#navbar').addClass('navbar-mobile');
        } else {
            $(this).removeClass('bi-x');
            $(this).addClass('bi-list');
            $(this).removeClass('text-white');
            $(this).addClass('text-secondary');
            $('#navbar').removeClass('navbar-mobile');
        }
    });
})

// This function will check to see if there is credentials saved. If so just direct them to the dashboard
$(() => {
    // This will validate the token if there is any to the server.
    let headers = new Headers();
    let cloud = window.location.hostname.split('.')[0]
    fetch(cloudUrl + `/api/v1/common-services/user?cloud=${cloud}`, {
        method:"GET",
        headers: headers,

    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(() => {
        window.location.assign(cloudUrl + `/${cloud}-frontend/dashboard.html`)
    }).catch(error => {
        // If it fails to fetch user then redirect them to login
        if (error.status === 401) {
            window.location.assign("/login.html");
        }
    });
})
