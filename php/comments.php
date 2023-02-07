<?php
//mysqli_set_charset("utf8");
require_once('config.php');
exit;
error_reporting(E_ALL);
ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error > 0) {
    echo "no db";
    die("Connection failed: " . $conn->connect_error);
}
$inserted = 0;
$sql = "select * from comments_etc";
$data = get_it($sql);
//debug($data); exit;



$sql = "REPLACE INTO votes_test (election_id, voter_id, candidate_id, constituency_id, rejected, reason_rejected) VALUES (?,?,?,?,?,?)";
$voter_id = '';
foreach($data as $d) {
    $election_id = $d['rejected'];
    if(empty($election_id)) continue;
    $table = "z_" . strtolower($election_id) . "_temp";
    $rejected_field = (empty($d['field_if_not_rejected'])) ? 'rejected' : $d['field_if_not_rejected'];
    $reason_field = $d['reason'];
    $vote_fields = "c.vote1";
    $constituency = $d['constituency'];
    $constituency_id = $d['constituency_id'];

    $q = "show columns from $table where field like 'vote%'";
    $v = get_it($q);
    if(count($v) == 2) {
        $vote_fields .= ", c.vote2";
    }
    //print $vote_fields . "<br>";
    //print "$table , $rejected_field, $reason_field<br>";
    if(empty($reason_field)) {
        $query = "select v.voter_id, $vote_fields from $table c 
       join voters v on v.orig_id = c.orig_id where `$rejected_field` != ''";
    } else {
        $query = "select v.voter_id, c.$reason_field 'reason_rejected', $vote_fields from $table c 
        join voters v on v.orig_id = c.orig_id where `$rejected_field` != ''";
    }

    //print $query . "<br>";
    $rejections = get_it($query);

    foreach($rejections as $election) {
        $reason_rejected = (isset($election['reason_rejected']) && !empty($election['reason_rejected'])) ? $election['reason_rejected'] : null;
        $vote1 = (empty($election['vote1'])) ? null : $election['vote1'];
        $vote2 = (isset($election['vote2']) && !empty($election['vote2'])) ? $election['vote2'] : null;
        $values = array($election_id,$election['voter_id'], $vote1, $constituency_id, 1, $reason_rejected);
        if(insert($sql,$values)) $inserted++;
        if($vote2) {
            $values = array($election_id,$election['voter_id'], $vote2, $constituency_id, 1, $reason_rejected);
            if(insert($sql,$values)) $inserted++;
        }
    }
}
print $inserted . " rows inserted";

function debug($rows) {
    print "<pre>";
    print_r($rows);
    print "</pre>";
}
function get_and_print($sql) {
    $rows = get_it($sql);
    debug($rows);
}

function insert($sql,$values) {
    global $conn;
    $stmt = $conn->prepare($sql); // prepare
    $n = count($values);
    if ($n) {
        $types = str_repeat('s', $n); //types
        $stmt->bind_param($types, ...$values); // bind array at once
    }
    $stmt->execute();
    return $stmt->insert_id;
    //return $stmt->get_result(); // get the mysqli result
}

function update($sql,$values) {
    global $conn;
    $stmt = $conn->prepare($sql); // prepare
    $n = count($values);
    if ($n) {
        $types = str_repeat('i', $n); //types
        $stmt->bind_param($types, ...$values); // bind array at once
    }
    return $stmt->execute();
}
function get_it($sql,$values=null)
{
    global $conn;
    $stmt = $conn->prepare($sql); // prepare
    if(is_array($values)) {
        $n = count($values);
        $types = str_repeat('s', $n);
        $stmt->bind_param($types, ...$values);
    }
    $stmt->execute();
    $result = $stmt->get_result(); // get the mysqli result
    return $result->fetch_all(MYSQLI_ASSOC); // fetch the data

}

function quirks($row) {
    if(strtolower($row['on_petition']) == 'y') {
        return "initial result overturned on petition";
    } elseif (strtolower($row['declared_void']) == 'y') {
        return "election declared void";
    } elseif (strtolower($row['declared_incapable_of_sitting']) == 'y') {
        return "candidate winning the vote declared incapable of sitting";
    } else return false;
}