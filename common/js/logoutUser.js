async function logoutUser() {
    let cloud = window.location.hostname.split('.')[0]; // Get cloud name
    let cloudURL = `https://${cloud}.team22.sweispring21.tk`;

    let data = {
        "cloud": cloud
    }
    fetch(cloudURL + "/api/v1/common-services/logout", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(data => {
        window.location.replace(cloudURL);
    }).catch(error => {
        // Handle error
        showAlert('There was an error logging out.');
        console.error(error)
    })
}