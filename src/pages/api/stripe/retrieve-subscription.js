const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function RetrieveSubscription(req, res) {
  // retrieve subscription details using subscription id and return its status i.e, cancelled or active
  const {subscription_id} = req.body
    const retreive_subscription = await stripe.subscriptions.retrieve(
      subscription_id
    );
    const subscription_details = {
        subscription_id : retreive_subscription.id,
        customer_id : retreive_subscription.customer,
        plan : retreive_subscription.plan.id,
        status : retreive_subscription.status
    }
  res.json(subscription_details);
}

export default RetrieveSubscription