// import { useEffect, useState } from "react";
// import axios from "../services/api";

// const Metrics = () => {
//     const [metrics, setMetrics] = useState([]);

//     useEffect(() => {
//         const fetchMetrics = async () => {
//             try {
//                 const projectsRes = await axios.get("/projects"); // Fetch all projects
//                 const projectsData = projectsRes.data;

//                 const metricsData = await Promise.all(
//                     projectsData.map(async (project) => {
//                         // Fetch project backlog items
//                         const pbiRes = await axios.get(`/projects/${project._id}/items`);
//                         const totalPBI = pbiRes.data.length;

//                         // Fetch all items in project (PBIs + sprint items)
//                         const sprintRes = await axios.get(`/projects/${project._id}/sprints`);
//                         const sprintIds = sprintRes.data.map(s => s._id);

//                         let totalItems = totalPBI;
//                         for (const sprintId of sprintIds) {
//                             const sprintItemsRes = await axios.get(`/sprints/${sprintId}/items`);
//                             totalItems += sprintItemsRes.data.length;
//                         }

//                         // Generate a random sustainability progress percentage
//                         const sustainabilityProgress = Math.floor(Math.random() * 101);

//                         return {
//                             name: project.name,
//                             totalPBI,
//                             totalItems,
//                             sustainabilityProgress,
//                         };
//                     })
//                 );

//                 setMetrics(metricsData);
//             } catch (error) {
//                 console.error("Error fetching metrics:", error);
//             }
//         };

//         fetchMetrics();
//     }, []);

//     return (
//         <div>
//             <h2>📊 Project Metrics</h2>
//             <table className="table mt-3">
//                 <thead>
//                     <tr>
//                         <th>Project Name</th>
//                         <th>Total PBIs</th>
//                         <th>Total Items</th>
//                         <th>Sustainability Progress</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {metrics.length === 0 ? (
//                         <tr>
//                             <td colSpan="4" className="text-center">Loading metrics...</td>
//                         </tr>
//                     ) : (
//                         metrics.map((metric, index) => (
//                             <tr key={index}>
//                                 <td>{metric.name}</td>
//                                 <td>{metric.totalPBI}</td>
//                                 <td>{metric.totalItems}</td>
//                                 <td>{metric.sustainabilityProgress}%</td>
//                             </tr>
//                         ))
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Metrics;

// import { useEffect, useState } from "react";
// import axios from "../services/api";

// const Metrics = () => {
//     const [metrics, setMetrics] = useState([]);

//     useEffect(() => {
//         const fetchMetrics = async () => {
//             try {
//                 const projectsRes = await axios.get("/projects"); // Fetch all projects
//                 const projectsData = projectsRes.data;

//                 const metricsData = await Promise.all(
//                     projectsData.map(async (project) => {
//                         // Fetch project backlog items
//                         const pbiRes = await axios.get(`/projects/${project._id}/items`);
//                         const totalPBI = pbiRes.data.length;

//                         // Fetch all items in project (PBIs + sprint items)
//                         const sprintRes = await axios.get(`/projects/${project._id}/sprints`);
//                         const sprintIds = sprintRes.data.map(s => s._id);

//                         let totalItems = totalPBI;
//                         for (const sprintId of sprintIds) {
//                             const sprintItemsRes = await axios.get(`/sprints/${sprintId}/items`);
//                             totalItems += sprintItemsRes.data.length;
//                         }

//                         // Generate a random sustainability progress percentage
//                         const sustainabilityProgress = Math.floor(Math.random() * 101);

//                         return {
//                             name: project.name,
//                             totalPBI,
//                             totalItems,
//                             sustainabilityProgress,
//                         };
//                     })
//                 );

//                 setMetrics(metricsData);
//             } catch (error) {
//                 console.error("Error fetching metrics:", error);
//             }
//         };

//         fetchMetrics();
//     }, []);

//     // Function to determine traffic light color and label
//     const getSustainabilityStatus = (percentage) => {
//         if (percentage <= 40) {
//             return { color: "🔴", label: "Low" };
//         } else if (percentage <= 60) {
//             return { color: "🟡", label: "Medium" };
//         } else {
//             return { color: "🟢", label: "High" };
//         }
//     };

//     return (
//         <div>
//             <h2>📊 Project Metrics</h2>
//             <table className="table mt-3">
//                 <thead>
//                     <tr>
//                         <th>Project Name</th>
//                         <th>Total PBIs</th>
//                         <th>Total Items</th>
//                         <th>Sustainability Progress</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {metrics.length === 0 ? (
//                         <tr>
//                             <td colSpan="4" className="text-center">Loading metrics...</td>
//                         </tr>
//                     ) : (
//                         metrics.map((metric, index) => {
//                             const sustainability = getSustainabilityStatus(metric.sustainabilityProgress);
//                             return (
//                                 <tr key={index}>
//                                     <td>{metric.name}</td>
//                                     <td>{metric.totalPBI}</td>
//                                     <td>{metric.totalItems}</td>
//                                     <td>
//                                         <span style={{ fontWeight: "bold" }}>
//                                             {sustainability.color} ({sustainability.label} - {metric.sustainabilityProgress}%)
//                                         </span>
//                                     </td>
//                                 </tr>
//                             );
//                         })
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Metrics;


import { useEffect, useState } from "react";
import axios from "../services/api";

const Metrics = () => {
    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const projectsRes = await axios.get("/projects"); // Fetch all projects
                const projectsData = projectsRes.data;

                const metricsData = await Promise.all(
                    projectsData.map(async (project) => {
                        // Fetch project backlog items
                        const pbiRes = await axios.get(`/projects/${project._id}/items`);
                        const totalPBI = pbiRes.data.length;

                        // Fetch total sprints for the project
                        const sprintRes = await axios.get(`/projects/${project._id}/sprints`);
                        const totalSprints = sprintRes.data.length;

                        // Generate a random sustainability progress percentage
                        const sustainabilityProgress = Math.floor(Math.random() * 101);

                        return {
                            name: project.name,
                            totalPBI,
                            totalSprints,
                            sustainabilityProgress,
                        };
                    })
                );

                setMetrics(metricsData);
            } catch (error) {
                console.error("Error fetching metrics:", error);
            }
        };

        fetchMetrics();
    }, []);

    // Function to determine traffic light color and label
    const getSustainabilityStatus = (percentage) => {
        if (percentage <= 40) {
            return { color: "🔴", label: "Low" };
        } else if (percentage <= 60) {
            return { color: "🟡", label: "Medium" };
        } else {
            return { color: "🟢", label: "High" };
        }
    };

    return (
        <div>
            <h2>📊 Project Metrics</h2>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Total PBIs</th>
                        <th>Total Sprints</th>
                        <th>Sustainability Progress</th>
                    </tr>
                </thead>
                <tbody>
                    {metrics.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">Loading metrics...</td>
                        </tr>
                    ) : (
                        metrics.map((metric, index) => {
                            const sustainability = getSustainabilityStatus(metric.sustainabilityProgress);
                            return (
                                <tr key={index}>
                                    <td>{metric.name}</td>
                                    <td>{metric.totalPBI}</td>
                                    <td>{metric.totalSprints}</td>
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
