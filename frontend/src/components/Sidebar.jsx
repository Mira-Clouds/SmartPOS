import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      backgroundColor: "#f4f4f4",
      padding: "20px"
    }}>
      <h2>SmartPOS</h2>

      <p><Link to="/dashboard">Dashboard</Link></p>
      <p><Link to="/products">Products</Link></p>
      <p><Link to="/categories">Categories</Link></p>
      <p><Link to="/billing">Billing</Link></p>
      <p><Link to="/reports">Reports</Link></p>
    </div>
  );
}

export default Sidebar;