var stepperInstance;
var toastCurrentlyDisplayed = false;
var channel_info;
var channel_categories = [];
document.addEventListener('DOMContentLoaded',function () {
	let stepper = document.querySelector('.stepper');
	let reviewButton = document.querySelector('#channel-review-form .btn-submit');
	let channelRating = document.querySelector('#channel_rating');
	let channelRatingText = document.querySelector('.rating-score span');
	stepperInstance = new MStepper(stepper, {
		firstActive: 0,
		linearStepsNavigation: false,
		stepTitleNavigation: false
	});

	reviewButton.addEventListener('click', function(event){
		event.preventDefault();
		submitReview();
	});

	channelRating.addEventListener('change', function(event){
		channelRatingText.innerText = event.target.value +"/5";
	})

});
function checkChannel(destroyFeedback, form, activeStepContent) {
	let input = activeStepContent.querySelector('input').value;

	let regex = /(channel\/|user\/)\w+/g;
	let result = input.match(regex);

	if (result === null) {
		stepperInstance.wrongStep();
		if (!toastCurrentlyDisplayed) {
			toastCurrentlyDisplayed = true;
			M.toast({
				html: 'Invalid Youtube channel URL.',
				completeCallback: function () {
					toastCurrentlyDisplayed = false;
				}
			});
		}
		return destroyFeedback(false);
	}

	let urlInfo = result[0].split('/');

	youtubeReq(urlInfo[0],urlInfo[1])
		.then((channel) => {
			channel_info = channel;
			let nameEl = document.querySelector('.step-2 .channel-name');
			let catEl = document.querySelector('.step-2 .channel-categories');
			let imgEl = document.querySelector('.step-2 .channel-thumbnail');
			let reviewEl = document.querySelector("#channel_review");
			nameEl.innerText = channel.snippet.title;
			let categories = channel.topicDetails.topicCategories;
			let regex = /\/([^\/]+)\/?$/;
			catEl.innerText = "";
			reviewEl.value = "";
			for (let category of categories) {
				let newList = document.createElement("span");
				newList.className = "btn btn-small disabled";
				newList.innerText = category.match(regex)[1];
				channel_categories.push(category.match(regex)[1]);
				catEl.append(newList);
			}
			imgEl.src = channel.snippet.thumbnails.medium.url;


			return destroyFeedback(true);
		})
		.catch(() => {
			stepperInstance.wrongStep();
			if (!toastCurrentlyDisplayed) {
				toastCurrentlyDisplayed = true;
				M.toast({
					html: 'Channel not found.',
					completeCallback: function () {
						toastCurrentlyDisplayed = false;
					}
				});
			}
			return destroyFeedback(false);
		})
}

const youtubeReq = (type, info) => {
	let channelReq = new XMLHttpRequest();   // new HttpRequest instance
	return new Promise(function (resolve, reject) {
		channelReq.addEventListener("load", function () {
			if (this.status === 200) {
				let response = JSON.parse(this.responseText);
				if (response.items.length) {
					return resolve(response.items[0]);
				}
			}
			return reject();
		});

		channelReq.open("GET", "/youtube/" + type + "/" + info);
		channelReq.send();
	});
};

function formOverview (destroyFeedback, form, activeStepContent) {
	let nameEl = activeStepContent.querySelector('.step-2 .channel-name');
	let catEl = activeStepContent.querySelector('.step-2 .channel-categories');
	let imgEl = activeStepContent.querySelector('.step-2 .channel-thumbnail');
	let scoreEl = activeStepContent.querySelector(".rating-score span");
	let ratingEl = activeStepContent.querySelector("#channel_rating");
	let reviewEl = activeStepContent.querySelector("#channel_review");

	let overviewName = document.querySelector('.step-3 .channel-name');
	let overviewCat = document.querySelector('.step-3 .channel-categories');
	let overviewImg = document.querySelector('.step-3 .channel-thumbnail');
	let overviewScore = document.querySelector(".overview-score span");
	let overviewRating = document.querySelector("#overview_rating");
	let overviewReview = document.querySelector("#overview_review");
	let overviewReviewLabel = document.querySelector("#overview_review_label");

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
		id: channel_info.id,
		name: channel_info.snippet.title,
		categories: channel_categories,
		thumbnail: channel_info.snippet.thumbnails.medium.url,
		link: "https://www.youtube.com/c/"+channel_info.snippet.customUrl,
		review: document.querySelector("#overview_review").value,
		rating: document.querySelector("#overview_rating").value,
	};
	let reviewReq = new XMLHttpRequest();   // new HttpRequest instance
	reviewReq.addEventListener("load", function(){
		if (this.status === 201) {
			location.reload();
		}
		if (this.status === 204) {
			if (!toastCurrentlyDisplayed) {
				toastCurrentlyDisplayed = true;
				M.toast({
					html: 'You have created a review before',
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
	reviewReq.open("POST", "/channel");
	reviewReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	reviewReq.send(JSON.stringify(reviewData));
};