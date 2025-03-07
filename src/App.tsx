// // import AppRoutes from "./routes/routes";
// import AppRoutes from "./routes";

// function App() {
//   return <AppRoutes />;
// }

// export default App;



// import { BrowserRouter as Router } from "react-router-dom";
// import AppRoutes from "./routes";

// function App() {
//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router } from "react-router-dom";
// import AppRoutes from "./AppRoutes";
import AppRoutes from "./routes";
// import Layout from "./components/Layout";
import Layout from "./layouts/Layout";

function App() {
    return (
        <Router>
            <Layout>
                <AppRoutes />
            </Layout>
        </Router>
    );
}

export default App;
