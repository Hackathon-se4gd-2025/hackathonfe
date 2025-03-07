// import React from 'react';

// const BacklogDetails: React.FC = () => {
//     const backlogItem = {
//         _id: "67c9ad1eb412c0d6db091248",
//         title: "Improve Login Flow",
//         description: "Enhance user authentication experience",
//         priority: 2,
//         sustainability: true,
//         storyPoints: 5,
//         sustainabilityPoints: 3,
//         status: "In Progress",
//         tags: ["feature", "authentication"],
//         effects: ["user satisfaction"],
//         sprint: "sprint_1",
//         responsible: "John Doe",
//         __v: 0
//     };

//     return (
//         <div>
//             <h1>Backlog Details</h1>
//             <h2>{backlogItem.title}</h2>
//             <p><strong>Description:</strong> {backlogItem.description}</p>
//             <p><strong>Priority:</strong> {backlogItem.priority}</p>
//             <p><strong>Sustainability:</strong> {backlogItem.sustainability ? 'Yes' : 'No'}</p>
//             <p><strong>Story Points:</strong> {backlogItem.storyPoints}</p>
//             <p><strong>Sustainability Points:</strong> {backlogItem.sustainabilityPoints}</p>
//             <p><strong>Status:</strong> {backlogItem.status}</p>
//             <p><strong>Tags:</strong> {backlogItem.tags.join(', ')}</p>
//             <p><strong>Effects:</strong> {backlogItem.effects.join(', ')}</p>
//             <p><strong>Sprint:</strong> {backlogItem.sprint}</p>
//             <p><strong>Responsible:</strong> {backlogItem.responsible}</p>
            
//         </div>
//     );
// };

// export default BacklogDetails;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";

const BacklogDetails: React.FC = () => {
    const { id } = useParams();
    const [backlogItem, setBacklogItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBacklogItem = async () => {
            try {
                const res = await axios.get(`/items/${id}`);
                setBacklogItem(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching backlog item:", err);
                setError("Failed to load backlog item.");
                setLoading(false);
            }
        };

        fetchBacklogItem();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!backlogItem) return <p>No backlog item found.</p>;

    return (
        <div className="container mt-4">
            <h1>Backlog Details</h1>
            <h2>{backlogItem.title}</h2>
            <p><strong>Description:</strong> {backlogItem.description}</p>
            <p><strong>Priority:</strong> {backlogItem.priority}</p>
            <p><strong>Sustainability:</strong> {backlogItem.sustainability ? 'Yes' : 'No'}</p>
            <p><strong>Story Points:</strong> {backlogItem.storyPoints}</p>
            <p><strong>Sustainability Points:</strong> {backlogItem.sustainabilityPoints}</p>
            <p><strong>Status:</strong> {backlogItem.status}</p>
            <p><strong>Tags:</strong> {backlogItem.tags?.join(', ')}</p>
            <p><strong>Effects:</strong> {backlogItem.effects?.join(', ')}</p>
            <p><strong>Sprint:</strong> {backlogItem.sprint}</p>
            <p><strong>Responsible:</strong> {backlogItem.responsible}</p>
        </div>
    );
};

export default BacklogDetails;
