async function fetchLoggedInUser() {
    let cloud = window.location.hostname.split('.')[0]; // Get cloud name
    let cloudURL = `https://${cloud}.team22.sweispring21.tk`;

    return await fetch(cloudURL + `/api/v1/common-services/user?cloud=${cloud}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(r => r.json().then(data => ({
            // Return status
            status: r.status,
            // return data
            body: data
        }))
    );
}