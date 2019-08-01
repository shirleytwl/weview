let rfButton = document.querySelector('#form-register .btn-submit');
let rfUsername = document.querySelector('#form-register .form-username');
let rfPassword = document.querySelector('#form-register .form-password');

rfButton.addEventListener('click', function(event){
	event.preventDefault();
	if (rfUsername.value.trim() === "" || rfPassword.value === "") {
		M.toast({html: 'Please fill in all fields',displayLength:1000});
	}
	else {
		register(rfUsername.value.trim(),rfPassword.value);
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
						M.toast({html: 'There is issue connecting to the server',displayLength:1500});
					}
					else {
						M.toast({html: 'There is issue making the HTTP Request',displayLength:1500});
					}
				});
				registerReq.open("POST", "/register");
				registerReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				registerReq.send(JSON.stringify(userData));
			}
			else {
				M.toast({html: 'Please try something else as the username is in use',displayLength:1500});
			}
		}
		else {
			M.toast({html: 'There is issue making the HTTP Request',displayLength:1500});
		}
	});

	usernameReq.open("POST", "/register/user");
	usernameReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	usernameReq.send(JSON.stringify(usernameData));
};