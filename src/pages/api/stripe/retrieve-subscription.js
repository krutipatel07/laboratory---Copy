import authenticatedUser from "../../../utils/authUser";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function RetrieveSubscription(req, res) {
  const user = await authenticatedUser(req);
  if (user) {
    // retrieve subscription details using subscription id and return its status i.e, cancelled or active
    const {subscription_id} = req.body
    const retrieve_subscription = await stripe.subscriptions.retrieve(subscription_id);
    const subscription_details = {
      subscription_id : retrieve_subscription.id,
      customer_id : retrieve_subscription.customer,
      plan : retrieve_subscription.plan.id,
      status : retrieve_subscription.status
    }
    res.json(subscription_details);
  } else {
    res.status(401).json({success: false});
  }
}

export default RetrieveSubscription