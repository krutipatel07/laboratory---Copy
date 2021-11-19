import dbConnect from "../../../utils/dbConnect";
import { Projects } from "../../../models"

dbConnect();

export default async (req, res) => {
    const { 
        query: {id},
        method } = req;

    switch (method) {
        case 'GET':
            try {
                const project = await Projects.findById(id);
                if (!project){
                    res.status(404).json({ success: false, message: error})
                }
                res.status(200).json({ success: true, data: projects});
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'PUT':
            try {
                const project = await Projects.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                if (!project){
                    res.status(404).json({ success: false, message: error})
                }
                
                res.status(200).json({ success: true, data: project})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'DELETE':
            try {
                const deletedProject = await Projects.deleteOne({ _id: id });
                if (!deletedProject){
                    res.status(404).json({ success: false, message: error})
                }
                
                res.status(200).json({ success: true, data: project})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
    
    
        default:
            res.status(404).json({ success: false, message: error})
            break;
    }
}