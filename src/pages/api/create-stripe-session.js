const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const {priceId} = req.body;
  const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/checkout'
      : 'https://laboratory-6tgshze9l-maket-development.vercel.app/checkout';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
        price: priceId,
        quantity: 1
      }],
    mode: 'subscription',
    success_url: redirectURL + '?status=success&session_id={CHECKOUT_SESSION_ID}',
    cancel_url: redirectURL + '?status=cancel'
  });
  res.json({ id: session.id });
}

export default CreateStripeSession;