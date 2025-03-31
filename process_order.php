<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Process order and send to email and WhatsApp

// Email configuration
$to_email = "order@herbalhealthcarecentre.org";
$subject = "New Order - XIANHE CT CAPSULE";

// WhatsApp configuration
$whatsapp_number = "254752198022"; // Without '+' or spaces
$admin_whatsapp = "+254752198022"; // For display purposes

// Function to sanitize inputs
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Collect and sanitize form data
$country = sanitize_input($_POST['country'] ?? '');
$quantity = sanitize_input($_POST['quantity'] ?? '');
$amount = sanitize_input($_POST['amount'] ?? '');
$currency = sanitize_input($_POST['currency'] ?? '');
$fullname = sanitize_input($_POST['fullname'] ?? '');
$phone = sanitize_input($_POST['phone'] ?? '');
$whatsapp = sanitize_input($_POST['whatsapp'] ?? '');
$email = sanitize_input($_POST['email'] ?? '');
$address = sanitize_input($_POST['address'] ?? '');
$city = sanitize_input($_POST['city'] ?? '');
$county = sanitize_input($_POST['county'] ?? '');
$instructions = sanitize_input($_POST['instructions'] ?? '');

// Prepare email message
$email_message = "
<html>
<head>
    <title>New Order Received</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .order-details { background: #f9f9f9; padding: 20px; border-radius: 5px; }
        .order-details h2 { color: #2f1c6a; margin-top: 0; }
        .order-item { margin-bottom: 10px; }
        .label { font-weight: bold; color: #4a2f8a; }
    </style>
</head>
<body>
    <div class='order-details'>
        <h2>New Order Details</h2>
        
        <div class='order-item'>
            <span class='label'>Product:</span> XIANHE CT CAPSULE
        </div>
        
        <div class='order-item'>
            <span class='label'>Country:</span> $country
        </div>
        
        <div class='order-item'>
            <span class='label'>Quantity:</span> $quantity
        </div>
        
        <div class='order-item'>
            <span class='label'>Total Amount:</span> $currency $amount
        </div>
        
        <h3>Customer Information</h3>
        
        <div class='order-item'>
            <span class='label'>Full Name:</span> $fullname
        </div>
        
        <div class='order-item'>
            <span class='label'>Phone:</span> $phone
        </div>
        
        <div class='order-item'>
            <span class='label'>WhatsApp:</span> $whatsapp
        </div>
        
        <div class='order-item'>
            <span class='label'>Email:</span> $email
        </div>
        
        <div class='order-item'>
            <span class='label'>Address:</span> $address
        </div>
        
        <div class='order-item'>
            <span class='label'>City/Town:</span> $city
        </div>
        
        <div class='order-item'>
            <span class='label'>County/State:</span> $county
        </div>
        
        <div class='order-item'>
            <span class='label'>Special Instructions:</span> $instructions
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: $email" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

// Try to send email
$email_sent = @mail($to_email, $subject, $email_message, $headers);

// Prepare WhatsApp message for admin
$whatsapp_message = "New Order Received:%0A%0A";
$whatsapp_message .= "*Product:* XIANHE CT CAPSULE%0A";
$whatsapp_message .= "*Country:* $country%0A";
$whatsapp_message .= "*Quantity:* $quantity%0A";
$whatsapp_message .= "*Amount:* $currency $amount%0A%0A";
$whatsapp_message .= "*Customer Info:*%0A";
$whatsapp_message .= "Name: $fullname%0A";
$whatsapp_message .= "Phone: $phone%0A";
$whatsapp_message .= "WhatsApp: $whatsapp%0A";
$whatsapp_message .= "Email: $email%0A";
$whatsapp_message .= "Address: $address, $city, $county%0A";
$whatsapp_message .= "Instructions: $instructions";



// Create WhatsApp link
$whatsapp_link = "https://api.whatsapp.com/send?phone=$whatsapp_number&text=$whatsapp_message";

// Prepare response
$response = [
    'success' => $email_sent,
    'whatsapp_link' => $whatsapp_link,
    'admin_whatsapp' => $admin_whatsapp,
    'message' => $email_sent ? 'Order received successfully!' : 'Error sending email, but you can contact us directly'
];

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>