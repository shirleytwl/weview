var profToastCurrentlyDisplayed = false;
document.addEventListener('DOMContentLoaded',function () {
	let profileButton = document.querySelector('.btn-profile');
	let pfButton = document.querySelector('#form-profile .btn-submit');
	let pfUsername = document.querySelector('#form-profile .form-username');
	let pfPasswordOld = document.querySelector('#form-profile .form-password-old');
	let pfPasswordNew = document.querySelector('#form-profile .form-password-new');
	let imageInput = document.querySelector('#form-profile .form-profile-image');
	let delPassword = document.querySelector("#confirm-delete-modal .form-password-del");
	let delButton = document.querySelector('#confirm-delete-modal .btn-confirm-delete');
	let user_id = document.querySelector('.user-card').dataset.user;
	profileButton.addEventListener('click', function (event) {
		showUserInfo(user_id);
	});
	pfPasswordOld.addEventListener('keyup',function (event){
		if (pfPasswordOld.value.trim() !== "") {
			pfPasswordNew.disabled = false;
		}
		else {
			pfPasswordNew.disabled = true;
			pfPasswordNew.value = "";
			pfPasswordNew.classList.remove('valid');
			if (!imageInput.value) {
				pfButton.disabled = true;
			}
		}
	});
	pfPasswordNew.addEventListener('keyup',function (event){
		if (pfPasswordNew.value.trim() !== "") {
			pfButton.disabled = false;
		}
		else {
			if (!imageInput.value) {
				pfButton.disabled = true;
			}
		}
	});
	imageInput.addEventListener('change', function(event){
		if (pfPasswordOld.value.trim() !== "") {
			pfPasswordNew.disabled = false;
		}
	});

	pfButton.addEventListener('click', function(event){
		event.preventDefault();
		submitProfile(user_id);
	});
	delButton.addEventListener('click', function (event) {
		event.preventDefault();
		if (delPassword.value.trim() === "") {
			if (!profToastCurrentlyDisplayed) {
				profToastCurrentlyDisplayed = true;
				M.toast({
					html: 'Incorrect Password.',
					displayLength: 1500,
					completeCallback: function () {
						profToastCurrentlyDisplayed = false;
					}
				});
			}
		} else {
			deleteProfile(user_id)
		}
	});
});

const showUserInfo = (user_id) => {
	let profileReq = new XMLHttpRequest();   // new HttpRequest instance
	profileReq.addEventListener("load", function(){
		if (this.status === 200) {
			let response = JSON.parse(this.responseText);
			let usernameEl = document.querySelector('#form-profile .form-username');
			let usernameLabelEl = document.querySelector("#form-profile .username-label");
			let imageEl = document.querySelector("#form-profile .form-image-preview");
			usernameEl.value = response.username;
			usernameLabelEl.className = "active";
			imageEl.src = response.image;
		}
		else {
			if (!profToastCurrentlyDisplayed) {
				profToastCurrentlyDisplayed = true;
				M.toast({
					html: 'There is issue making the HTTP Request.',
					displayLength: 1500,
					completeCallback: function () {
						profToastCurrentlyDisplayed = false;
					}
				});
			}
		}
	});
	profileReq.open("GET", "/user-info/"+user_id);
	profileReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	profileReq.send();
};

const submitProfile = (user_id) => {
	let userData = {};
	if (document.querySelector('#form-profile .form-password-new').value !== ""){
		userData.oldPassword = document.querySelector('#form-profile .form-password-old').value;
		userData.newPassword = document.querySelector('#form-profile .form-password-new').value;
	}
	if (document.querySelector('#form-profile .form-profile-image').value !== "") {
		userData.newImage = document.querySelector('.form-image-preview').src;
	}
	let profileReq = new XMLHttpRequest();   // new HttpRequest instance
	profileReq.addEventListener("load", function(){
		if (this.status === 200) {
			location.reload();
		}
		else if (this.status === 203) {
			// location.reload();
			if (!profToastCurrentlyDisplayed) {
				profToastCurrentlyDisplayed = true;
				M.toast({
					html: 'Incorrect Password',
					displayLength: 1500,
					completeCallback: function () {
						profToastCurrentlyDisplayed = false;
					}
				});
			}
		}
		else {
			if (!profToastCurrentlyDisplayed) {
				profToastCurrentlyDisplayed = true;
				M.toast({
					html: 'There is issue making the HTTP Request.',
					displayLength: 1500,
					completeCallback: function () {
						profToastCurrentlyDisplayed = false;
					}
				});
			}
		}
	});
	profileReq.open("PUT", "/users/"+user_id);
	profileReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	profileReq.send(JSON.stringify(userData));
};

const deleteProfile = (user_id) => {
	let userData = {
		username: user_id,
		password: document.querySelector("#confirm-delete-modal .form-password-del").value
	};
	let delReq = new XMLHttpRequest();   // new HttpRequest instance
	delReq.addEventListener("load", function(){
		if (this.status === 200) {
			document.location.href="/logout";
		}
		else if (this.status === 203) {
			if (!profToastCurrentlyDisplayed) {
				profToastCurrentlyDisplayed = true;
				M.toast({
					html: 'Incorrect Password',
					displayLength: 1500,
					completeCallback: function () {
						profToastCurrentlyDisplayed = false;
					}
				});
			}
		}
		else {
			if (!profToastCurrentlyDisplayed) {
				profToastCurrentlyDisplayed = true;
				M.toast({
					html: 'There is issue making the HTTP Request.',
					displayLength: 1500,
					completeCallback: function () {
						profToastCurrentlyDisplayed = false;
					}
				});
			}
		}
	});
	delReq.open("DELETE", "/users/"+user_id);
	delReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	delReq.send(JSON.stringify(userData));
};