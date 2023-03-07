<?php
require_once('config.php');
require_once('functions.php');
$conn = new mysqli($servername, $username, $password, $dbname);

$optimized = array();
$rows = array();
$keys = array();
$data = array();
$candidates = array();

//lowercase all keys, eliminate inconsistency headaches
if(is_array($_GET)) {
    $optimized = optimizer($_GET);
}

$election_id = get_election_id($optimized['constituency'],$optimized['year'],$optimized['month']);

if($election_id):
$candidates = get_candidates_from_election_id($election_id);
$occupations = get_voter_occupation_distribution($election_id);
$data['data']['elections'][0]['election_id'] = $election_id;
$data['data']['elections'][0]['votes'] = array();
$n=0;
foreach($occupations as $d) {
    $data['data']['elections'][0]['votes'][$n]['candidate'] = array(
        'candidate_name'    => $candidates[$d['candidate_id']]['candidate_name'],
        'candidate_id'      => $d['candidate_id'],
        '__typename'        => "candidate"
    );
    $data['data']['elections'][0]['votes'][$n]['voter'] = array(
        'voter_id'          => $d['voter_id'],
        'guild'             => $d['guild'],
        'suffix_std'        => $d['suffix_std'],
        'occupation_std'    => $d['occupation_std'],
        'level1'            => $d['level1'],
        'level2'            => $d['level2'],
        'level_name'        => $d['level_name'],
        '__typename'        => "voter"
    );
    $data['data']['elections'][0]['votes'][$n]['poll_date'] = $d['poll_date'];
    $data['data']['elections'][0]['votes'][$n]['rejected'] = $d['rejected'];
    $data['data']['elections'][0]['votes'][$n]['__typename'] = "vote";
    $n++;
    //$data[$d['candidate_id']][] = $d;
    //$keys[$d['candidate_id']] = $d['candidate_id'];
}

/*
foreach($keys as $candidate_id) {
    $candidates[$candidate_id]['voters'] = $data[$candidate_id];
}
*/
endif;
header("Content-Type: application/json");

print json_encode($data,JSON_HEX_QUOT | JSON_HEX_TAG);
$conn->close();
