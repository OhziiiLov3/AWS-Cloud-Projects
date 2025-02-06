### Additional Features to AWS Cloud Project - Hosting a static website
<img src="https://github.com/user-attachments/assets/2eb4b936-9573-4e20-815e-0638b1ebbf01" width="1000">

## Next Feature - Add a Serverless Backend with AWS Lambda, API Gateway, & Amazon SES
- Convert Contact Form to Use AWS Lambda + API Gateway + SES
- When a user submits the form, trigger a Lambda function.
- Use Amazon SES to send an email to your inbox.
Example: Replace action="mailto:" with an API endpoint that triggers the Lambda function.

### Overview
We'll replace the traditional mailto: action in a contact form with a serverless backend using AWS Lambda, API Gateway, and Amazon SES. When a user submits the form, a Lambda function will be triggered via API Gateway to send an email using Amazon SES.
### Why?  

Taking a **loosely coupled** approach aligns with cloud microservices methodology by ensuring each component operates independently, leading to greater flexibility, scalability, and maintainability.  

By replacing a traditional `mailto:` action with **AWS Lambda, API Gateway, and Amazon SES**, we achieve:  

- **Decoupled Functionality** – The frontend and backend communicate via API Gateway, meaning changes to one do not directly impact the other.  
- **Scalability** – Lambda functions automatically scale based on demand, ensuring efficiency without managing servers.  
- **Security & Reliability** – API Gateway provides authentication and request validation, while Amazon SES ensures reliable email delivery.  
- **Cost-Effectiveness** – Serverless components follow a pay-as-you-go model, reducing costs compared to maintaining a persistent backend.  

This modular approach fits within a **cloud-native microservices architecture**, enabling reusable, independent services that enhance agility and reduce operational overhead.

## Step 1: Set Up Amazon SES (Simple Email Service)
1. Verify an Email Address (to send and receive emails via SES)

- Go to AWS SES Console → Verified Identities → Create Identity.
- Select Email Address and enter your email.
- Click Verify and check your inbox for a verification email.
- Confirm your email in the SES console.
2. Move SES Out of Sandbox Mode (Optional for Production)

- By default, SES can only send emails to verified addresses.
- To send emails to anyone, request AWS production access in AWS Support Console.

![Image](https://github.com/user-attachments/assets/59349c0d-793d-4cb8-ac0b-526b99d1ec6e)

## Step 2: Create an AWS Lambda Function
1. Go to AWS Lambda → Click Create Function.
2. Choose Author from Scratch.
- Name: SendContactFormEmail
- Runtime: Node.js 18.x
- Permissions: Create a new IAM role with SES sending permissions.
3. Click Create Function.
### Add SES Permissions to Lambda
1. Open the IAM Console → Find your Lambda's IAM role.
2. Click Add Permissions → Attach Policies → Search for AmazonSESFullAccess → Attach it.
### Add the Lambda Code -
1. In the Lambda function code editor, replace index.js with the following:
```js
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "us-west-1" }); 

export const handler = async (event) => {
    try {
        const { name, email, message } = JSON.parse(event.body);

        const params = {
            Source: "test@gmail.com", // Must be a verified email in SES
            Destination: { ToAddresses: ["test@gmail.com"] },
            Message: {
                Subject: { Data: `New Contact Form Submission from ${name}` },
                Body: { Text: { Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` } }
            }
        };

        const command = new SendEmailCommand(params);
        await sesClient.send(command);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Email sent successfully!" })
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Failed to send email" })
        };
    }
};
```
4. Click Deploy.
5. Test - click on Test tab and copy and paste into Event JSON
```json
{
  "body": "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"message\":\"Hello!\"}"
}
```
![Image](https://github.com/user-attachments/assets/db9d25fd-7dd2-4124-ba78-c14428031971)

### Step 3: Create an API Gateway to Trigger Lambda
1. Go to AWS API Gateway → Create API.
2. Choose HTTP API → Click Build.
3. Name it ContactFormAPI.
4. Click Add Integration → Choose Lambda Function → Select SendContactFormEmail.
5. Click Next and create a POST method for /send-email.
6. Choose New Stage (e.g., prod for production), then click Deploy.→ Copy the Invoke URL (e.g., https://xyz.execute-api.us-east-1.amazonaws.com/send-email).

Copy this URL as you’ll need it to make requests to your Lambda function.

![Image](https://github.com/user-attachments/assets/28b4a7f8-36a4-4b79-897f-a15f9244e6cf)

### Step 4: Connect Your Contact Form to the API
```js
document.querySelector(".contact-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    try {
        const response = await fetch("https://16ejwbl257.execute-api.us-west-1.amazonaws.com/prod/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data); 

        if (response.ok && data.message && data.message === "Email sent successfully!") {
            showSuccessMessage("Message sent successfully!");
            e.target.reset();
        } else {
            const errorMsg = data.error || "Failed to send message. Please try again.";
            showErrorMessage(errorMsg);
        }
        
    } catch (error) {
        console.error("Error:", error);
        showErrorMessage("An error occurred. Check your connection.");
    }
});
```
🔹 Replace "https://your-api-id.execute-api.us-east-1.amazonaws.com/send-email" with your actual API Gateway URL.
✅ Test your form: Submit it and check if you receive the email.
✅ Verify your SES email: If SES is in "sandbox mode," verify both sender & receiver emails.

# Bugs
🔧 Fix CORS in API Gateway
1️⃣ Enable CORS for Your API
1. Go to AWS API Gateway.
2. Select your API (ContactFormAPI).
3. Click on Routes → POST /send-email.
-Click CORS (top-right corner).
4. Update the following settings:
- Access-Control-Allow-Origin → * (or your frontend domain)
- Access-Control-Allow-Methods → POST, OPTION
- Access-Control-Allow-Headers → Content-Type
- Access-Control-Allow-Credentials → YES
Click Enable CORS and then Deploy API again.
### Submit Form
![Image](https://github.com/user-attachments/assets/ceac2e10-263d-4787-ba48-2488dfe7fcad)

### Complete ✅
![Image](https://github.com/user-attachments/assets/4ccf1855-9806-4fcd-a16f-1948280f3dd2)