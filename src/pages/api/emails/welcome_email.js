const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    const body = req.body;
    // welcome email to the user after successfully sign up
    const data = { 
        to: body.email,
        from: "info@maket.ca",
        templateId: "d-37b255f7e19c43d48ed7747e80e63a89",
        dynamic_template_data: {
            "first_name": body.name,
            "email": body.email
          }
        }
    mail.send(data);
}
