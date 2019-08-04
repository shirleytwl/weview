document.addEventListener('DOMContentLoaded',function () {
	let profileButton = document.querySelector('.btn-profile');
	let pfButton = document.querySelector('#form-profile .btn-submit');
	let pfUsername = document.querySelector('#form-profile .form-username');
	let pfPasswordOld = document.querySelector('#form-profile .form-password-old');
	let pfPasswordNew = document.querySelector('#form-profile .form-password-new');
	let imageInput = document.querySelector('#form-profile .form-profile-image');
	pfButton.addEventListener('click', function (event) {
		event.preventDefault();
		if (pfUsername.value.trim() === "") {
			M.toast({html: 'This username cannot be used.', displayLength: 1500});
		} else {
		}

	});
	let user_id;
	profileButton.addEventListener('click', function (event) {
		if (!event.target.dataset.user) {
			user_id = event.target.parentNode.dataset.user;
			showUserInfo(user_id);
		} else {
			user_id = event.target.dataset.user;
			showUserInfo(user_id);
		}
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
		var preview = document.querySelector('.form-image-preview');
		var file    = document.querySelector('input[type=file].form-profile-image').files[0];
		var reader  = new FileReader();

		reader.addEventListener("load", function () {
			preview.src = reader.result;
		}, false);

		if (file) {
			reader.readAsDataURL(file);
			pfButton.disabled = false;
		}
	});

	pfButton.addEventListener('click', function(event){
		event.preventDefault();
		submitProfile(user_id);
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
			if (!toastCurrentlyDisplayed) {
				toastCurrentlyDisplayed = true;
				M.toast({
					html: 'There is issue making the HTTP Request.',
					completeCallback: function () {
						toastCurrentlyDisplayed = false;
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
	let reviewReq = new XMLHttpRequest();   // new HttpRequest instance
	reviewReq.addEventListener("load", function(){
		if (this.status === 200) {
			location.reload();
		}
		else if (this.status === 203) {
			// location.reload();
			if (!toastCurrentlyDisplayed) {
				toastCurrentlyDisplayed = true;
				M.toast({
					html: 'Incorrect password!',
					completeCallback: function () {
						toastCurrentlyDisplayed = false;
					}
				});
			}
		}
		else {
			if (!toastCurrentlyDisplayed) {
				toastCurrentlyDisplayed = true;
				M.toast({
					html: 'There is issue making the HTTP Request.',
					completeCallback: function () {
						toastCurrentlyDisplayed = false;
					}
				});
			}
		}
	});
	reviewReq.open("PUT", "/users/"+user_id);
	reviewReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	reviewReq.send(JSON.stringify(userData));
};