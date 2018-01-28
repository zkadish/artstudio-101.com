
<?php
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $serect = '6LePYSAUAAAAAKav_Jh5QC6kMdwHndfGT8baIgVh';
    $recaptcha = $_POST['recaptcha'];
    $data = array('secret' => $serect, 'response' => $recaptcha);

    $options = array(
      'http' => array(
        'header' => 'Content-type: application/x-www-form-urlencoded\r\n',
        'method' => 'POST',
        'content' => http_build_query($data)
      )
    );
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    if ($result['success'] == true) {

      $to = "artstudio101@hotmail.com";
      // $to = "zachkadish@gmail.com";

      $subject = "artstudio-101.com has recieved an inquiry(contact us)";
      $full_name = $_POST['full_name'];
      $company_name = $_POST['full_company'];
      $email_address = $_POST['email'];
      $email_subject = $_POST['subject'];
      $email_message = $_POST['message'];

      $body = "\n From: $full_name" .
              "\n Company: $company_name" .
              "\n E-Mail: $email_address" .
              "\n Subject: $email_subject" .
              "\n Message: $email_message";

		  mail($to, $subject, $body);

		  // echo "Data has been submitted to $to!";
    } else {
      // do nothing
    }

    // var_dump($result);
?>
