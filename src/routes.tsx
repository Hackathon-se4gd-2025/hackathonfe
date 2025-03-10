import { Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetails from "./pages/ProjectDetails";
import BacklogDetails from "./pages/BacklogDetails";
import ItemEdit from "./pages/ItemEdit";
import ItemCreate from "./pages/ItemCreate";
import SprintDetails from "./pages/SprintDetails";
import SprintItemCreate from "./pages/SprintItemCreate";
import Index from "./pages/Index";
import Metrcis from "./pages/Metrics";
import LearnSustainability from "./pages/LearnSustainability";
import ProjectCreate from "./pages/ProjectCreate";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/projects/create" element={<ProjectCreate />} /> {/* ✅ Added Create Project Page */}
            <Route path="/backlog/:id" element={<BacklogDetails />} />
            <Route path="/items/:id/edit" element={<ItemEdit />} />
            <Route path="/projects/:id/items/create" element={<ItemCreate />} />
            <Route path="/sprints/:id" element={<SprintDetails />} />
            <Route path="/sprints/:id/items/create" element={<SprintItemCreate />} />
            <Route path="/metrics" element={<Metrcis />} />
            <Route path="/learn-sustainability" element={<LearnSustainability />} />
        </Routes>
    );
};

export default AppRoutes;


