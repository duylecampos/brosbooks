
$('#book-search').on("click", function(){
	findTheBook();
});

$("#search-field").on('keypress', function(e) {
	if ( e.which == 13 ) {
		findTheBook();
	}
});

$(document).on('click', '.actions .details span.icon-expand', function(){
	$('.book-detail-wrapper').remove();
	btn_details = $(this);
	book = $(this).closest('.article-wrapper');
	id = book.attr('id');
	$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes/" + id,
		dataType: "json"
	}).done(function(results) {
		btn_details.removeClass('icon-expand');
		btn_details.addClass('icon-contract');
		createBookDetails(book, results);
	}).fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
});

$(document).on('click', '.actions .details span.icon-contract', function(){
	//@TODO: Remove only de next .book-detail-wrapper div.
	// book = $(this).closest('.article-wrapper');
	// detail = book.find('.book-detail-wrapper');
	$('.book-detail-wrapper').remove();
	btn_details.addClass('icon-expand');
	btn_details.removeClass('icon-contract');

});

function findTheBook(){
	$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes",
		type: "get",
		data: { q : $('#search-field').val() },
		dataType: "json"
	}).done(function(results) {
		$('.article-wrapper').remove();
		$('.book-detail-wrapper').remove();
		$.each(results.items, function(key, val) {
			createBookList(val);
		});
	}).fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
}


function createBookList(bookInfo){
	bookData = bookInfo.volumeInfo;
	thumbnail = (typeof(bookData.imageLinks) != 'undefined')? bookData.imageLinks.thumbnail : './img/book-placeholder.jpg';
	authors = (typeof(bookData.authors) != 'undefined')? bookData.authors.join() : '-';
	$('#found-books').append(
		$('<div />').addClass('bloc col-md-4 col-xs-12 article-wrapper').attr('id', bookInfo.id).append(
			$('<div />').addClass('article').append(
				$('<div />').addClass('cover-wrapper').append($('<img/>').attr('src', thumbnail))
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

function createBookDetails(target, bookInfo){
	bookData = bookInfo.volumeInfo;
	thumbnail = (typeof(bookData.imageLinks) != 'undefined')? bookData.imageLinks.thumbnail : './img/book-placeholder.jpg';
	authors = (typeof(bookData.authors) != 'undefined')? bookData.authors.join() : '-';
	categories = (typeof(bookData.categories) != 'undefined')? bookData.categories.join() : '-';
	$('<div />').append(
		$('<div />').addClass('col-md-12 col-xs-12 book-detail-wrapper').append(
			$('<div />').addClass('book-detail row').append(
				$('<div />').addClass('col-md-12 col-xs-12 title-wrapper').append(
					$('<h1 />').append(bookData.title)
				)
			).append(
				$('<div />').addClass('col-md-3 col-xs12 cover-wrapper').append(
					$('<img/>').attr('src', thumbnail)
				).append(
					$('<div />').addClass('cover-info').append(
						$('<small />').addClass('category').append($('<strong />').append('Categorias: ')).append(categories)
					).append(
						$('<small />').addClass('authors').append($('<strong />').append('Autores: ')).append(authors)
					)
				)
			).append(
				$('<div />').addClass('col-md-9 col-xs-12 info').append(
					$('<p />').addClass('desc').append(bookData.description)
				).append(
					$('<div />').addClass('col-md-12 friends-wrapper').append(
						$('<div />').addClass('col-md-6 read-friends friends').append(
							$('<h3 />').text('Amigos que leram:')
						)
					).append(
						$('<div />').addClass('col-md-6 wish-friends friends').append(
							$('<h3 />').text('Amigos que desejam:')
						)
					)
				)
			)
		)
	).insertAfter(target);
	searchFriends(bookInfo.id);
}

function searchFriends(bookId){
	FB.api('/me/taggable_friends', function(response) {

		$.each(response.data, function(key, val) {
			$('.read-friends').append(
				$('<img />').attr('src', val.picture.data.url).attr('alt', val.name)
			);
			if(key > 6)
				return false;
		});

		$.each(response.data, function(key, val) {
			$('.wish-friends').append(
				$('<img />').attr('src', val.picture.data.url).attr('alt', val.name)
			);
			if(key > 7)
				return false;
		});
	});
}
















