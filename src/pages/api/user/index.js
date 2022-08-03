import dbConnect from "../../../utils/dbConnect";
import {User} from "../../../models";
<<<<<<< HEAD
=======
// import { withSentry } from '@sentry/nextjs';
>>>>>>> b394225fbbc915b0a529f4a0357be118841a4838

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) { 
        case 'GET':
            try {
                const users = await User.find({})
                .populate('projects');
                res.status(200).json({ success: true, data: users})                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'POST':
            try {
                const user = await User.create(req.body);
                res.status(201).json({ success: true, data: user})
                
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
export default Id;
>>>>>>> b394225fbbc915b0a529f4a0357be118841a4838
