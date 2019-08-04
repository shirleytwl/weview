$(document).ready(function(){
	$('.modal').modal();
	M.Sidenav.init($('.sidenav'), {edge:'right'});

	$("a").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top - 74
			}, 800);
		}
	});
	showBTT();
	$(window).scroll(function() {
		showBTT()
	});
	$("#backToTop").click(function(){
		$('body,html').animate({
			scrollTop : 0
		}, 500);
		document.documentElement.scrollTop = 0;
	})
});



function showBTT() {
	let backToTop = document.querySelector("#backToTop");
	if (document.documentElement.scrollTop > 40 && document.documentElement.scrollTop< (document.body.clientHeight-900)) {
		backToTop.style.opacity = 1;
	}
	else {
		backToTop.style.opacity = 0;
	}
}
