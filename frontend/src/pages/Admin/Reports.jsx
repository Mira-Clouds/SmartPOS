import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

import {
  getDailySales,
  getMonthlySales,
} from "../../services/reportService";

function Reports() {
  const [dailyReport, setDailyReport] = useState({
    date: "",
    totalSales: 0,
    totalBills: 0,
  });

  const [monthlyReport, setMonthlyReport] = useState({
    month: "",
    totalSales: 0,
    totalBills: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");

      const [dailyResponse, monthlyResponse] =
        await Promise.all([
          getDailySales(),
          getMonthlySales(),
        ]);

      setDailyReport(dailyResponse.data);
      setMonthlyReport(monthlyResponse.data);
    } catch (error) {
      console.error("Error loading reports:", error);

      setError(
        "Unable to load sales reports. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex bg-slate-100">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center">
          <p className="text-xl text-slate-600">
            Loading Reports...
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Sales Reports
              </h1>

              <p className="text-gray-500 mt-2">
                View daily and monthly sales performance.
              </p>
            </div>

            <button
              onClick={loadReports}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
            >
              Refresh Reports
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-5 py-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Daily Report */}
          <section className="mb-10">

            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-800">
                Daily Sales Report
              </h2>

              <p className="text-gray-500 mt-1">
                Date: {dailyReport.date || "N/A"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Daily Sales */}
              <div className="bg-white rounded-2xl shadow p-6">
                <p className="text-gray-500 font-medium">
                  Today's Total Sales
                </p>

                <h3 className="text-3xl font-bold text-green-600 mt-3">
                  Rs.{" "}
                  {Number(
                    dailyReport.totalSales || 0
                  ).toFixed(2)}
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Total revenue generated today
                </p>
              </div>

              {/* Daily Bills */}
              <div className="bg-white rounded-2xl shadow p-6">
                <p className="text-gray-500 font-medium">
                  Today's Total Bills
                </p>

                <h3 className="text-3xl font-bold text-blue-600 mt-3">
                  {dailyReport.totalBills || 0}
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Number of bills created today
                </p>
              </div>

            </div>
          </section>

          {/* Monthly Report */}
          <section>

            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-800">
                Monthly Sales Report
              </h2>

              <p className="text-gray-500 mt-1">
                Month: {monthlyReport.month || "N/A"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Monthly Sales */}
              <div className="bg-white rounded-2xl shadow p-6">
                <p className="text-gray-500 font-medium">
                  Monthly Total Sales
                </p>

                <h3 className="text-3xl font-bold text-purple-600 mt-3">
                  Rs.{" "}
                  {Number(
                    monthlyReport.totalSales || 0
                  ).toFixed(2)}
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Total revenue generated this month
                </p>
              </div>

              {/* Monthly Bills */}
              <div className="bg-white rounded-2xl shadow p-6">
                <p className="text-gray-500 font-medium">
                  Monthly Total Bills
                </p>

                <h3 className="text-3xl font-bold text-orange-600 mt-3">
                  {monthlyReport.totalBills || 0}
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Number of bills created this month
                </p>
              </div>

            </div>
          </section>

          {/* Summary */}
          <section className="mt-10">
            <div className="bg-white rounded-2xl shadow overflow-hidden">

              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-slate-800">
                  Sales Summary
                </h2>
              </div>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-slate-800 text-white">
                    <tr>
                      <th className="text-left px-6 py-3">
                        Report
                      </th>

                      <th className="text-left px-6 py-3">
                        Period
                      </th>

                      <th className="text-left px-6 py-3">
                        Total Bills
                      </th>

                      <th className="text-left px-6 py-3">
                        Total Sales
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {/* Daily */}
                    <tr className="border-b hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium">
                        Daily Report
                      </td>

                      <td className="px-6 py-4">
                        {dailyReport.date || "N/A"}
                      </td>

                      <td className="px-6 py-4">
                        {dailyReport.totalBills || 0}
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        Rs.{" "}
                        {Number(
                          dailyReport.totalSales || 0
                        ).toFixed(2)}
                      </td>
                    </tr>

                    {/* Monthly */}
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium">
                        Monthly Report
                      </td>

                      <td className="px-6 py-4">
                        {monthlyReport.month || "N/A"}
                      </td>

                      <td className="px-6 py-4">
                        {monthlyReport.totalBills || 0}
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        Rs.{" "}
                        {Number(
                          monthlyReport.totalSales || 0
                        ).toFixed(2)}
                      </td>
                    </tr>

                  </tbody>
                </table>

              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default Reports;