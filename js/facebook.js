window.fbAsyncInit = function() {
	FB.init({
		appId      : '287709404752535',
		xfbml      : true,
		version    : 'v2.1'
	});

	FB.getLoginStatus(function(response) {
		checkLogin(response.status);
	});
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function checkLogin(status){
	if (status === 'connected') {
      // Logged into your app and Facebook.
      setLoginData();
    } else if (status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      appNotAuthorized();
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      loginInFacebook();
    }
}

function setLoginData(){
	$('.login-data').append($('<div />').addClass('col-md-3 navbar-right bro-info'));
	FB.api('/me', function(response) {
		$('.bro-info').prepend($('<div />').addClass('name').text(response.name));
	});

	FB.api('/me/picture', function(response) {
		$('.bro-info').append($('<img />').addClass('photo').attr('src', response.data.url));
    });

    FB.api('/me/permissions', function(response) {
		//@TODO Make a list with permissions grant. Use the list to show message where permissions is required
	});
}

function appNotAuthorized(){

}

function loginInFacebook(){
	$('.login-data').append($('<div />').addClass('col-md-3 navbar-right btn-login').append($('<span />').addClass('label').text('Entrar')));
}

$(document).on('click', '.btn-login', function(){
	FB.login(function(){
		$('.login-data .btn-login').remove();
		setLoginData();
	}, {scope: 'publish_actions'});
});