import { Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetails from "./pages/ProjectDetails";
import BacklogDetails from "./pages/BacklogDetails";
import ItemEdit from "./pages/ItemEdit";
import ItemCreate from "./pages/ItemCreate"; // ✅ Import the new page

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/backlog/:id" element={<BacklogDetails />} />
            <Route path="/items/:id/edit" element={<ItemEdit />} />
            <Route path="/projects/:id/items/create" element={<ItemCreate />} /> {/* ✅ Add the create route */}
        </Routes>
    );
};

export default AppRoutes;


// import { Routes, Route } from "react-router-dom";
// import ProjectsPage from "./pages/ProjectsPage";
// import ProjectDetails from "./pages/ProjectDetails";
// import BacklogDetails from "./pages/BacklogDetails";
// import ItemEdit from "./pages/ItemEdit"; // Import the Edit page

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/projects" element={<ProjectsPage />} />
//       <Route path="/projects/:id" element={<ProjectDetails />} />
//       <Route path="/backlog/:id" element={<BacklogDetails />} />
//       <Route path="/items/:id/edit" element={<ItemEdit />} /> {/* ✅ New Edit Route */}
//     </Routes>
//   );
// };

// export default AppRoutes;
