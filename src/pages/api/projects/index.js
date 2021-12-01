import dbConnect from "../../../utils/dbConnect";
import {Project, User} from "../../../models";

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) { 
        case 'GET':
            try {
                const projects = await Project.find({})
                                .populate('owner')
                                .populate('collaborators')
                                .populate('designs');
                res.status(200).json({ success: true, data: projects})                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'POST':
            try {
                const project = await Project.create(req.body);
                res.status(201).json({ success: true, data: project})

                await User.findByIdAndUpdate(
                    { _id: project.owner },
                    { $push: { projects: project._id } },
                    { new: true }
                );
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
    
        default:
            res.status(404).json({ success: false })
            break;
    }
}
