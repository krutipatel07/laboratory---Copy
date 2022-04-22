import dbConnect from "../../../../../utils/dbConnect";
import {Design, Project} from "../../../../../models";

dbConnect();

export default async (req, res) => {
    const { 
        query: {projectId},
        method } = req;

    switch (method) {
        case 'GET':
            try {
                const design = await Design.find({ project: projectId })
                                .populate('versionOf')
                                .populate('versions');
                res.status(200).json({ success: true, data: design})                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'POST':
            try {
                const design = await Design.create({...req.body, project : projectId});
                res.status(201).json({ success: true, data: design})
                // update design id in project database after creating
                await Project.findByIdAndUpdate(
                    { _id: design.project },
                    { $push: { designs: design._id } },
                    { new: true }
                );
                
                // update versions of a design
                if(req.body.versionOf){                    
                    await Design.findByIdAndUpdate(
                    { _id: req.body.versionOf },
                    { $push: { versions: design._id } },
                    { new: true }
                    );
                }
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;    
        default:
            res.status(404).json({ success: false })
            break;
    }
}
