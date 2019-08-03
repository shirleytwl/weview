var editStepperInstance;
var editToastCurrentlyDisplayed = false;
var channel_id;
document.addEventListener('DOMContentLoaded',function () {
	let stepper = document.querySelector('#add-review-form');
	let submitButton = document.querySelector('#add-review-form .btn-submit');
	let newButton = document.querySelector('.btn-new');
	let channelRating = document.querySelector('#add-review-form #channel_rating');
	let channelRatingText = document.querySelector('#add-review-form .rating-score span');
	let youtube_id = document.querySelector('.btn-new').dataset.channel;
	editStepperInstance = new MStepper(stepper, {
		firstActive: 0,
		linearStepsNavigation: false,
		stepTitleNavigation: false
	});

	submitButton.addEventListener('click', function(event){
		event.preventDefault();
		submitReview();
	});

	channelRating.addEventListener('change', function(event){
		channelRatingText.innerText = event.target.value +"/5";
	});
	newButton.addEventListener('click', function(event) {
		showChannelInfo(youtube_id);
	});
});

const showChannelInfo = (youtube_id) => {
	let channelReq = new XMLHttpRequest();   // new HttpRequest instance
	channelReq.addEventListener("load", function(){
		if (this.status === 200) {
			let response = JSON.parse(this.responseText);
			let nameEl = document.querySelector('#add-review-form .step-1 .channel-name');
			let catEl = document.querySelector('#add-review-form .step-1 .channel-categories');
			let imgEl = document.querySelector('#add-review-form .step-1 .channel-thumbnail');
			channel_id = response.id;
			nameEl.innerText = response.name;
			imgEl.src = response.thumbnail_url;
			catEl.innerText = "";
			for (let category of response.categories) {
				let newList = document.createElement("span");
				newList.className = "btn btn-small disabled";
				newList.innerText = category.name.split("_").join(" ");
				catEl.append(newList);
			}
		}
		else {
			if (!editToastCurrentlyDisplayed) {
				editToastCurrentlyDisplayed = true;
				M.toast({
					html: 'There is issue making the HTTP Request.',
					completeCallback: function () {
						editToastCurrentlyDisplayed = false;
					}
				});
			}
		}
	});
	channelReq.open("GET", "/channel-info/"+youtube_id);
	channelReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	channelReq.send();
};

function reviewOverview (destroyFeedback, form, activeStepContent) {
	let nameEl = activeStepContent.querySelector('#add-review-form .step-1 .channel-name');
	let catEl = activeStepContent.querySelector('#add-review-form .step-1 .channel-categories');
	let imgEl = activeStepContent.querySelector('#add-review-form .step-1 .channel-thumbnail');
	let scoreEl = activeStepContent.querySelector("#add-review-form .rating-score span");
	let ratingEl = activeStepContent.querySelector("#add-review-form #channel_rating");
	let reviewEl = activeStepContent.querySelector("#add-review-form #channel_review");

	let overviewName = document.querySelector('#add-review-form .step-2 .channel-name');
	let overviewCat = document.querySelector('#add-review-form .step-2 .channel-categories');
	let overviewImg = document.querySelector('#add-review-form .step-2 .channel-thumbnail');
	let overviewScore = document.querySelector("#add-review-form .overview-score span");
	let overviewRating = document.querySelector("#add-review-form #overview_rating");
	let overviewReview = document.querySelector("#add-review-form #overview_review");
	let overviewReviewLabel = document.querySelector("#add-review-form #overview_review_label");

	overviewName.innerHTML = nameEl.innerHTML;
	overviewCat.innerHTML = catEl.innerHTML;
	overviewImg.src = imgEl.src;
	overviewScore.innerText = scoreEl.innerText;
	overviewRating.value = ratingEl.value;
	overviewReview.value = reviewEl.value;
	overviewReviewLabel.className = "active";

	return destroyFeedback(true);
};

const submitReview = () => {
	let reviewData = {
		review: document.querySelector("#add-review-form #overview_review").value,
		rating: document.querySelector("#add-review-form #overview_rating").value,
	};
	let reviewReq = new XMLHttpRequest();   // new HttpRequest instance
	reviewReq.addEventListener("load", function(){
		if (this.status === 201) {
			location.reload();
		}
		if (this.status === 204) {
			if (!editToastCurrentlyDisplayed) {
				editToastCurrentlyDisplayed = true;
				M.toast({
					html: 'You have created a review before',
					completeCallback: function () {
						editToastCurrentlyDisplayed = false;
					}
				});
			}
		}
		else {
			if (!editToastCurrentlyDisplayed) {
				editToastCurrentlyDisplayed = true;
				M.toast({
					html: 'There is issue making the HTTP Request.',
					completeCallback: function () {
						editToastCurrentlyDisplayed = false;
					}
				});
			}
		}
	});
	reviewReq.open("POST", "/review/"+channel_id);
	reviewReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	reviewReq.send(JSON.stringify(reviewData));
};