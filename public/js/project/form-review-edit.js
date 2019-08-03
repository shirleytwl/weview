var stepperInstance;
var toastCurrentlyDisplayed = false;
document.addEventListener('DOMContentLoaded',function () {
	let editButton = document.querySelectorAll('.btn-edit');
	let stepper = document.querySelector('#review-edit-form');
	let reviewButton = document.querySelector('#review-edit-form .btn-submit');
	let channelRating = document.querySelector('#review-edit-form #channel_rating');
	let channelRatingText = document.querySelector('#review-edit-form .rating-score span');
	let review_id;
	stepperInstance = new MStepper(stepper, {
		firstActive: 0,
		linearStepsNavigation: false,
		stepTitleNavigation: false
	});
	editButton.forEach(function(element) {
		element.addEventListener('click', function (event) {
			if (!event.target.dataset.review) {
				review_id = event.target.parentNode.dataset.review;
				showReviewInfo(review_id);
			} else {
				review_id = event.target.dataset.review;
				showReviewInfo(review_id);
			}
		});
	});
	reviewButton.addEventListener('click', function(event){
		event.preventDefault();
		submitEdit(review_id);
	});

	channelRating.addEventListener('change', function(event){
		channelRatingText.innerText = event.target.value +"/5";
	});

});

const showReviewInfo = (review_id) => {
	let editReq = new XMLHttpRequest();   // new HttpRequest instance
	editReq.addEventListener("load", function(){
		if (this.status === 200) {
			let response = JSON.parse(this.responseText);
			console.log(response);
			let nameEl = document.querySelector('#review-edit-form .step-1 .channel-name');
			let catEl = document.querySelector('#review-edit-form .step-1 .channel-categories');
			let imgEl = document.querySelector('#review-edit-form .step-1 .channel-thumbnail');
			let channelRating = document.querySelector('#review-edit-form #channel_rating');
			let channelRatingText = document.querySelector('#review-edit-form .rating-score span');
			let reviewEl = document.querySelector("#review-edit-form #channel_review");
			let reviewLabel = document.querySelector("#review-edit-form #channel_review_label");

			nameEl.innerText = response.name;
			imgEl.src = response.thumbnail_url;
			channelRatingText.innerText = response.rating+"/5";
			channelRating.value = response.rating;
			reviewEl.value = response.content;
			reviewLabel.className = "active";
			for (let category of response.categories) {
				let newList = document.createElement("span");
				newList.className = "btn btn-small disabled";
				newList.innerText = category.name;
				catEl.append(newList);
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
	editReq.open("GET", "/review/"+review_id);
	editReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	editReq.send();
};
function formOverview (destroyFeedback, form, activeStepContent) {
	let nameEl = activeStepContent.querySelector('#review-edit-form .step-1 .channel-name');
	let catEl = activeStepContent.querySelector('#review-edit-form .step-1 .channel-categories');
	let imgEl = activeStepContent.querySelector('#review-edit-form .step-1 .channel-thumbnail');
	let scoreEl = activeStepContent.querySelector("#review-edit-form .rating-score span");
	let ratingEl = activeStepContent.querySelector("#review-edit-form #channel_rating");
	let reviewEl = activeStepContent.querySelector("#review-edit-form #channel_review");

	let overviewName = document.querySelector('#review-edit-form .step-2 .channel-name');
	let overviewCat = document.querySelector('#review-edit-form .step-2 .channel-categories');
	let overviewImg = document.querySelector('#review-edit-form .step-2 .channel-thumbnail');
	let overviewScore = document.querySelector("#review-edit-form .overview-score span");
	let overviewRating = document.querySelector("#review-edit-form #overview_rating");
	let overviewReview = document.querySelector("#review-edit-form #overview_review");
	let overviewReviewLabel = document.querySelector("#review-edit-form #overview_review_label");

	overviewName.innerHTML = nameEl.innerHTML;
	overviewCat.innerHTML = catEl.innerHTML;
	overviewImg.src = imgEl.src;
	overviewScore.innerText = scoreEl.innerText;
	overviewRating.value = ratingEl.value;
	overviewReview.value = reviewEl.value;
	overviewReviewLabel.className = "active";

	return destroyFeedback(true);
};

const submitEdit = (review_id) => {
	let reviewData = {
		review: document.querySelector("#review-edit-form #overview_review").value,
		rating: document.querySelector("#review-edit-form #overview_rating").value,
	};
	let reviewReq = new XMLHttpRequest();   // new HttpRequest instance
	reviewReq.addEventListener("load", function(){
		if (this.status === 200) {
			location.reload();
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
	reviewReq.open("PUT", "/review/"+review_id);
	reviewReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	reviewReq.send(JSON.stringify(reviewData));
};