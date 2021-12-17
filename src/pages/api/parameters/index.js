import dbConnect from "../../../utils/dbConnect";
import {Parameter} from "../../../models";

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) { 
        case 'GET':
            try {
                const parameters = await Parameter.find({});
                res.status(200).json({ success: true, data: parameters})                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
        case 'POST':
            try {
                const parameter = await Parameter.create(req.body);
                res.status(201).json({ success: true, data: parameter})
                
            } catch (error) {
                res.status(404).json({ success: false, message: error})
            }
            break;
    
        default:
            res.status(404).json({ success: false })
            break;
    }
}
