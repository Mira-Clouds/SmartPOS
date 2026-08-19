import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

import {
  getProducts,
  addProduct,
  deleteProduct,
} from "../../services/productService";

import {
  getCategories,
} from "../../services/categoryService";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error(
        "Error loading products:",
        error
      );
    }
  };

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
    loadProducts();
    loadCategories();
  }, []);

  const saveProduct = async (e) => {
    e.preventDefault();

    if (!categoryId) {
      alert("Please select a category");
      return;
    }

    try {
      setLoading(true);

      const product = {
        name: name,
        price: Number(price),
        quantity: Number(quantity),

        category: {
          id: Number(categoryId),
        },
      };

      await addProduct(product);

      alert("Product Added Successfully");

      setName("");
      setPrice("");
      setQuantity("");
      setCategoryId("");

      await loadProducts();
    } catch (error) {
      console.error(
        "Error saving product:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to save product"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      alert("Product Deleted Successfully");

      await loadProducts();
    } catch (error) {
      console.error(
        "Error deleting product:",
        error
      );

      alert("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">
            Product Management
          </h1>

          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-5">
              Add New Product
            </h2>

            <form
              onSubmit={saveProduct}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div>
                <label className="block mb-2 font-medium">
                  Product Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter product name"
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Price
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="Enter price"
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                  placeholder="Enter stock quantity"
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Category
                </label>

                <select
                  value={categoryId}
                  onChange={(e) =>
                    setCategoryId(e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-2 bg-white"
                  required
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  {loading
                    ? "Saving..."
                    : "Add Product"}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold">
                Product List
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="text-left px-5 py-3">
                      ID
                    </th>

                    <th className="text-left px-5 py-3">
                      Name
                    </th>

                    <th className="text-left px-5 py-3">
                      Category
                    </th>

                    <th className="text-left px-5 py-3">
                      Price
                    </th>

                    <th className="text-left px-5 py-3">
                      Stock
                    </th>

                    <th className="text-left px-5 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          {product.id}
                        </td>

                        <td className="px-5 py-4 font-medium">
                          {product.name}
                        </td>

                        <td className="px-5 py-4">
                          {product.category?.name ||
                            "No Category"}
                        </td>

                        <td className="px-5 py-4">
                          Rs.{" "}
                          {Number(
                            product.price
                          ).toFixed(2)}
                        </td>

                        <td className="px-5 py-4">
                          {product.quantity}
                        </td>

                        <td className="px-5 py-4">
                          <button
                            onClick={() =>
                              handleDelete(
                                product.id
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-10 text-gray-500"
                      >
                        No Products Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Products;