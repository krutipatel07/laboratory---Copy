import dbConnect from "../../../utils/dbConnect";
import authenticatedUser from "../../../utils/authUser";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

dbConnect();

async function CreateStripeSession(req, res) {
  const {priceId} = req.body;
  const user = await authenticatedUser(req);
  if (user) {
    // create stripe session for user to subscribe one of our plan using its priceId
    const redirectURL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/checkout'
        : 'https://platform.maket.ai/checkout';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: user.email,
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      mode: 'subscription',
      success_url: redirectURL + '?status=success&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: redirectURL + '?status=cancel'
    });
    res.json({id: session.id});
  } else {
    res.status(401).json({success: false});
  }
}

export default CreateStripeSession;