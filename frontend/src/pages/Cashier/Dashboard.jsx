import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import { getBills } from "../../services/billService";

function Dashboard() {
  const navigate = useNavigate();

  const [todaySales, setTodaySales] = useState(0);
  const [todayBills, setTodayBills] = useState(0);
  const [loading, setLoading] = useState(true);

  const username =
    localStorage.getItem("username") || "Cashier";

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const response = await getBills();

        const bills = response.data || [];

        const today = new Date();

        const todayDate = today.toLocaleDateString(
          "en-CA"
        );

        const todayBillList = bills.filter(
          (bill) => {
            if (!bill.billDate) {
              return false;
            }

            const billDate = new Date(
              bill.billDate
            ).toLocaleDateString("en-CA");

            return billDate === todayDate;
          }
        );

        const totalSales =
          todayBillList.reduce(
            (total, bill) =>
              total +
              Number(bill.totalAmount || 0),
            0
          );

        setTodayBills(todayBillList.length);
        setTodaySales(totalSales);
      } catch (error) {
        console.error(
          "Error loading cashier dashboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Cashier Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back, {username}
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

            {/* Today's Sales */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 font-medium">
                    Today's Sales
                  </p>

                  <h2 className="text-3xl font-bold text-green-600 mt-3">
                    {loading
                      ? "Loading..."
                      : `Rs. ${Number(
                          todaySales
                        ).toFixed(2)}`}
                  </h2>
                </div>

                <div className="text-4xl">
                  💰
                </div>
              </div>
            </div>

            {/* Today's Bills */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 font-medium">
                    Today's Bills
                  </p>

                  <h2 className="text-3xl font-bold text-blue-600 mt-3">
                    {loading
                      ? "Loading..."
                      : todayBills}
                  </h2>
                </div>

                <div className="text-4xl">
                  🧾
                </div>
              </div>
            </div>

          </div>

          {/* Main Actions */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-5">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* New Bill */}
              <button
                onClick={() =>
                  navigate("/cashier/billing")
                }
                className="bg-white shadow rounded-2xl p-7 text-left hover:shadow-lg hover:-translate-y-1 transition"
              >
                <div className="text-4xl mb-4">
                  🛒
                </div>

                <h3 className="text-xl font-bold text-slate-800">
                  New Bill
                </h3>

                <p className="text-gray-500 mt-2">
                  Start a new customer billing
                  transaction.
                </p>

                <p className="text-blue-600 font-semibold mt-5">
                  Start Billing →
                </p>
              </button>

              {/* View Price */}
              <button
                onClick={() =>
                  navigate(
                    "/cashier/view-price"
                  )
                }
                className="bg-white shadow rounded-2xl p-7 text-left hover:shadow-lg hover:-translate-y-1 transition"
              >
                <div className="text-4xl mb-4">
                  🔍
                </div>

                <h3 className="text-xl font-bold text-slate-800">
                  View Price
                </h3>

                <p className="text-gray-500 mt-2">
                  Search products and quickly
                  check prices.
                </p>

                <p className="text-blue-600 font-semibold mt-5">
                  Check Price →
                </p>
              </button>

              {/* Billing History */}
              <button
                onClick={() =>
                  navigate("/cashier/billing")
                }
                className="bg-white shadow rounded-2xl p-7 text-left hover:shadow-lg hover:-translate-y-1 transition"
              >
                <div className="text-4xl mb-4">
                  📋
                </div>

                <h3 className="text-xl font-bold text-slate-800">
                  Billing
                </h3>

                <p className="text-gray-500 mt-2">
                  Create bills and complete
                  customer purchases.
                </p>

                <p className="text-blue-600 font-semibold mt-5">
                  Open Billing →
                </p>
              </button>

            </div>
          </section>

          {/* Today's Information */}
          <section className="mt-10">
            <div className="bg-white shadow rounded-2xl p-6">

              <h2 className="text-xl font-bold text-slate-800 mb-5">
                Today's Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                  <p className="text-gray-500 text-sm">
                    Cashier
                  </p>

                  <p className="font-semibold mt-1">
                    {username}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Bills Created
                  </p>

                  <p className="font-semibold mt-1">
                    {todayBills}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Total Sales
                  </p>

                  <p className="font-semibold mt-1">
                    Rs.{" "}
                    {Number(
                      todaySales
                    ).toFixed(2)}
                  </p>
                </div>

              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;