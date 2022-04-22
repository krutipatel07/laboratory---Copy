const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    const body = req.body;
    // email to the collaborator when our user invite collaborator to join a design
    const data = { 
        to: body.email,
        from: "info@maket.ca",
        templateId: "d-05c2663ead5545399d492cca87dbf9de",
        dynamic_template_data: {
            "name" : body.email.split("@")[0],
            "url": `https://platform.maket.ai/workspace/collaborator?invite=true&projectId=${body.projectId}&designId=${body.designId}`
          }
        }
    mail.send(data);
    // return await mail.send(data).then(() => {}, console.error);
}
