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
                    <Link to="/metrics" className="nav-link text-light"> Metrics</Link>
                    <a href="https://zahramabrouk290.wixsite.com/susiteducation" className="nav-link text-light" target="_blank" rel="noopener noreferrer"> Learn Sustainability</a>
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
