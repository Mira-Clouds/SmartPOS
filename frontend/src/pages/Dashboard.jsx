import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{ padding: "20px" }}>
        <h1>Dashboard</h1>

        <div>
          <h3>Total Sales</h3>
          <p>Rs. 0.00</p>
        </div>

        <div>
          <h3>Total Products</h3>
          <p>0</p>
        </div>

        <div>
          <h3>Total Orders</h3>
          <p>0</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;