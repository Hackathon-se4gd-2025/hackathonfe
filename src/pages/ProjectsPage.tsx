import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Projects</h2>
      <ul className="list-group">
        {projects.map((project) => (
          <li key={project._id} className="list-group-item d-flex justify-content-between">
            {project.name}
            <Link to={`/projects/${project._id}`} className="btn btn-primary btn-sm">View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
