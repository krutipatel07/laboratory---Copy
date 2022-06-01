import dbConnect from "../../../utils/dbConnect";
import { Project } from "../../../models"
import { withSentry } from '@sentry/nextjs';

dbConnect();

const Projects =  async (req, res) => {
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
}

export default withSentry(Projects);