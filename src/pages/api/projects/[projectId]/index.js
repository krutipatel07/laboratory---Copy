import dbConnect from "../../../../utils/dbConnect";
import { Project, Design } from "../../../../models"

dbConnect();

export default async (req, res) => {
    const { 
        query: {projectId},
        method } = req;

    switch (method) {
        case 'GET':
            try {
                const project = await Project.findById(projectId)
                                .populate('owner')
                                .populate('collaborators')
                                .populate('designs');
                if (!project){
                    res.status(404).json({ success: false, message: error})
                }
                res.status(200).json({ success: true, data: project});
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'PUT':
            try {
                const project = await Project.findByIdAndUpdate(projectId, req.body, {
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
                const project = await Project.findById(projectId)
                .populate('owner')
                .populate('collaborators')
                .populate('designs');

                const deletedProject = await Project.deleteOne({ _id: projectId });

                project.designs.forEach(async design => {
                        await Design.deleteOne({ _id: design._id });                        
                        design.versions.forEach(async version => {
                            await Design.deleteOne({ _id: version._id });
                        })
                })
                res.status(200).json({ success: true, data: deletedProject})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
     
        default:
            res.status(404).json({ success: false })
            break;
    }
}