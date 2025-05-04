import projectService from "../Services/projectService.js";

const createProject = async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    const data = req.body;
    const file = req.file;

    try {
        if(!data.title) return res.status(428).send("title is required");
        if(!data. description) return res.status(428).send("description is required");
        if(!data.techStack) return res.status(428).send("techStack is required");
        if(!data.githubUrl) return res.status(428).send("github url is required");
        if(!data. liveUrl) return res.status(428).send("liveurl is required");
        const project = await projectService.createProject(data,userId,file);
        res.json(project);
    } catch (error) {
        res.status(error.statusCode || 500).send(error.message);
    }
}
const updateProject = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const file = req.file;
    try {
        const project = await projectService.updateProject(id,data,file);
        res.send(project);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const deleteProject = async (req, res) => {
    const id = req.params.id;

    try {
         await projectService.deleteProject(id);
        res.send("Project deleted successfull.");
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const getProjectById = async (req, res) => {
    const id = req.params.id;

    try {
        const project = await projectService.getProjectById(id);
        res.json(project);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const getProjectByUser = async (req, res) => {
    const user = req.user;

    try {
        const projects = await projectService.getProjectByUser(user.id);
        res.json(projects);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
export { createProject , updateProject,deleteProject,getProjectById,getProjectByUser }