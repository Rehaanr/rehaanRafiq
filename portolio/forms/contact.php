<?php

//Import PHPMailer classes into the global namespace

//These must be at the top of your script, not inside a function

use PHPMailer\PHPMailer\PHPMailer;

use PHPMailer\PHPMailer\SMTP;

use PHPMailer\PHPMailer\Exception;

 

//Load Composer's autoloader

require 'vendor/autoload.php';

require 'vendor/phpmailer/phpmailer/src/Exception.php';

require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';

require 'vendor/phpmailer/phpmailer/src/SMTP.php';

//Create an instance; passing `true` enables exceptions

 

$name = strip_tags($_REQUEST['name']);

$email = strip_tags($_REQUEST['email']);

$message = strip_tags($_REQUEST['message']);




$mail = new PHPMailer(true);

 

try {

    //Server settings

    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output

    $mail->isSMTP();                                            //Send using SMTP

    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through

    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication

    $mail->Username   = 'noreplyrehaanrafiq@gmail.com';                     //SMTP username

    $mail->Password   = 'portfolioSite123';                               //SMTP password

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption

    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

 

    //Recipients

    $mail->setFrom('noreplyrehaanrafiq@gmail.com', 'Rehaan Rafiq');

    $mail->addAddress('noreplyrehaanrafiq@gmail.com');     //Add a recipient

    // $mail->addAddress('ellen@example.com');               //Name is optional

    // $mail->addReplyTo('info@example.com', 'Information');

    $mail->addBCC('rehaanrafiq4@gmail.com');

 

    //Content

    $mail->isHTML(true);                     

    //Set email format to HTML

 

    $body = "

    Hi, Rehaan, you have received a message from $name on your portfolio contact page<br/><br/>   

 

    The message is as follow:<br/><br/>

 

    <b>Name:</b> $name<br/><br/>

    <b>Email:</b> $email<br/><br/>

    <b>Message:</b> $message

    ";

 

    $mail->Body    = $body;

    $mail->AltBody = strip_tags($body);

 

    $mail->send();

    echo 'Message has been sent';

} catch (Exception $e) {

    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";

}