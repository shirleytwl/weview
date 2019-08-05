$(document).ready(function(){
	$('select').formSelect();
	const urlParams = new URLSearchParams(window.location.search);
	const sortby = urlParams.get("sortby");
	$("#sortby option[value='"+sortby+"']").prop('selected', true);

	let username = $('.user-card').data('user');
	$("#sortby").on('change', function(e) {
		location.href = '/users/'+username+'/?sortby='+e.target.value;
	});
});