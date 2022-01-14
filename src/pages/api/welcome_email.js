const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    const body = req.body;
    const message = `
    Hello ${body.name},\r\n\r\n

    Thank you for signing up to keep in touch with Maket. 
    \r\n\r\nFrom now on, you can work on our website using ${body.email} and your password . And since you are our valued user of our services, you can also invite your family members, friends or your professional partner to access collaborative platform.
    \r\n\r\nIn the mean time, get started with us and get a jump to create a new project.
    \r\n\r\nBest Regards
    \r\nMaket
    `;
    const data = { 
        to: body.email,
        from: "info@maket.ca",
        subject: `Welcome ${body.name}`,
        text: message,
        html: message.replace(/\r\n/g, '<br>')
        }
    mail.send(data);
}
