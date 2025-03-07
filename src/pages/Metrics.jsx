import { useEffect, useState } from "react";
import axios from "../services/api";

const Metrics = () => {
    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                // Fetch all sprints
                const sprintsRes = await axios.get("/sprints");
                const sprintsData = sprintsRes.data;

                const metricsData = await Promise.all(
                    sprintsData.map(async (sprint) => {
                        // Fetch all items in the sprint
                        const itemsRes = await axios.get(`/sprints/${sprint._id}/items`);
                        const totalSprintItems = itemsRes.data.length;

                        // Generate a random sustainability progress percentage
                        const sustainabilityProgress = Math.floor(Math.random() * 101);

                        return {
                            name: sprint.name,
                            totalSprintItems,
                            sustainabilityProgress,
                        };
                    })
                );

                setMetrics(metricsData);
            } catch (error) {
                console.error("Error fetching sprint metrics:", error);
            }
        };

        fetchMetrics();
    }, []);

    // Function to determine traffic light color and label
    const getSustainabilityStatus = (percentage) => {
        if (percentage <= 40) {
            return { color: "🔴", label: "Low" };
        } else if (percentage <= 70) {
            return { color: "🟡", label: "Medium" };
        } else {
            return { color: "🟢", label: "High" };
        }
    };

    return (
        <div>
            <h2>📊 Sprint-Based Metrics</h2>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Sprint Name</th>
                        <th>Total Items in Sprint</th>
                        <th>Sustainability Progress</th>
                    </tr>
                </thead>
                <tbody>
                    {metrics.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center">Loading metrics...</td>
                        </tr>
                    ) : (
                        metrics.map((metric, index) => {
                            const sustainability = getSustainabilityStatus(metric.sustainabilityProgress);
                            return (
                                <tr key={index}>
                                    <td>{metric.name}</td>
                                    <td>{metric.totalSprintItems}</td>
                                    <td>
                                        <span style={{ fontWeight: "bold" }}>
                                            {sustainability.color} ({sustainability.label} - {metric.sustainabilityProgress}%)
                                        </span>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Metrics;
