<?php
header('Content-type: application/json');

$data['commands'] = array(
    'help',
    'bugfix',
    'bugcheck',
    'bugslist',
    'clear',
    'js',
    'responsive'
);

$data['bugs_list'] = array(
    'forum_vote',
    'search_button',
    'validators'
);

echo json_encode($data);
die;