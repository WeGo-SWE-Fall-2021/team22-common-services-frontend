async function logoutUser() {
    fetch("https://wego.madebyerikb.com/api/logout", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify("")
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