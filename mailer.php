<?php
if ($_GET['type'] == "site") {
  $to = "jface@jonathanface.com";
  $subject = "socknit site submission";
  $message = "A user has requested the following site be added to socknit's filter list\n";
  $message .= $_GET['value'];
  $headers = 'From: socknit suggestion form' . "\r\n" .
    'Reply-To: no-reply@socknit.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
  mail($to, $subject, $message, $headers);
}