import dbConnect from "../../../utils/dbConnect";
import { Stripe } from "../../../models";
import authenticatedUser from "../../../utils/authUser";


dbConnect();

export default async (req, res) => {
  const user = await authenticatedUser(req);
  if (user) {
    const {method} = req;

    switch (method) {
      case 'GET':
        try {
          const stripe = await Stripe.find({})
          res.status(200).json({success: true, data: stripe})
        } catch (error) {
          res.status(404).json({success: false, message: error})
        }
        break;
      case 'POST':
        try {
          const stripe = await Stripe.create(req.body);
          res.status(201).json({success: true, data: stripe})
        } catch (error) {
          res.status(404).json({success: false, message: error})
        }
        break;

      default:
        res.status(404).json({success: false})
        break;
    }
  } else {
    res.status(401).json({success: false});
  }
}
