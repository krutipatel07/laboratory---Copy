

const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    const {full_name, company_name, email, phone, company_size, team, message} = req.body;
    const final_message = `
    Full Name: ${full_name}\r\n
    Company Name: ${company_name}\r\n
    Email: ${email}\r\n
    Phone: ${phone}\r\n\
    Company Size: ${company_size ? company_size : "Not mentioned"}\r\n
    Team: ${team ? team : "Not mentioned"}\r\n\r\n

    Message: ${message}\r\n
    `;
    const data = { 
        to: "info@maket.ca",
        from: "info@maket.ca",
        subject: `${full_name.toUpperCase()} sent you a message`,
        text: final_message,
        html: final_message.replace(/\r\n/g, '<br>')
        }
    mail.send(data);
}

