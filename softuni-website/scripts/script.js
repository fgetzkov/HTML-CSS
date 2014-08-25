
window.su_mood = Math.floor((Math.random() * 2) + 1);

$(document).ready(function() {

    for (var key in localStorage) {
        var value = localStorage[key];
        console.log(key + ": " + value);
    }

    if (su_mood === 2) {
        $('header a img').attr('src', 'images/softuni-logo-bad-mood.png');

        var link = document.createElement('link'),
                oldLink = document.getElementById('dynamic-favicon');
        link.id = 'dynamic-favicon';
        link.rel = 'shortcut icon';
        link.href = 'images/favicon-bad.ico';
        if (oldLink) {
            document.head.removeChild(oldLink);
        }
        document.head.appendChild(link);
    }

    resizeConsoleInput();
    window.onresize = function(e) {
        resizeConsoleInput();
    }

    var responsive = localStorage.getItem('responsive');
    if (responsive === 'on') {
        $('head').append('<link rel="stylesheet" href="styles/responsive.css" type="text/css" />');
        $('head').append('<script src="scripts/responsive.js"></script>');
    }

    var console_status = localStorage.getItem('console');
    if (console_status === 'open') {
        $('.console').css('height', '300px');
        $('.console-button').css('top', '300px');
        $('.console input').focus();
    }

    var console_history = getConsoleHistory();
    if (console_history) {
        $('.console p').html(console_history);
    }

    $('.console-button').click(function() {

        var cons = $('.console');
        var console_status = localStorage.getItem('console');

        if (!console_status || console_status === 'closed') {
            cons.animate({height: '300px'}, 300);
            localStorage.setItem('console', 'open');
            $(this).animate({top: '300px'}, 300);
            $('.console input').focus();
        } else {
            cons.animate({height: '0'}, 300);
            localStorage.setItem('console', 'closed');
            $(this).animate({top: '0'}, 300);
        }
    });

    $('.console').click(function() {
        $('.console input').focus();
    });


    $('.arrows span').click(function() {

        var bug = localStorage.getItem('forum_vote');
        var voted = localStorage.getItem('last_vote');

        var button = $(this).attr('id');
        var pts = $('.pts .post-pts').html();
        var points = parseInt(pts);

        if (button === 'unvote') {
            if (voted === 'up') {
                points--;
            } else {
                points++;
            }
            $(this).hide();
            showw('.arrows .arrow');
            localStorage.removeItem('last_vote');
        } else {
            if (button === 'up') {
                points++;
                localStorage.setItem('last_vote', 'up');
            } else {
                points--;
                localStorage.setItem('last_vote', 'down');
            }

            if (bug === 'fixed') {
                $('.arrows .arrow').hide();
                showw('.arrows .unvote');
            }
        }
        $('.pts .post-pts').html(points);
        localStorage.setItem('votes', points);

    });



    window.onkeypress = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;

        if (key === 13) {
            if ($('.console input').is(':focus')) {
                var command = $('.console input').val();
                localStorage.setItem('last_command', command);
                var cmd = command.split(' ');

                if (command === '') {
                    addConsoleHistory('SoftUni> ');
                } else {
                    addConsoleHistory('SoftUni> ' + command);

                    $.ajax({
                        url: 'commands.php'
                    }).done(function(data) {

                        var comm_found = false;
                        var c = command.split(' ');
                        var cmd, option, supc;
                        if (c[0] === 'sup') {
                            supc = c[0];
                            cmd = c[1];
                            option = c[2];
                        } else {
                            cmd = c[0];
                            option = c[1];
                        }
                        var available_bugs = new Array();
                        var available_bugs_str = '';

                        $.each(data['commands'], function(k, com) {
                            if (com === cmd) {
                                comm_found = true;
                            }
                        });

                        $.each(data['bugs_list'], function(k, bug) {
                            var b = localStorage.getItem(bug);

                            if (!b) {
                                available_bugs[k] = bug;
                                available_bugs_str += '<br/> - ' + bug;
                            }
                        });

                        if (comm_found === true && (su_mood === 1 || supc === 'sup')) {
                            switch (cmd) {
                                case 'help':
                                    var commands_list = '';
                                    $.each(data['commands'], function(k, com) {
                                        if (com !== 'help') {
                                            commands_list += '<br/> - ' + com;
                                        }
                                    });
                                    addConsoleHistory('Commands list: ' + commands_list);
                                    break;
                                case 'bugfix':
                                    if (typeof option !== 'undefined') {
                                        var bug_name = c[(c.length) - 1];

                                        var bug_fixed = true;
                                        $.each(available_bugs, function(k, bug) {
                                            if (bug_name === bug) {
                                                bug_fixed = false;
                                            }
                                        });

                                        if (bug_fixed === false) {
                                            localStorage.setItem(bug_name, 'fixed');
                                            location.reload();
                                        } else {
                                            addConsoleHistory('There are no bug \'' + bug_name + '\'.');
                                        }
                                    } else {
                                        addConsoleHistory('Missing name (' + cmd + ' &#60;name&#62;)');
                                    }
                                    break;
                                case 'bugcheck':
                                    if (typeof option !== 'undefined') {
                                        var bug_name = c[(c.length) - 1];

                                        var bug_fixed = localStorage.getItem(bug_name);

                                        if (bug_fixed === 'fixed') {
                                            addConsoleHistory('Bug \'' + bug_name + '\' is fixed.');
                                        } else {
                                            var is_bug = false;
                                            $.each(data['bugs_list'], function(l, bug) {
                                                if (bug_name === bug) {
                                                    is_bug = true;
                                                }
                                            });

                                            if (is_bug === true) {
                                                addConsoleHistory('Bug \'' + bug_name + '\' is not fixed.');
                                            } else {
                                                addConsoleHistory('There are no bug \'' + bug_name + '\'');
                                            }
                                        }
                                    } else {
                                        addConsoleHistory('Missing name (' + cmd + ' &#60;name&#62;)');
                                    }
                                    break;
                                case 'bugslist':
                                    addConsoleHistory('List of bugs:' + available_bugs_str);
                                    break;
                                case 'clear':
                                    if (option === 'cache') {
                                        for (var key in localStorage) {
                                            localStorage.removeItem(key);
                                        }
                                        location.reload();
                                    } else {
                                        localStorage.removeItem('console_history');
                                        $('.console p').html('');
                                    }
                                    break;
                                case 'js':
                                    if (typeof option !== 'undefined') {
                                        addConsoleHistory(command);
                                        $('.console input').val('');
                                        var js;
                                        if (supc === 'sup') {
                                            js = command.substr(6, (command.length - 3));
                                        } else {
                                            js = command.substr(3, (command.length - 3));
                                        }
                                        $('footer').before('<script>' + js + '</script>');
                                    } else {
                                        addConsoleHistory('Missing script (' + cmd + ' &#60;script&#62;)');
                                    }
                                    break;
                                case 'responsive':
                                    var resp = localStorage.getItem('responsive');
                                    if (!resp) {
                                        resp = 'off';
                                    }

                                    if (typeof option !== 'undefined') {
                                        if (option === 'on') {
                                            localStorage.setItem('responsive', 'on');
                                            $('head').append('<script src="scripts/responsive.js"></script>');
                                            $('head').append('<link rel="stylesheet" href="styles/responsive.css" type="text/css" />');
                                            location.reload();
                                        } else if (option === 'off') {
                                            localStorage.setItem('responsive', 'off');
                                            $('head').append('<script src="scripts/responsive.js"></script>').remove();
                                            $('head').append('<link rel="stylesheet" href="styles/responsive.css" type="text/css" />').remove();
                                            location.reload();
                                        } else {
                                            addConsoleHistory('Invalid parameter.');
                                        }
                                    } else {
                                        addConsoleHistory('Responsive is ' + resp + '.');
                                    }
                                    break;
                                default:
                                    addConsoleHistory('\'' + command + '\' is not recognized as an internal or external command.');
                            }
                        } else {
                            addConsoleHistory('\'' + command + '\' is not recognized as an internal or external command.');
                        }

                    });
                }

                $('.console input').val('');
            }
        } else if (key === 38) {
            var last_command = localStorage.getItem('last_command');
            $('.console input').val(last_command);
        }
    };

});

function showw(e) {
    $(e).css('display', 'inline-block');
}

function getConsoleHistory() {
    return localStorage.getItem('console_history');
}

function addConsoleHistory(new_row) {
    var console_history = getConsoleHistory();

    var full_history = '';
    if (console_history) {
        full_history = console_history + '<br/>' + new_row;
    } else {
        full_history = new_row;
    }

    localStorage.setItem('console_history', full_history);
    $('.console p').html(full_history);
}

function resizeConsoleInput() {
    var width = $(window).width();

    var inpWidth = width - 110;

    $('.console input').css('width', inpWidth);
}