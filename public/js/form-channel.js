var stepperInstance;
document.addEventListener('DOMContentLoaded',function () {
	var stepper = document.querySelector('.stepper');
	stepperInstance = new MStepper(stepper, {
		firstActive: 0,
		linearStepsNavigation: false,
		stepTitleNavigation: false
	})
});

function checkChannel(destroyFeedback, form, activeStepContent) {
	let input = activeStepContent.querySelector('input').value;

	let regex = /(channel\/|user\/)\w+/g;
	let result = input.match(regex);

	if (result === null) {
		stepperInstance.wrongStep();
		M.toast({html: 'Invalid Youtube channel URL.'});
		return destroyFeedback(false);
	}

	let urlInfo = result[0].split('/');

	if (urlInfo[0].toLowerCase() === 'channel') {
		checkChannelById(urlInfo[1])
			.then(() => {
				return destroyFeedback(true);
			})
			.catch(() => {
				stepperInstance.wrongStep();
				M.toast({html: 'Channel not found.'});
				return destroyFeedback(false);
			})
	}
	else if (urlInfo[0].toLowerCase() === 'user') {
		stepperInstance.wrongStep();
		return destroyFeedback(false);
	}
}

const checkChannelById = (channelId) => {
	let channelReq = new XMLHttpRequest();   // new HttpRequest instance
	return new Promise(function (resolve, reject) {
		channelReq.addEventListener("load", function(){
			if (this.status === 200) {
				let response = JSON.parse(this.responseText);
				if(response.items.length) {
					return resolve();
				}
			}
			return reject();
		});

		channelReq.open("GET", "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyCcGZw18W5XAdQrrmtFm8jo6vDILpPu9fk&id="+channelId+"&part=snippet");
		channelReq.send();
	});
};