$(document).ready(function(){
	$('select').formSelect();
	const urlParams = new URLSearchParams(window.location.search);
	const sortby = urlParams.get("sortby");
	$("#sortby option[value='"+sortby+"']").prop('selected', true);

	let categoryId = $('#category-title').data('category');
	$("#sortby").on('change', function(e) {
		location.href = '/categories/'+categoryId+'/?sortby='+e.target.value;
	});
});