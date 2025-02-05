import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "us-west-1" }); 

export const handler = async (event) => {
    try {
        const { name, email, message } = JSON.parse(event.body);

        const params = {
            Source: "klbaskerville0520@gmail.com", // Must be a verified email in SES
            Destination: { ToAddresses: ["klbaskerville0520@gmail.com"] },
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
