import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../../components/Sidebar";

import {
  getDashboardData,
} from "../../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] =
    useState({
      totalSales: 0,
      totalBills: 0,
      totalProducts: 0,
      lowStockProducts: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response =
          await getDashboardData();

        setDashboard(response.data);
      } catch (error) {
        console.error(
          "Error loading dashboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex">
        <Sidebar />

        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome,{" "}
              {localStorage.getItem(
                "username"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-white shadow rounded-2xl p-6">
              <p className="text-gray-500">
                Total Sales
              </p>

              <h2 className="text-3xl font-bold mt-3 text-green-600">
                Rs.{" "}
                {Number(
                  dashboard.totalSales ||
                    0
                ).toFixed(2)}
              </h2>
            </div>

            <div className="bg-white shadow rounded-2xl p-6">
              <p className="text-gray-500">
                Total Bills
              </p>

              <h2 className="text-3xl font-bold mt-3 text-blue-600">
                {dashboard.totalBills ||
                  0}
              </h2>
            </div>

            <div className="bg-white shadow rounded-2xl p-6">
              <p className="text-gray-500">
                Total Products
              </p>

              <h2 className="text-3xl font-bold mt-3 text-purple-600">
                {dashboard.totalProducts ||
                  0}
              </h2>
            </div>

            <div className="bg-white shadow rounded-2xl p-6">
              <p className="text-gray-500">
                Low Stock Products
              </p>

              <h2 className="text-3xl font-bold mt-3 text-red-600">
                {dashboard.lowStockProducts ||
                  0}
              </h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;