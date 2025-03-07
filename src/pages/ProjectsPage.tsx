import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <>
      <h2>📂 Projects</h2>
      <ul className="list-group mt-3">
        {projects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          projects.map((project) => (
            <li key={project._id} className="list-group-item d-flex justify-content-between align-items-center">
              {project.name}
              <Link to={`/projects/${project._id}`} className="btn btn-primary btn-sm">View</Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default ProjectsPage;
