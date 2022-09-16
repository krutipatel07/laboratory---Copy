import authenticatedUser from "../../../utils/authUser";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CancelSubscription(req, res) {
  const user = await authenticatedUser(req);
  if (user) {
    // cancels stripe subscription using subscription id
    const {subscription_id} = req.body;
    const deleted = await stripe.subscriptions.del(subscription_id);
    res.json({ status: deleted.status });
  } else {
    res.status(401).json({success: false});
  }
}

export default CancelSubscription