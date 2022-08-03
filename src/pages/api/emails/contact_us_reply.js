<<<<<<< HEAD

=======
// import { withSentry } from '@sentry/nextjs';
>>>>>>> b394225fbbc915b0a529f4a0357be118841a4838

const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    const body = req.body;
    // email reply to the user once they have submitted the contact us form
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
<<<<<<< HEAD
=======

export default ContactUsReply;
>>>>>>> b394225fbbc915b0a529f4a0357be118841a4838
