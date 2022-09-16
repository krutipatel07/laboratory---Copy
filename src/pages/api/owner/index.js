import authenticatedUser from "../../../utils/authUser";

export default async (req, res) => {
  const user = await authenticatedUser(req);
  if (user) {
    const userWithProjects = await user.populate('projects');
    res.status(200).json({success: true, data: userWithProjects});
  } else {
    res.status(401).json({success: false});
  }
}
