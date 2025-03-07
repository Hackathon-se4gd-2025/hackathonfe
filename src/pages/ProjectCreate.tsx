import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

const ProjectCreate = () => {
    const navigate = useNavigate();
    const [project, setProject] = useState({
        name: "",
    });

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/projects", {
                name: project.name,
                sprints: [], // Initially empty
                items: [], // Initially empty
            });

            alert("Project created successfully!");
            navigate("/projects"); // Redirect to projects list
        } catch (error) {
            console.error("Error creating project:", error.response?.data || error.message);
            alert("Failed to create project.");
        }
    };

    return (
        <div>
            <h2>➕ Create a New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Project Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={project.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Create Project</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
};

export default ProjectCreate;
