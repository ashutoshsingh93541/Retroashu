<?php
// Check if the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Sanitize and grab input data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    // Set the recipient email address
    $recipient = "ashutoshsingh93541@gmail.com";

    // Validate the inputs to prevent blank submissions
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Oops! There was a problem with your submission. Please complete the form and try again.";
        exit;
    }

    // Format the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers
    $email_headers = "From: $name <$email>";

    // Send the email using PHP's mail function
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        // Redirect back to home with a success flag in the URL, or just show a message
        echo "<script>alert('Message sent successfully!'); window.location.href='index.html';</script>";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    // Block direct access to the PHP file
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>