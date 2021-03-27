$(() => {
	$("#logInButton").click(() => {
		let username = $("#username").val();
		let password = $("#password").val();
		let rememberMe = $("#rememberMeCheckbox").prop("checked");
		let cloud = window.location.hostname.split('.')[0] // Get cloud name

		$('#errorAlert').addClass('d-none');

		$('.card-body').addClass('was-validated');

		let errorVisible = $('.invalid-feedback:visible').length

		if (errorVisible !== 0) {
			console.log("There are currently errors in validation. User needs to fix those errors before proceeding.")
			return
		}

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
			window.location.assign(`https://${cloud}.team22.sweispring21.tk/${cloud}-frontend/dashboard.html`);
		}).catch(error => {
			console.warn('Something went wrong.', error);
			if (error.status === 401) {
				$('#errorAlert').removeClass('d-none').text('Incorrect username or password.');
			} else {
				$('#errorAlert').removeClass('d-none').text('There was an error communicating with the server.');
				// TODO: Handle error based on status code
			}
		});

	})
});

function logIn() {


	// TODO Validate password

}
