
$(document).ready(function() {
    $('header .responsive-button').click(function() {
        var nav_status = $(this).attr('id');

        if (nav_status === 'closed') {
            $(this).attr('id', 'open');
            $('section.responsive-nav').animate({width: '50%'}, 200);
            $('.console-button').animate({right: '50%'}, 200);
            $('header, main, footer').css('position', 'relative').animate({left: '-50%'}, 200);
            $('header .logo').css('float', 'right').css('margin-right', '20px');
            if (su_mood === 1) {
                $('header .logo img').attr('src', 'images/softuni-logo-resp.png');
            } else {
                $('header .logo img').attr('src', 'images/softuni-logo-bad-mood-resp.png');
            }
        } else {
            $(this).attr('id', 'closed');
            $('section.responsive-nav').animate({width: '0%'}, 200);
            $('header, main, footer').css('position', 'relative').animate({left: '0'}, 200);
            $('.console-button').animate({right: '10px'}, 200);
            $('header .logo').css('float', 'left').css('margin-right', '0');
            if (su_mood === 1) {
                $('header .logo img').attr('src', 'images/softuni%20logo.png');
            } else {
                $('header .logo img').attr('src', 'images/softuni-logo-bad-mood.png');
            }
        }
    });
});

window.onresize = function(e) {
    var width = $(window).width();
    var height = $(window).height();
    var nav_status = $('header .responsive-button').attr('id');

    if (width >= 1100 && nav_status === 'open') {
        $('.console-button').css('right', '10px');
        $('header .responsive-button').attr('id', 'closed');
        $('header .logo').css('float', 'left').css('margin-right', '0');
        if (su_mood === 1) {
            $('header .logo img').attr('src', 'images/softuni%20logo.png');
        } else {
            $('header .logo img').attr('src', 'images/softuni-logo-bad-mood.png');
        }
    }

    if (height < 560) {
        $('.responsive-nav').css('overflow-y', 'scroll');
    } else {
        $('.responsive-nav').css('overflow-y', 'hidden');
    }
};