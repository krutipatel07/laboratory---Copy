const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    const body = req.body;
    const message = `
    Hello ${body.email.split("@")[0]},\r\n

    Join our collaborative workspace using the link below.\r\n\r\n

    https://laboratory-nbezeuqqc-maket-development.vercel.app/workspace/61aa918c1ea0179c90a72964?designId=61cb6370ca03e0ca148643e9
    `;
    const data = { 
        to: body.email,
        from: "info@maket.ca",
        subject: "Join collaborative workspace",
        text: message,
        html: message.replace(/\r\n/g, '<br>')
        }
    mail.send(data);
    // return await mail.send(data).then(() => {}, console.error);
}
