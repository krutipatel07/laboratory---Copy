const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    const body = req.body;
    const message = `
    Hello ${body.email.split("@")[0]},\r\n

    Join our collaborative workspace using the link below.\r\n\r\n

    https://laboratory-riyd1dwgd-maket-development.vercel.app/workspace/collaborator?invite=true&projectId=${body.projectId}&designId=${body.designId}
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
