<?php
  header('Content-Type: application/json');
  echo json_encode(array(
    'day' => date('j'),
    'month' => date('n'),
    'year' => date('Y')
  ));
?>
