
let loginButton = document.querySelector('#form-login .btn-submit');
let loginFormUsername = document.querySelector('#form-login .form-username');
let loginFormPassword = document.querySelector('#form-login .form-password');
loginButton.addEventListener('click', function(event){
	event.preventDefault();
	let formValidated = true;
	if (loginFormUsername.value.trim() === "") {
		console.log("missing username");
		formValidated = false;
	}
	if (loginFormPassword.value === "") {
		console.log("missing password");
		formValidated = false;
	}

	if (formValidated) {
		login(loginFormUsername.value.trim(),loginFormPassword.value);
	}
});



const login = (username,password) => {
	let userData = { username,password };
	let loginReq = new XMLHttpRequest();   // new HttpRequest instance
	loginReq.addEventListener("load", function(){
		if (this.status === 200) {
			console.log("logged in");
		}
		else if (this.status === 204) {
			console.log("Invalid username/password");
		}
		else {
			console.log("There is issue making the HTTP Request.");
		}
	});
	loginReq.open("POST", "/login");
	loginReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	loginReq.send(JSON.stringify(userData));
};