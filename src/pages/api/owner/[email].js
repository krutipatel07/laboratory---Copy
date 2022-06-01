import dbConnect from "../../../utils/dbConnect";
import { User } from "../../../models"
import { withSentry } from '@sentry/nextjs';

dbConnect();

const Email = async (req, res) => {
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
export default withSentry(Email);
