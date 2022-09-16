import dbConnect from "../../../utils/dbConnect";
import authenticatedUser from "../../../utils/authUser";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

dbConnect();

async function RetrieveSession(req, res) {
  const authUser = await authenticatedUser(req);
  if (authUser) {
    // get details of the session using checkout session id
    const {session_id, user} = req.body;
    const retrieve_session = await stripe.checkout.sessions.retrieve(session_id);
    const stripe_customer_details = {
      user_id: user,
      customer_id: retrieve_session.customer,
      email: retrieve_session.customer_email,
      subscription_id: retrieve_session.subscription
    }

    res.json(stripe_customer_details);
  } else {
    res.status(401).json({success: false});
  }
}

export default RetrieveSession