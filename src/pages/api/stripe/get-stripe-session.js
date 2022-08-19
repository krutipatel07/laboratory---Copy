const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function RetrieveSession(req, res) { 
    // get details of the session using checkout session id   
    const {session_id, user} = req.body;
    const retrieve_session = await stripe.checkout.sessions.retrieve(
        session_id
    );

    const stripe_customer_details = {
        user_id: user,
        customer_id : retrieve_session.customer,
        email : retrieve_session.customer_email,
        subscription_id : retrieve_session.subscription
    }
  res.json(stripe_customer_details);
}

export default RetrieveSession