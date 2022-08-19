const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CancelSubscription(req, res) {
  // cancels stripe subscription using subscription id
  const {subscription_id} = req.body;
    const deleted = await stripe.subscriptions.del(
        subscription_id
      );
  res.json({ status: deleted.status });
}

export default CancelSubscription