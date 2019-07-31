let regButton = document.querySelector('#form-register .btn-submit');
let regFormUsername = document.querySelector('#form-register .form-username');
let regFormPassword = document.querySelector('#form-register .form-password');

regButton.addEventListener('click', function(event){
	event.preventDefault();
	let formValidated = true;
	if (regFormUsername.value.trim() === "") {
		console.log("missing username");
		formValidated = false;
	}
	if (regFormPassword.value === "") {
		console.log("missing password");
		formValidated = false;
	}

	if (formValidated) {
		register(regFormUsername.value.trim(),regFormPassword.value);
	}
});




const register = (username,password) => {
	let usernameData = { username };
	let usernameReq = new XMLHttpRequest();   // new HttpRequest instance

	usernameReq.addEventListener("load", function(){
		if (this.status === 200) {
			if (!this.responseText) {
				let userData = { username,password };
				let registerReq = new XMLHttpRequest();   // new HttpRequest instance
				registerReq.addEventListener("load", function(){
					if (this.status === 200) {
						window.location.href = "/";
					}
					else if (this.status === 204) {
						console.log("There is issue connecting to the server");
					}
					else {
						console.log("There is issue making the HTTP Request.");
					}
				});
				registerReq.open("POST", "/register");
				registerReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				registerReq.send(JSON.stringify(userData));
			}
			else {
				console.log("there is existing");
			}
		}
		else {
			console.log("There is issue making the HTTP Request.");
		}
	});

	usernameReq.open("POST", "/register/user");
	usernameReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	usernameReq.send(JSON.stringify(usernameData));
};