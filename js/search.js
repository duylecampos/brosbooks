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
		// $('.article-wrapper').remove();
		$.each(results.items, function(key, val) {
			createMovieList(val.volumeInfo);
		});
	}).fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
}


function createMovieList(movieData){
	thumbnail = (typeof(movieData.imageLinks) != 'undefined')? movieData.imageLinks.thumbnail : './img/book-placeholder.jpg';
	authors = (typeof(movieData.authors) != 'undefined')? movieData.authors.join() : '-';
	$('#found-books').append(
		$('<div />').addClass('bloc col-md-4 col-xs-12 article-wrapper').append(
			$('<div />').addClass('article').append(
				$('<div />').addClass('img-wrapper').append($('<img/>').attr('src', thumbnail))
			).append($('<div />').addClass('info-wrapper').append(
					$('<div />').addClass('title-wrapper').append(
						$('<h1 />').append(movieData.title)
					)
				).append(
					$('<small />').addClass('authors').append($('<strong />').append('Autores: ')).append(authors)
				).append(
					$('<p />').addClass('desc').append(movieData.description)
				)
			).append(
				$('<div />').addClass('overflow-fading')
			)
		).append(
			$('<div />').addClass('actions').append(
				$('<div />').addClass('col-md-4 col-xs-4 add').text('Add')
			).append(
				$('<div />').addClass('col-md-4 col-xs-4 details').text('Details')
			).append(
				$('<div />').addClass('col-md-4 col-xs-4 read').text('Read')
			)
		)
	);
}

// <div class="bloc col-xs-12 col-xs-4 article-wrapper">
//   <article>
//     <a href="#" class="more">more</a>
//     <div class="img-wrapper"><img src="http://lorempixel.com/150/150/fashion" alt="" /></div>
//     <h1>Lorem ipsum dolor.</h1>
//     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet ducimus totam quasi nam porro sed.</p>
//   </article>
// </div>