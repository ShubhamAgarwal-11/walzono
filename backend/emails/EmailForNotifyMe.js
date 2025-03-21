const emailTemplateForNotifyMe = (email) => `
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NotifyMe Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 20px;
        }
        .content {
            font-size: 16px;
            color: #333;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <img class="logo" src="https://res.cloudinary.com/daf7blofc/image/upload/v1742589542/kl2suqvae1x3kp9pqi2x.png" alt="walzono Logo">
        <h2>New NotifyMe Subscription</h2>
        <p class="content">Hello Admin,</p>
        <p class="content">A new user has subscribed to the NotifyMe service.</p>
        <p class="content"><strong>Email:</strong> {email}</p>
        <p class="content">Please take the necessary actions to follow up.</p>
        <p class="footer">&copy; 2025 Walzono. All rights reserved.</p>
    </div>
</body>
</html>
`;