const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  // create stripe session for user to subscribe one of our plan using its priceId
  const {priceId, email} = req.body;  
  const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/checkout'
      : 'https://laboratory-2kn1vu4hk-maket-development.vercel.app/checkout';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: email,
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