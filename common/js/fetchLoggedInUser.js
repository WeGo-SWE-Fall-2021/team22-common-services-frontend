async function fetchLoggedInUser() {
    return await fetch(`https://wego.madebyerikb.com/api/user`, {
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