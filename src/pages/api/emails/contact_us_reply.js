const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    const body = req.body;
    const message = `
    Hello ${body.full_name},\r\n\r\n

    Thank you for reaching us. 
    \r\n\r\nWe received your message and will get back to you soon on either ${body.email} or ${body.phone}
    \r\n\r\nBest Regards
    \r\nMaket
    `;
    const data = { 
        to: body.email,
        from: "info@maket.ca",
        subject: `Confirmation - Thank you ${body.full_name}`,
        text: message,
        html: message.replace(/\r\n/g, '<br>')
        }
    mail.send(data);
}
