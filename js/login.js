function logIn() {
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	let cloud = window.location.hostname.split('.')[0] // Get cloud name

	// TODO Validate password

	let data = {
		'cloud': cloud,
		'username': username,
		'password': password
	};

	fetch(`https://${cloud}.team22.sweispring21.tk/common-services/login`, {
		method:"POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(function(response) {
			console.log(response.status);
			if (response.status === 201) {
				window.location.assign(`https://${cloud}.team22.sweispring21.tk/dashboard.html`);
			} else {
				// TODO: Handle error
			}
		});
}
