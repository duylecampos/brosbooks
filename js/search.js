$('#book-search').on("click", function(){
	findTheBook();
});

$("#search-field").on('keypress', function(e) {
	if ( e.which == 13 ) {
		findTheBook();
	}
});

function findTheBook(){
	$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes",
		type: "get",
		data: { q : $('#search-field').val() },
		dataType: "json"
	}).done(function(results) {
		$('.article-wrapper').remove();
		$.each(results.items, function(key, val) {
			createBookList(val.volumeInfo);
		});
	}).fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
}


function createBookList(bookData){
	thumbnail = (typeof(bookData.imageLinks) != 'undefined')? bookData.imageLinks.thumbnail : './img/book-placeholder.jpg';
	authors = (typeof(bookData.authors) != 'undefined')? bookData.authors.join() : '-';
	$('#found-books').append(
		$('<div />').addClass('bloc col-md-4 col-xs-12 article-wrapper').append(
			$('<div />').addClass('article').append(
				$('<div />').addClass('img-wrapper').append($('<img/>').attr('src', thumbnail))
			).append($('<div />').addClass('info-wrapper').append(
					$('<div />').addClass('title-wrapper').append(
						$('<h1 />').append(bookData.title)
					)
				).append(
					$('<small />').addClass('authors').append($('<strong />').append('Autores: ')).append(authors)
				).append(
					$('<p />').addClass('desc').append(bookData.description)
				)
			).append(
				$('<div />').addClass('overflow-fading')
			)
		).append(
			$('<div />').addClass('actions').append(
				$('<div />').addClass('col-md-4 col-xs-4 add').append($('<span />').addClass('icon-plus'))
			).append(
				$('<div />').addClass('col-md-4 col-xs-4 details').append($('<span />').addClass('icon-expand'))
			).append(
				$('<div />').addClass('col-md-4 col-xs-4 check-read').append($('<span />').addClass('icon-checkmark'))
			)
		)
	);
}