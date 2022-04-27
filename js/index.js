/* Global Variables */
let cloudURL = `https://wego.madebyerikb.com`

// General main func once documents finished loading

$(() => {
    // This function checks to see if there is credentials saved. If so just direct them to the dashboard
    fetchLoggedInUser().then(response => {
        // Success getting user
        if (response.status === 200) {
            let user = response.body["user"];
            let cloud = response.body["cloud"];
            $("#registerList").hide();
            $("#loginList").hide();
            $("#usernameLabel").text(user["username"]);
            // Assign dashboard button to redirect
            $("#dashboardLink").attr('href', cloudURL + `/${cloud}/`);
            $("#btnHeroPrimary")
                .removeClass("color-primary")
                .addClass("bg-secondary")
                .attr("href", cloudURL + `/${cloud}/`);
            $("#btnHeroPrimary > span").text("Go to Dashboard");
            $(".logged-in-user").removeClass('d-none').show();
            $("#logoutButton").click(() => {
                logoutUser().then(r => {
                    console.log("Logging out user!")
                });
            });
        } else {
            // Failed to get user with token
            $("#registerList").show();
            $("#loginList").show();
            $("#usernameLabel").text("Username");
            $("#dashboardLink").attr('href', "");
            $("#btnHeroPrimary")
                .removeClass("bg-secondary")
                .addClass("color-primary")
                .attr(cloudURL + "/register.html");
            $("#btnHeroPrimary > span").text("Register Now");
            $(".logged-in-user").addClass('d-none').hide();
        }
    }).catch(error => {
        // Error fetching'
        showAlert("There was an error fetching information.")
        console.error("Error fetching: " + error)
    })
});
