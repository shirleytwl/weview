var delStepperInstance;
var delToastCurrentlyDisplayed = false;
document.addEventListener('DOMContentLoaded',function () {
	let editButton = document.querySelectorAll('.btn-delete');
	let stepper = document.querySelector('#review-delete-form');
	let reviewButton = document.querySelector('#review-delete-form .btn-submit');
	let channelRating = document.querySelector('#review-delete-form .channel_rating');
	let channelRatingText = document.querySelector('#review-delete-form .rating-score span');
	let review_id;
	let channel_id;
	delStepperInstance = new MStepper(stepper, {
		firstActive: 0,
		linearStepsNavigation: false,
		stepTitleNavigation: false
	});
	editButton.forEach(function(element) {
		element.addEventListener('click', function (event) {
			if (!event.target.dataset.review) {
				review_id = event.target.parentNode.dataset.review;
				channel_id = event.target.parentNode.dataset.channel;
				showReviewInfoDel(review_id);
			} else {
				review_id = event.target.dataset.review;
				channel_id = event.target.dataset.channel;
				showReviewInfoDel(review_id);
			}
		});
	});
	reviewButton.addEventListener('click', function(event){
		event.preventDefault();
		submitDelete(review_id, channel_id);
	});

	channelRating.addEventListener('change', function(event){
		channelRatingText.innerText = event.target.value +"/5";
	});

});

const showReviewInfoDel = (review_id) => {
	let editReq = new XMLHttpRequest();   // new HttpRequest instance
	editReq.addEventListener("load", function(){
		if (this.status === 200) {
			let response = JSON.parse(this.responseText);
			let nameEl = document.querySelector('#review-delete-form .step-1 .channel-name');
			let catEl = document.querySelector('#review-delete-form .step-1 .channel-categories');
			let imgEl = document.querySelector('#review-delete-form .step-1 .channel-thumbnail');
			let channelRating = document.querySelector('#review-delete-form .channel_rating');
			let channelRatingText = document.querySelector('#review-delete-form .rating-score span');
			let reviewEl = document.querySelector("#review-delete-form .channel_review");
			let reviewLabel = document.querySelector("#review-delete-form .channel_review_label");

			nameEl.innerText = response.name;
			imgEl.src = response.thumbnail_url;
			channelRatingText.innerText = response.rating+"/5";
			channelRating.value = response.rating;
			reviewEl.value = response.content;
			reviewLabel.className = "active";
			catEl.innerText = "";
			for (let category of response.categories) {
				let newList = document.createElement("span");
				newList.className = "btn btn-small disabled";
				newList.innerText = category.name;
				catEl.append(newList);
			}
		}
		else {
			if (!delToastCurrentlyDisplayed) {
				delToastCurrentlyDisplayed = true;
				M.toast({
					html: 'There is issue making the HTTP Request.',
					completeCallback: function () {
						delToastCurrentlyDisplayed = false;
					}
				});
			}
		}
	});
	editReq.open("GET", "/review/"+review_id);
	editReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	editReq.send();
};

const submitDelete = (review_id, channel_id) => {
	let channel = {channel_id};
	let reviewReq = new XMLHttpRequest();   // new HttpRequest instance
	reviewReq.addEventListener("load", function(){
		if (this.status === 200) {
			let response = JSON.parse(this.responseText);
			if (response.numreviews-1 === 0 && window.location.pathname.startsWith("/channels/")) {
				document.location.href="/";
			}
			else {
				location.reload();
			}
		}
		else {
			if (!delToastCurrentlyDisplayed) {
				delToastCurrentlyDisplayed = true;
				M.toast({
					html: 'There is issue making the HTTP Request.',
					completeCallback: function () {
						delToastCurrentlyDisplayed = false;
					}
				});
			}
		}
	});
	reviewReq.open("DELETE", "/review/"+review_id);
	reviewReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	reviewReq.send(JSON.stringify(channel));
};