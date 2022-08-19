import dbConnect from "../../../utils/dbConnect";
import { Stripe } from "../../../models"

dbConnect();
// get by id, update and delete stripe information

export default async (req, res) => {
    const { 
        query: {id},
        method } = req;

    switch (method) {
        case 'GET':
            try {
                const stripe = await Stripe.findById(id);
                if (!stripe){
                    res.status(404).json({ success: false, message: error})
                }
                res.status(200).json({ success: true, data: stripe});
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'PUT':
            try {
                const stripe = await Stripe.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                if (!stripe){
                    res.status(404).json({ success: false, message: error})
                }
                res.status(200).json({ success: true, data: stripe})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'DELETE':
            try {
                const deletedStripe = await Stripe.deleteOne({ _id: id });
                if (!deletedStripe){
                    res.status(404).json({ success: false, message: error})
                }
                
                res.status(200).json({ success: true, data: deletedStripe})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        default:
            res.status(404).json({ success: false })
            break;
    }
}

