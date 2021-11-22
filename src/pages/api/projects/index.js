import dbConnect from "../../../utils/dbConnect";
import {Project} from "../../../models";

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) { 
        case 'GET':
            try {
                const projects = await Project.find({});
                res.status(200).json({ success: true, data: projects})                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'POST':
            try {
                const project = await Project.create(req.body);
                res.status(201).json({ success: true, data: project})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
    
        default:
            res.status(404).json({ success: false, message: error})
            break;
    }
}
