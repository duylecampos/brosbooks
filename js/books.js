$(document).on('click', '.actions .add span', function(){
	id = $(this).closest('.article-wrapper').attr('id');
	alert(id);
});

$(document).on('click', '.actions .check-read span', function(){
	id = $(this).closest('.article-wrapper').attr('id');
	alert('Lido');
});

