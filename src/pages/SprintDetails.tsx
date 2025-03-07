// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "../services/api";

// const SprintDetails = () => {
//     const { id } = useParams();
//     const [sprint, setSprint] = useState(null);
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchSprintDetails();
//     }, [id]);

//     const fetchSprintDetails = async () => {
//         try {
//             const sprintRes = await axios.get(`/sprints/${id}`);
//             setSprint(sprintRes.data);

//             const itemsRes = await axios.get(`/sprints/${id}/items`);
//             setItems(itemsRes.data);

//             setLoading(false);
//         } catch (err) {
//             console.error("Error fetching sprint details:", err);
//             setError("Failed to load sprint details.");
//             setLoading(false);
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p className="text-danger">{error}</p>;
//     if (!sprint) return <p>No sprint found.</p>;

//     return (
//         <div className="container mt-4">
//             <h2>{sprint.name}</h2>
//             <p><strong>Start Date:</strong> {new Date(sprint.start).toLocaleDateString()}</p>
//             <p><strong>End Date:</strong> {new Date(sprint.end).toLocaleDateString()}</p>

//             <h4 className="mt-3">Backlog Items</h4>
//             {items.length === 0 ? (
//                 <p>No items in this sprint.</p>
//             ) : (
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>Title</th>
//                             <th>Description</th>
//                             <th>Sustainability</th>
//                             <th>Priority</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {items.map((item) => (
//                             <tr key={item._id}>
//                                 <td><Link to={`/backlog/${item._id}`}>{item.title}</Link></td>
//                                 <td>{item.description}</td>
//                                 <td>{item.sustainability ? "Yes" : "No"}</td>
//                                 <td>{item.priority}</td>
//                                 <td>
//                                     <Link to={`/items/${item._id}/edit`} className="btn btn-warning btn-sm">Edit</Link>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             {/* ✅ Button to Create a New Item in This Sprint */}
//             <Link to={`/sprints/${sprint._id}/items/create`} className="btn btn-success mt-3">
//                 + Add New Item
//             </Link>
//         </div>
//     );
// };

// export default SprintDetails;


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../services/api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SprintDetails = () => {
    const { id } = useParams();
    const [sprint, setSprint] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSprintDetails();
    }, [id]);

    const fetchSprintDetails = async () => {
        try {
            const sprintRes = await axios.get(`/sprints/${id}`);
            setSprint(sprintRes.data);

            const itemsRes = await axios.get(`/sprints/${id}/items`);
            setItems(itemsRes.data);

            setLoading(false);
        } catch (err) {
            console.error("Error fetching sprint details:", err);
            setError("Failed to load sprint details.");
            setLoading(false);
        }
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return; // Drop outside

        const { source, destination } = result;

        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(source.index, 1); // Remove item from source
        movedItem.status = destination.droppableId; // Change status
        updatedItems.splice(destination.index, 0, movedItem); // Insert item at new position

        setItems(updatedItems); // Update UI immediately

        // ✅ Update item status in the backend
        try {
            await axios.put(`/items/${movedItem._id}`, { status: movedItem.status });
        } catch (error) {
            console.error("Failed to update item status:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!sprint) return <p>No sprint found.</p>;

    const categories = ["To Do", "In Progress", "Done"];

    return (
        <div className="container mt-4">
            <h2>{sprint.name}</h2>
            <p><strong>Start Date:</strong> {new Date(sprint.start).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(sprint.end).toLocaleDateString()}</p>

            {/* ✅ Kanban Board */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="row mt-4">
                    {categories.map((category) => (
                        <div key={category} className="col-md-4">
                            <h4>{category}</h4>
                            <Droppable droppableId={category}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="p-3 border bg-light"
                                        style={{ minHeight: "200px" }}
                                    >
                                        {items
                                            .filter((item) => item.status === category)
                                            .map((item, index) => (
                                                <Draggable key={item._id} draggableId={item._id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="card mb-2 p-2"
                                                        >
                                                            <strong>{item.title}</strong>
                                                            <p className="mb-1">{item.description}</p>
                                                            <p className="text-muted">
                                                                Priority: {item.priority} | 
                                                                Sustainability: {item.sustainability ? "Yes" : "No"}
                                                            </p>
                                                            <Link to={`/items/${item._id}/edit`} className="btn btn-sm btn-warning">Edit</Link>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>

            {/* ✅ Button to Create a New Item in This Sprint */}
            <Link to={`/sprints/${sprint._id}/items/create`} className="btn btn-success mt-3">
                + Add New Item
            </Link>
        </div>
    );
};

export default SprintDetails;
