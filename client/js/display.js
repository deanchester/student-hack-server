$(document).ready(function() {

	console.log('Ready');

	$('#banner').css('height', $(window).height());
	$('#menu').css('height', $(window).height());

	$('#activate').click(function () {
		console.log("activate");
    	$('html, body').animate({
        	scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
    	}, 500);
    	return false;
	});

	//setInterval(changeBackground, 5000);

});

$(window).resize(function() {

	$('#banner').css('height', $(window).height());
	$('#menu').css('height', $(window).height());

});

function changeBackground() {

}