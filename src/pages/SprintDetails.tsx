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
            const formattedItems = itemsRes.data.map((item) => ({
                ...item,
                _id: String(item._id), // ✅ Ensure ID is a string
            }));

            setItems(formattedItems);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching sprint details:", err);
            setError("Failed to load sprint details.");
            setLoading(false);
        }
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return; // If dropped outside, do nothing

        const { source, destination } = result;

        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(source.index, 1); // Remove item from source
        movedItem.status = destination.droppableId; // Update status
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

            {/* ✅ Kanban Board with Fixed Drag-and-Drop */}
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
                                        className="p-3 border bg-light kanban-column"
                                        style={{ width: "300px", height: "500px" }}
                                    >
                                        {items.length > 0 &&
                                            items
                                                .filter((item) => item.status === category)
                                                .map((item, index) => (
                                                    <Draggable key={String(item._id)} draggableId={String(item._id)} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="card mb-2 p-2 kanban-card"
                                                            >
                                                                <strong>{item.title}</strong>
                                                                <p className="mb-1">{item.description}</p>
                                                                <p className="text-muted">
                                                                    Priority: {item.priority} | 
                                                                    <span className="ms-2">
                                                                        {item.sustainability ? 
                                                                            <span title="Sustainable" style={{ color: "green" }}>🌿</span> : 
                                                                            <span title="Not Sustainable" style={{ color: "gray" }}>❌</span>}
                                                                    </span>
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
