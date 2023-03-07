<?php
require_once('config.php');
require_once('functions.php');
$conn = new mysqli($servername, $username, $password, $dbname);

$optimized = array();
$data = array();
$candidates = array();
$occupations = array();

//lowercase all keys, eliminate inconsistency headaches
if(is_array($_GET)) {
    $optimized = optimizer($_GET);
}

$election_id = get_election_id($optimized['constituency'],$optimized['year'],$optimized['month']);
if($election_id):

$candidates = get_candidates_from_election_id($election_id);

if(isset($optimized['job']) == 'pollbook') {
    $voters = get_pollbook_reconstruction($election_id);
} else {
    $voters = get_voter_occupation_distribution(($election_id));
}
$data['data']['elections'][0]['election_id'] = $election_id;
$data['data']['elections'][0]['votes'] = array();
$n=0;
foreach($voters as $d) {
    $data['data']['elections'][0]['votes'][$n]['candidate'] = array(
        'candidate_name'    => $candidates[$d['candidate_id']]['candidate_name'],
        'candidate_id'      => $d['candidate_id'],
        '__typename'        => "candidate"
    );
    $data['data']['elections'][0]['votes'][$n]['voter'] = array(
        'voter_id'              => isset($d['voter_id']) ? $d['voter_id'] : false,
        'guild'                 => isset($d['guild']) ? $d['guild'] : false,
        'suffix_std'            => isset($d['suffix_std']) ? $d['suffix_std'] : false,
        'occupation_std'        => isset($d['occupation_std']) ? $d['occupation_std'] : false,
        'level1'                => isset($d['level1']) ? $d['level1'] : false,
        'level2'                => isset($d['level2']) ? $d['level2'] : false,
        'level_name'            => isset($d['level_name']) ? $d['level_name'] : false,
        'surname'               => isset($d['surname']) ? $d['surname'] : false,
        'forename'              => isset($d['forename']) ? $d['forename'] : false,
        'page'                  => isset($d['page']) ? $d['page'] : false,
        'location_sanitized'    => isset($d['location_sanitized']) ? $d['location_sanitized'] : false,
        'rejected'              => isset($d['rejected']) ? $d['rejected'] : false,
        'reason_rejected'       => isset($d['reason_rejected']) ? $d['reason_rejected'] : false,
        '__typename'        => "voter"
    );
    $data['data']['elections'][0]['votes'][$n]['poll_date'] = isset($d['poll_date']) ? $d['poll_date'] : false;
    $data['data']['elections'][0]['votes'][$n]['rejected'] = isset($d['rejected']) ? $d['rejected'] : false;
    $data['data']['elections'][0]['votes'][$n]['reason_rejected'] = isset($d['reason_rejected']) ? $d['reason_rejected'] : false;
    $data['data']['elections'][0]['votes'][$n]['page'] = isset($d['page']) ? $d['page'] : false;
    $data['data']['elections'][0]['votes'][$n]['line'] = isset($d['line']) ? $d['line'] : false;
    $data['data']['elections'][0]['votes'][$n]['votes_id'] = isset($d['votes_id']) ? $d['votes_id'] : false;
    $data['data']['elections'][0]['votes'][$n]['__typename'] = "vote";
    $n++;
}

endif;
header("Content-Type: application/json");

print json_encode($data,JSON_HEX_QUOT | JSON_HEX_TAG);
$conn->close();
