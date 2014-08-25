$(document).ready(function() {

    var search_button = localStorage.getItem('search_button');
    if (search_button === 'fixed') {
        $('header #search-bar button').css('float', 'right');
    }
    
    var validators = localStorage.getItem('validators');
    if(validators === 'fixed') {
        $('footer .contacts .validators').show();
    }
});