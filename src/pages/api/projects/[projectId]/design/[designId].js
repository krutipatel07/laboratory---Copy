import dbConnect from "../../../../../utils/dbConnect";
import { Design } from "../../../../../models"

dbConnect();

export default async (req, res) => {
    const { 
        query: {designId},
        method } = req;

    switch (method) {
        case 'GET':
            try {
                const design = await Design.findById(designId)
                                .populate('versionOf')
                                .populate('versions')
                                .populate('comments');
                if (!design){
                    res.status(404).json({ success: false, message: error})
                }
                res.status(200).json({ success: true, data: design});
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'PUT':
            try {
                const design = await Design.findByIdAndUpdate(designId, 
                    { $push : { comments : req.body.comments}}, 
                    {
                    new: true,
                    runValidators: true
                });
                if (!design){
                    res.status(404).json({ success: false, message: error})
                }
                if(req.body.versionOf){                    
                    await Design.findByIdAndUpdate(
                    { _id: req.body.versionOf },
                    { $push: { versions: design._id } },
                    { new: true }
                    );
                }
                if(req.body.collaborators){                    
                    await Design.findByIdAndUpdate(designId, 
                        { $push : { collaborators : req.body.collaborators}}, 
                        {
                        new: true,
                        runValidators: true
                    });
                }                
                if(req.body.limnu_boardUrl){                    
                    await Design.findByIdAndUpdate(designId, 
                        { limnu_boardUrl : req.body.limnu_boardUrl}, 
                        {
                        new: true,
                        runValidators: true
                    });
                }
                res.status(200).json({ success: true, data: design})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'DELETE':
            try {            
                const design = await Design.findById(designId)
                .populate('versionOf')
                .populate('versions')
                .populate('comments');

                const deletedDesign = await Design.deleteOne({ _id: designId });
                if (!deletedDesign){
                    res.status(404).json({ success: false, message: error})
                }
                
                design.versions.forEach(async version => {
                    await Design.deleteOne({ _id: version._id });
                })

                res.status(200).json({ success: true, data: deletedDesign})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;    
        default:
            res.status(404).json({ success: false })
            break;
    }
}