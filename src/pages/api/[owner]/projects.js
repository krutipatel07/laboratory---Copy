import dbConnect from "../../../utils/dbConnect";
import { Project } from "../../../models"
import authenticatedUser from "../../../utils/authUser";
// import { withSentry } from '@sentry/nextjs';

dbConnect();

export default async (req, res) => {
    const user = await authenticatedUser(req);
    if (user) {
        const { 
            query: {owner},
            method } = req;
        // find all project details of the user logged in through the userId
        const project = await Project.find({ owner })
                        .populate('owner')
                        .populate('collaborators')
                        .populate('designs');
        if (!project){
            res.status(404).json({ success: false })
        }
        res.status(200).json({ success: true, data: project.reverse() });
    } else {
    res.status(401).json({success: false});
}}

