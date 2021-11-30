import dbConnect from "../../../../utils/dbConnect";
import {Design} from "../../../../models";

dbConnect();

export default async (req, res) => {
    const { 
        query: {id},
        method } = req;

    switch (method) {
        case 'GET':
            try {
                const design = await Design.find({ project: id })
                .populate('project');
                res.status(200).json({ success: true, data: design})                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'POST':
            try {
                const design = await Design.create({...req.body, project : id});
                res.status(201).json({ success: true, data: design})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
    
        default:
            res.status(404).json({ success: false })
            break;
    }
}
