$(document).ready(function(){
	$('select').formSelect();
	const urlParams = new URLSearchParams(window.location.search);
	const sortby = urlParams.get("sortby");
	$("#sortby option[value='"+sortby+"']").prop('selected', true);

	let youtubeId = $('.btn-new').data('channel');
	$("#sortby").on('change', function(e) {
		location.href = '/channels/'+youtubeId+'/?sortby='+e.target.value;
	});
});