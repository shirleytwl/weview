
let lfButton = document.querySelector('#form-login .btn-submit');
let lfUsername = document.querySelector('#form-login .form-username');
let lfPassword = document.querySelector('#form-login .form-password');
lfButton.addEventListener('click', function(event){
	event.preventDefault();
	if (lfUsername.value.trim() === "" || lfPassword.value === "") {
		M.toast({html: 'Please fill in all fields',displayLength:1500});
	}
	else {
		login(lfUsername.value.trim(),lfPassword.value);
	}
});



const login = (username,password) => {
	let userData = { username,password };
	let loginReq = new XMLHttpRequest();   // new HttpRequest instance
	loginReq.addEventListener("load", function(){
		if (this.status === 200) {
			window.location.href = "/";
		}
		else if (this.status === 204) {
			console.log("Invalid username/password");
			M.toast({html: 'Invalid username/password',displayLength:1500});
		}
		else {
			M.toast({html: 'There is issue making the HTTP Request.',displayLength:1500});
		}
	});
	loginReq.open("POST", "/login");
	loginReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	loginReq.send(JSON.stringify(userData));
};