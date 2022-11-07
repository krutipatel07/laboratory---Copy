import dbConnect from "../../../../../utils/dbConnect";
import { Design } from "../../../../../models"
import authenticatedUser from "../../../../../utils/authUser";

dbConnect();

export default async (req, res) => {
    const user = await authenticatedUser(req);
    if (user) {
        const { 
            query: {designId},
            method } = req;

        switch (method) {
            case 'GET':
                try {
                    const design = await Design.findById(designId)
                                    .populate('versionOf')
                                    .populate('versions');
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
                    // update versions of a design
                    if(req.body.versionOf){                    
                        await Design.findByIdAndUpdate(
                        { _id: req.body.versionOf },
                        { $push: { versions: design._id } },
                        { new: true }
                        );
                    }
                    // add collaborators email address in design
                    if(req.body.collaborators){                    
                        await Design.findByIdAndUpdate(designId, 
                            { $push : { collaborators : req.body.collaborators}}, 
                            {
                            new: true,
                            runValidators: true
                        });
                    }
                    // add limnu board url                                
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
                    .populate('versions');

                    const deletedDesign = await Design.deleteOne({ _id: designId });
                    if (!deletedDesign){
                        res.status(404).json({ success: false, message: error})
                    }
                    // delete all of versions of the design deleted before
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
    } else {
        res.status(401).json({success: false});
}}

