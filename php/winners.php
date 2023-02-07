<?php
//mysqli_set_charset("utf8");
require_once('config.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error > 0) {
    echo "no db";
    die("Connection failed: " . $conn->connect_error);
}
$inserted = 0;
$sql = "select * from voting_days";
$data = get_it($sql);
debug($data); exit;
$sql = "INSERT IGNORE INTO election_attributes (election_id, attribute_name, attribute_value, created) VALUES (?,?,?,?)";
foreach($data as $d) {
    $election_id = $d['election_id'];
    for($i=1; $i<60; $i++) {
        $field = 'Day_' . $i;
        if($d[$field] != '0000-00-00' && !is_null($d[$field])) {
            $values = array($election_id, 'voting_day', $d[$field], 'now()');
            if(insert($sql,$values)) {
                $inserted++;
            }
        }
    }
}
print $inserted . " rows inserted";
exit;
$updated = $deleted = 0;

$sql = "select * from ce where election_id in (select distinct election_id from candidates_elections)";
$data = get_it($sql);
foreach($data as $d) {
    $new_election_ids[$d['election_id']] = $d['election_id'];

    $new[$d['election_id']][$d['candidate_id']] = array(
        "returned" => $d['returned'],
        "seated" => $d['seated'],
        "overturned_by" => $d['overturned_by'],
        "running_as" => $d['running_as']
    );
}
$sql = "select * from candidates_elections";
$data = get_it($sql);
$ok = $not_ok = 0;
foreach($data as $d) {
    $old_election_ids[$d['election_id']] = $d['election_id'];
    $old[$d['election_id']][$d['candidate_id']] = array(
        "returned" => $d['is_winner'],
        "seated" => $d['ultimate_winner'],
        "overturned_by" => $d['overturned_by'],
        "running_as" => $d['running_as']
    );
}
$diffs = array();
foreach($old as $election_id => $candinfo) {
    foreach($candinfo as $candidate_id => $oldinfo) {
        if(isset($new[$election_id][$candidate_id])) {
            $newinfo = $new[$election_id][$candidate_id];
            if($oldinfo['running_as'] != $newinfo['running_as']
                //|| $oldinfo['seated'] != $newinfo['seated']
                //$oldinfo['overturned_by'] != $newinfo['overturned_by'] ||
                //$oldinfo['running_as'] != $newinfo['running_as'])
            ) {
                    print "new $election_id: $candidate_id";
                debug($newinfo);
                print "old $election_id: $candidate_id";
                debug($oldinfo);
                $not_ok++;
            } else $ok++;
        }
    }
}

print "$ok ok, $not_ok not ok";
exit;

foreach($diffs as $election_id => $thingy) {
    foreach($thingy as $candidate_id) {
    $sql = "select candidate_id, candidate_name, source from candidates 
            where candidate_name = (
                select candidate_name from candidates where 
                candidate_id = $candidate_id)
                order by candidate_id";
    $data = get_it($sql);
    if (count($data)== 2) {
        if(empty($data[0]['source']) && $data[1]['source'] == 'james') {
            $update = "update ce set candidate_id = ? where candidate_id = ?";
            $update_values = array($data[0]['candidate_id'], $data[1]['candidate_id']);
            if(update($update,$update_values)) {
                $updated++;
                $delete = "delete from candidates where candidate_id = ?";
                $delete_values = array($data[1]['candidate_id']);
                if(update($delete,$delete_values)) $deleted++;
            }
        }
    }
}
}
print $updated . " rows updated in ce and " . $deleted . " rows deleted from candidates";
exit;
$inserts = 0;
$sql = "select * from election_attributes order by election_id, attribute_name, attribute_value";
$rows = get_it($sql);
$data = array();
foreach($rows as $row) {
    $data[$row['election_id']][$row['attribute_name']][] = $row['attribute_value'];
}
$candidates = $candidate_ids = 0;
$blanks = array();
foreach($data as $election_id => $d) {
    foreach($d['candidate'] as $c) {
        $candidates++;
        $candidate_id = null;
        $sql = "select candidate_id from new_candidates where full_name = ?";
        $values = array($c);
        $c2 = get_it($sql,$values);
        //debug($c2);
        if(is_array($c2)) {
            $candidate_id = isset($c2[0]['candidate_id']) ? $c2[0]['candidate_id'] : null;
        }
        if($candidate_id) {
            $candidate_ids++;
        } else {
            $sql = "select candidate_id from candidates where candidate_name = ?";
            $c2 = get_it($sql,$values);
            $candidate_id = isset($c2[0]['candidate_id']) ? $c2[0]['candidate_id'] : null;
            if($candidate_id) {
                $candidate_ids++;
            } else {
                $blanks[$c] = $c;
            }
        }
        $is_winner = isset($d['returned']) && in_array($c,$d['returned']) ? 1 : 0;
        $ultimate_winner = isset($d['seated']) && in_array($c,$d['seated']) ? 1:0;
        $running_as = running_as($c);
        $overturned_by = null;
        if(isset($d['quirk'])) {
            if($is_winner != $ultimate_winner) {
                $overturned_by = implode("; ",$d['quirk']);
            }
        }
        $ce_sql = "insert ignore into ce (election_id, candidate_id, running_as, is_winner, ultimate_winner, overturned_by) 
values (?, ?, ?, ?, ?, ?)";
        $ce_values = array($election_id, $candidate_id, $running_as, $is_winner, $ultimate_winner, $overturned_by);

         if(insert($ce_sql,$ce_values) !== false) {
            $inserts++;
        }
    }
}

