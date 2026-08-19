import {
  Link,
  useNavigate,
} from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-2">
        SmartPOS
      </h2>

      <p className="text-slate-400 text-sm mb-8">
        {role === "ADMIN"
          ? "Administrator"
          : "Cashier"}
      </p>

      <nav className="space-y-3">
        {role === "ADMIN" && (
          <>
            <Link
              to="/admin/dashboard"
              className="block px-4 py-3 rounded-lg hover:bg-slate-700"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/products"
              className="block px-4 py-3 rounded-lg hover:bg-slate-700"
            >
              Products
            </Link>

            <Link
              to="/admin/categories"
              className="block px-4 py-3 rounded-lg hover:bg-slate-700"
            >
              Categories
            </Link>

            <Link
              to="/admin/reports"
              className="block px-4 py-3 rounded-lg hover:bg-slate-700"
            >
              Reports
            </Link>
          </>
        )}

        {role === "CASHIER" && (
          <>
            <Link
              to="/cashier/dashboard"
              className="block px-4 py-3 rounded-lg hover:bg-slate-700"
            >
              Dashboard
            </Link>

            <Link
              to="/cashier/billing"
              className="block px-4 py-3 rounded-lg hover:bg-slate-700"
            >
              Billing
            </Link>

            <Link
              to="/cashier/view-price"
              className="block px-4 py-3 rounded-lg hover:bg-slate-700"
            >
              View Price
            </Link>
          </>
        )}

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 mt-8"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;