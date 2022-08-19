import dbConnect from "../../../utils/dbConnect";
import {Stripe} from "../../../models";


dbConnect();

export default async (req, res) => {
    const { method } = req;
    // get and create stripe information for users

    switch (method) { 
        case 'GET':
            try {
                const stripe = await Stripe.find({})
                res.status(200).json({ success: true, data: stripe})                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'POST':
            try {
                const stripe = await Stripe.create(req.body);
                res.status(201).json({ success: true, data: stripe})
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
    
        default:
            res.status(404).json({ success: false })
            break;
    }
}
