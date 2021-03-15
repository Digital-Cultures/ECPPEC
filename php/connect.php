<?php
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// // Check connection
if ($conn->connect_errors) {
	echo "no db";
	die("Connection failed: " . $conn->connect_error);
}
echo 'Connected successfully.';

/**
 * POSSIBLE QUERIES
 * 
 * Everything: dump of all tables?
 * Distinct franchise types
 * Distinct elections
 * Distinct constituency
 * Distinct election cause
 * Contested/Not contested
 * Date/Range
 * Candidate
 * Distinct poll book
 * All poll books for one election
 * All poll books, all elections
 * All votes by election(s)
 * All votes by trade per election(s)
 * All votes by guild per election(s)
 * All votes for candidate per election(s)
 * 
 */