print $inserts . " rows inserted into table ce";

exit;

function running_as($name) {
    $comma = trim(strpos($name,","));
    $ra = null;
    if($comma) {
        $ra = trim(substr($name,$comma+1));
    }
    if($ra == 'Bt.') $ra = null;
    return $ra;
}

$sql = "select * from new_candidates where candidate_id is null";
$rows = get_it($sql);
$inserts = $updates = 0;
foreach($rows as $row) {
    $id = false;
    $short_name = short_name($row['my_name']);
    //print $row['my_name'] . " : " . $short_name . "<br>";
    $title = substr($row['full_name'],0,3) == "Sir" ? "Sir" : null;
    $suffix = strpos($row['full_name'],'Bt.') ? "Baronet" : null;
    $sql = "insert into candidates (source, candidate_name, short_name, title, suffix) values (?,?,?,?,?)";
    $values = array('james',$row['my_name'],$short_name,$title,$suffix);
    $id = insert($sql,$values);
    if($id) $inserts++;
    $sql = "update new_candidates set candidate_id = ? where id = ?";
    $values = array($id, $row['id']);
    if(update($sql,$values)) {
        $updates++;
    }
    //debug($values);
}
print $inserts . " candidates inserted, " . $updates . " candidate_ids updated";
exit;

function short_name($name) {
    $last = strrpos($name," ");
    $short_name = trim(substr($name, $last));
    if(preg_match('/^I+$/',$short_name) || strpos($short_name,")")) {
        $next_to_last = strrpos($name," ", $last - strlen($name)-1);
        $short_name = substr($name,$next_to_last);
    }
    return trim($short_name);
}


$candidate_max = 15;
$returned_max = $seated_max = 4;

$sql = "select * from all_winners";
$rows = get_it($sql);
$sql = "insert into election_attributes (election_id, attribute_name, attribute_value) values (?,?,?)";
$rows_inserted = 0;


print $rows_inserted . " rows inserted";

foreach($rows as $row) {
    $c = $r = $s = 1;
    $election_id = (empty($row['election_id'])) ? $row['constituency']."_".$row['year'] : $row['election_id'];

    /* candidates */
    while($c <= $candidate_max) {
        $field = "candidate_" . $c;
        if(!empty($row[$field])) {
            $values = array($election_id, "candidate", $row[$field]);
            insert($sql,$values);
            $rows_inserted++;
        }
        $c++;
    }

    /* returned */
    while($r <= $returned_max) {
        $field = "returned_" . $r;
        if(!empty($row[$field])) {
            $values = array($election_id, "returned", $row[$field]);
            insert($sql,$values);
            $rows_inserted++;
        }
        $r++;
    }

    /* seated */
    while($s <= $seated_max) {
        $field = "seated_" . $s;
        if(!empty($row[$field])) {
            $values = array($election_id, "seated", $row[$field]);
            insert($sql,$values);
            $rows_inserted++;
        }
        $s++;
    }

    /* double return? */
    if(!empty($row['double_return'])) {
        $values = array($election_id, "quirk", "double return");
        insert($sql,$values);
        $rows_inserted++;
    }

    /* other quirks */
    $quirk = quirks($row);
    if(!empty($quirk)) {
        $values = array($election_id, "quirk", $quirk);
        insert($sql,$values);
        $rows_inserted++;
    }
}

print $rows_inserted . " rows inserted";
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