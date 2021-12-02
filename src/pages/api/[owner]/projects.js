import dbConnect from "../../../utils/dbConnect";
import { Project } from "../../../models"

dbConnect();

export default async (req, res) => {
    const { 
        query: {owner},
        method } = req;
        const project = await Project.find({ owner })
                        .populate('owner')
                        .populate('collaborators')
                        .populate('designs');
        if (!project){
            res.status(404).json({ success: false })
        }
        res.status(200).json({ success: true, data: project});
}