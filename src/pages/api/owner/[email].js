import dbConnect from "../../../utils/dbConnect";
import { User } from "../../../models"
<<<<<<< HEAD
=======
// import { withSentry } from '@sentry/nextjs';
>>>>>>> b394225fbbc915b0a529f4a0357be118841a4838

dbConnect();

export default async (req, res) => {
    const { 
        query: {email},
        method } = req;
        // find user details from email only
        const user = await User.findOne({ email })
                    .populate('projects');
        if (!user){
            res.status(404).json({ success: false })
        }
        res.status(200).json({ success: true, data: user});
}
<<<<<<< HEAD
=======
export default Email;
>>>>>>> b394225fbbc915b0a529f4a0357be118841a4838
