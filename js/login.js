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

	fetch(`https://${cloud}.team22.sweispring21.tk/api/v1/common-services/login`, {
		method:"POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(response => {
		if (response.ok) {
			return response.json();
		}
		return Promise.reject(response)
	}).then(data => {
		console.log(data);
		window.location.assign(`https://${cloud}.team22.sweispring21.tk/dashboard.html`);
	}).catch(error => {
		console.warn('Something went wrong.', error);
		// TODO: Handle error based on status code
	});
}
