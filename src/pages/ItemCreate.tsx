import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../services/api";

const ItemCreate = () => {
    const { id: projectId } = useParams(); // Get project ID from URL
    const navigate = useNavigate();
    const [item, setItem] = useState({
        title: "",
        description: "",
        priority: 1,
        sustainability: false,
        storyPoints: 0,
        sustainabilityPoints: 0,
        status: "To Do",
        tags: [],
        effects: [],
        responsible: "",
    });
    const [effects, setEffects] = useState([]);
    const [selectedEffects, setSelectedEffects] = useState([]);

    useEffect(() => {
        const fetchEffects = async () => {
            try {
                const response = await axios.post("/integration/effects");
                const fetchedEffects = response.data.effects.flatMap(effect => effect.effects);
                setEffects(fetchedEffects);
            } catch (error) {
                console.error("Error fetching effects:", error);
            }
        };

        fetchEffects();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = () => {
        setItem((prev) => ({ ...prev, sustainability: !prev.sustainability }));
    };

    const handleArrayChange = (e, field) => {
        setItem((prev) => ({ ...prev, [field]: e.target.value.split(",").map((item) => item.trim()) }));
    };

    const handleEffectSelection = (effectId) => {
        setSelectedEffects((prev) =>
            prev.includes(effectId) ? prev.filter((id) => id !== effectId) : [...prev, effectId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1️⃣ Create the item
            const newItemRes = await axios.post("/items", {
                ...item,
                priority: Number(item.priority),
                storyPoints: Number(item.storyPoints),
                sustainabilityPoints: Number(item.sustainabilityPoints),
                effects: selectedEffects,
                sprint: "sprint_1", // Make sure sprint ID is set correctly
            });
    
            const newItem = newItemRes.data; // Get the created item's data
    
            console.log("Created item:", newItem); // ✅ Debugging
    
            // 2️⃣ Add the item to the project’s `items` array
            await axios.put(`/projects/${projectId}`, {
                $push: { items: newItem._id },
            });
    
            alert("Item created and linked to project successfully!");
            navigate(`/projects/${projectId}`);
        } catch (error) {
            console.error("Error creating item:", error.response?.data || error.message);
            alert("Failed to create item.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create New Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={item.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={item.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <input
                        type="number"
                        className="form-control"
                        name="priority"
                        value={item.priority}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Story Points</label>
                    <input
                        type="number"
                        className="form-control"
                        name="storyPoints"
                        value={item.storyPoints}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Effects</label>
                    <ul style={{ maxHeight: '200px', overflowY: 'auto', padding: '0', listStyleType: 'none', border: '1px solid #ddd', borderRadius: '4px', padding: '10px', marginBottom: '20px' }}>
                        {effects.map((effect) => (
                            <li key={effect._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <input
                                    type="checkbox"
                                    checked={selectedEffects.includes(effect._id)}
                                    onChange={() => handleEffectSelection(effect._id)}
                                    style={{ marginRight: '10px' }}
                                />
                                {effect.is_positive ? "Positive" : "Negative"} - {effect.likelihood} + {effect.impact_level} - {effect.description}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mb-3">
                    <label className="form-label">Selected Effects</label>
                    <ul style={{ padding: '0', listStyleType: 'none', border: '1px solid #ddd', borderRadius: '4px', padding: '10px', marginBottom: '20px' }}>
                        {selectedEffects.map((effectId) => {
                            const effect = effects.find(e => e._id === effectId);
                            return (
                                <li key={effectId} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    {effect.is_positive ? "Positive" : "Negative"} - {effect.likelihood} + {effect.impact_level} - {effect.description}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="mb-3">
                    <label className="form-label">Sustainability Points</label>
                    <input
                        type="number"
                        className="form-control"
                        name="sustainabilityPoints"
                        value={item.sustainabilityPoints}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-control" name="status" value={item.status} onChange={handleChange}>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Responsible</label>
                    <input
                        type="text"
                        className="form-control"
                        name="responsible"
                        value={item.responsible}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Tags (comma-separated)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="tags"
                        value={item.tags.join(", ")}
                        onChange={(e) => handleArrayChange(e, "tags")}
                    />
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="sustainability"
                        checked={item.sustainability}
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="sustainability">
                        Sustainability Impact
                    </label>
                </div>

                <button type="submit" className="btn btn-success">Create Item</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
};

export default ItemCreate;
