import dbConnect from "../../../utils/dbConnect";
import { Project } from "../../../models"
<<<<<<< HEAD
=======
// import { withSentry } from '@sentry/nextjs';
>>>>>>> b394225fbbc915b0a529f4a0357be118841a4838

dbConnect();

export default async (req, res) => {
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
<<<<<<< HEAD
}
=======
}

export default Projects;
>>>>>>> b394225fbbc915b0a529f4a0357be118841a4838
