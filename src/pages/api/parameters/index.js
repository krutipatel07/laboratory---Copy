import dbConnect from "../../../utils/dbConnect";
import {Parameter} from "../../../models";
<<<<<<< HEAD
=======
// import { withSentry } from '@sentry/nextjs';
>>>>>>> b394225fbbc915b0a529f4a0357be118841a4838


dbConnect();
// get all parameters information to generate design from generate tab in workspace

export default async (req, res) => {
    const { 
        query: {baths, beds, garages, sqft}
        , method } = req;
    switch (method) { 
        case 'GET':
            try {
                const parameters = await Parameter
                .find({baths, beds, garages, sqft: { $gt: (sqft - 750), $lt: (sqft + 750) }})
                .limit(9);
                res.status(200).json({ success: true, data: parameters})              
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'POST':
            try {
                const parameter = await Parameter.create(req.body);
                res.status(201).json({ success: true, data: parameter})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
    
        default:
            res.status(404).json({ success: false })
            break;
    }
}

<<<<<<< HEAD
=======
export default Index;
>>>>>>> b394225fbbc915b0a529f4a0357be118841a4838
