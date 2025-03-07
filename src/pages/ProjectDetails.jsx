import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../services/api";

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [sprints, setSprints] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const projectRes = await axios.get(`/projects/${id}`);
                setProject(projectRes.data);

                // Fetch sprints related to this project
                const sprintsRes = await axios.get(`/projects/${id}/sprints`);
                setSprints(sprintsRes.data);

                // ✅ Fetch only items related to this project
                const itemsRes = await axios.get(`/projects/${id}/items`);
                setItems(itemsRes.data);

            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };

        fetchProjectDetails();
    }, [id]);

    return (
        <div className="container mt-4">
            <h2>{project?.name}</h2>
            
            <h4>Sprints</h4>
            <ul className="list-group">
                {sprints.map((sprint) => (
                    <li key={sprint._id} className="list-group-item">
                        <Link to={`/sprints/${sprint._id}`}>{sprint.name}</Link>
                    </li>
                ))}
            </ul>

            <h4 className="mt-3">Backlog Items</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Sustainability</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <Link to={`/backlog/${item._id}`}>{item.title}</Link>
                            </td>
                            <td>{item.description}</td>
                            <td>{item.sustainability ? "Yes" : "No"}</td>
                            <td>{item.priority}</td>
                            <td>
                                <Link to={`/items/${item._id}/edit`} className="btn btn-warning btn-sm">Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`/projects/${project?._id}/items/create`} className="btn btn-success mb-3">
                + Add New Item
            </Link>
        </div>
    );
};

export default ProjectDetails;
