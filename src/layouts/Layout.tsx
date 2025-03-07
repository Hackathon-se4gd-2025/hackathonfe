import { Link } from "react-router-dom";

const Layout = ({ children }) => {
    return (
        <div className="d-flex vh-100">
            {/* Sidebar */}
            <div className="sidebar bg-dark text-light p-3 d-flex flex-column" style={{ width: "250px" }}>
                <h4 className="text-center">Menu</h4>
                <nav className="nav flex-column">
                    <Link to="/" className="nav-link text-light">🏠 Home</Link>
                    <Link to="/projects" className="nav-link text-light"> Projects</Link>
                    <Link to="/reports" className="nav-link text-light"> Reports</Link>
                    <Link to="/settings" className="nav-link text-light"> Learn Sustainability</Link>
                </nav>
            </div>

            {/* Main Content - Expanded to Fill Remaining Space */}
            <div className="flex-grow-1 p-4">
                {children}
            </div>
        </div>
    );
};

export default Layout;
