async function fetchLoggedInUser(cloud) {
    let cloudURL = `https://${cloud}.team22.sweispring21.tk`;

    return await fetch(cloudURL + `/api/v1/common-services/user?cloud=${cloud}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json().then(data => ({
            status: response.status,
            body: data
        }))
    );
}