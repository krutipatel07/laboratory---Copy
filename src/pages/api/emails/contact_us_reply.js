const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    const body = req.body;
    const data = { 
        to: body.email,
        from: "info@maket.ca",
        templateId: "d-c723edfbd317444fbd149fbbcdccdc46",
        dynamic_template_data: {
            "name": body.full_name,
            "email": body.email,
            "phone": body.phone
          }
        }
    mail.send(data);
}
