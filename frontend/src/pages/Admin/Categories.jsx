import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

import {
  getCategories,
  addCategory,
} from "../../services/categoryService";

function Categories() {
  const [categories, setCategories] =
    useState([]);

  const [name, setName] = useState("");
  const [loading, setLoading] =
    useState(false);

  const loadCategories = async () => {
    try {
      const response = await getCategories();

      setCategories(response.data);
    } catch (error) {
      console.error(
        "Error loading categories:",
        error
      );
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter category name");
      return;
    }

    try {
      setLoading(true);

      const category = {
        name: name.trim(),
      };

      await addCategory(category);

      alert("Category Added Successfully");

      setName("");

      await loadCategories();
    } catch (error) {
      console.error(
        "Error adding category:",
        error
      );

      alert("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">
            Category Management
          </h1>

          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-5">
              Add New Category
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-4"
            >
              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter category name"
                className="flex-1 border rounded-lg px-4 py-2"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-6 py-2 rounded-lg font-semibold"
              >
                {loading
                  ? "Adding..."
                  : "Add Category"}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold">
                Category List
              </h2>
            </div>

            <table className="w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="text-left px-6 py-3">
                    ID
                  </th>

                  <th className="text-left px-6 py-3">
                    Category Name
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        {category.id}
                      </td>

                      <td className="px-6 py-4 font-medium">
                        {category.name}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="text-center py-10 text-gray-500"
                    >
                      No Categories Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Categories;