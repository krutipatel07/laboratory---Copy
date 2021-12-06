import dbConnect from "../../../utils/dbConnect";
import { User } from "../../../models"

dbConnect();

export default async (req, res) => {
    const { 
        query: {owner},
        method } = req;
        const user = await User.find({ owner })
                        .populate('owner')
                        .populate('collaborators')
                        .populate('designs');
        if (!project){
            res.status(404).json({ success: false, message: error})
        }
        res.status(200).json({ success: true, data: user});
}