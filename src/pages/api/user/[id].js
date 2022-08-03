import dbConnect from "../../../utils/dbConnect";
import { User } from "../../../models"
<<<<<<< HEAD
=======
// import { withSentry } from '@sentry/nextjs';
>>>>>>> b394225fbbc915b0a529f4a0357be118841a4838

dbConnect();

export default async (req, res) => {
    const { 
        query: {id},
        method } = req;

    switch (method) {
        case 'GET':
            try {
                const user = await User.findById(id)
                            .populate('projects');  
                if (!user){
                    res.status(404).json({ success: false, message: error})
                }
                res.status(200).json({ success: true, data: user});
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'PUT':
            try {
                const user = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                }).populate('projects');
                if (!user){
                    res.status(404).json({ success: false, message: error})
                }
                
                res.status(200).json({ success: true, data: user})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'DELETE':
            try {
                const deletedUser = await User.deleteOne({ _id: id });
                if (!deletedUser){
                    res.status(404).json({ success: false, message: error})
                }
                
                res.status(200).json({ success: true, data: deletedUser})
                
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
