import dbConnect from "../../../utils/dbConnect";
import { Parameter } from "../../../models"
// import { withSentry } from '@sentry/nextjs';

dbConnect();
// get by id, update and delete parameters information to generate design from generate tab in workspace

const Id = async (req, res) => {
    const { 
        query: {id},
        method } = req;

    switch (method) {
        case 'GET':
            try {
                const parameter = await Parameter.findById(id);
                if (!parameter){
                    res.status(404).json({ success: false, message: error})
                }
                res.status(200).json({ success: true, data: parameter});
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'PUT':
            try {
                const parameter = await Parameter.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                if (!parameter){
                    res.status(404).json({ success: false, message: error})
                }
                res.status(200).json({ success: true, data: parameter})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'DELETE':
            try {
                const deletedParameter = await Parameter.deleteOne({ _id: id });
                if (!deletedParameter){
                    res.status(404).json({ success: false, message: error})
                }
                
                res.status(200).json({ success: true, data: deletedParameter})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        default:
            res.status(404).json({ success: false })
            break;
    }
}

export default Id;
