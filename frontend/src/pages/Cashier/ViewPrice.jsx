import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import {
  getProducts,
} from "../../services/productService";

function ViewPrice() {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =========================
  // LOAD PRODUCTS
  // =========================

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true);

        const response =
          await getProducts();

        setProducts(
          response.data || []
        );

      } catch (error) {

        console.error(
          "Error loading products:",
          error
        );

        setError(
          "Unable to load products."
        );

      } finally {

        setLoading(false);

      }

    };

    loadProducts();

  }, []);


  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts =
    products.filter((product) => {

      const searchText =
        search.toLowerCase();

      const productName =
        product.name
          ?.toLowerCase() || "";

      const categoryName =
        product.category?.name
          ?.toLowerCase() || "";

      return (
        productName.includes(searchText) ||
        categoryName.includes(searchText)
      );

    });


  // =========================
  // CLEAR SEARCH
  // =========================

  const clearSearch = () => {

    setSearch("");

    setSelectedProduct(null);

  };


  // =========================
  // UI
  // =========================

  return (

    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-slate-800">
              View Product Price
            </h1>

            <p className="text-gray-500 mt-2">
              Search products and check price
              and stock availability.
            </p>

          </div>


          {/* SEARCH BOX */}

          <div className="bg-white rounded-2xl shadow p-6 mb-8">

            <label className="block font-semibold text-slate-700 mb-3">
              Search Product
            </label>

            <div className="flex flex-col md:flex-row gap-3">

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedProduct(null);
                }}
                placeholder="Search by product name or category..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={clearSearch}
                className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Clear
              </button>

            </div>

          </div>


          {/* ERROR MESSAGE */}

          {error && (

            <div className="bg-red-100 border border-red-300 text-red-700 px-5 py-4 rounded-lg mb-6">

              {error}

            </div>

          )}


          {/* SELECTED PRODUCT */}

          {selectedProduct && (

            <div className="bg-white rounded-2xl shadow-lg p-7 mb-8">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-gray-500 text-sm">
                    Selected Product
                  </p>

                  <h2 className="text-2xl font-bold text-slate-800">
                    {selectedProduct.name}
                  </h2>

                </div>

                <div className="text-4xl">
                  🛒
                </div>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">


                {/* PRODUCT ID */}

                <div className="bg-slate-100 rounded-xl p-5">

                  <p className="text-gray-500 text-sm">
                    Product ID
                  </p>

                  <p className="text-xl font-bold mt-2">
                    {selectedProduct.id}
                  </p>

                </div>


                {/* CATEGORY */}

                <div className="bg-slate-100 rounded-xl p-5">

                  <p className="text-gray-500 text-sm">
                    Category
                  </p>

                  <p className="text-xl font-bold mt-2">
                    {
                      selectedProduct.category?.name ||
                      "No Category"
                    }
                  </p>

                </div>


                {/* PRICE */}

                <div className="bg-green-50 rounded-xl p-5">

                  <p className="text-gray-500 text-sm">
                    Price
                  </p>

                  <p className="text-2xl font-bold text-green-600 mt-2">

                    Rs.{" "}

                    {Number(
                      selectedProduct.price || 0
                    ).toFixed(2)}

                  </p>

                </div>


                {/* STOCK */}

                <div className="bg-blue-50 rounded-xl p-5">

                  <p className="text-gray-500 text-sm">
                    Available Stock
                  </p>

                  <p
                    className={`text-2xl font-bold mt-2 ${
                      selectedProduct.quantity > 0
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >

                    {selectedProduct.quantity}

                  </p>

                </div>

              </div>


              {/* STOCK STATUS */}

              <div className="mt-6">

                {selectedProduct.quantity > 0 ? (

                  <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                    ✓ In Stock

                  </span>

                ) : (

                  <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">

                    Out of Stock

                  </span>

                )}

              </div>

            </div>

          )}


          {/* PRODUCTS TABLE */}

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <div className="p-6 border-b">

              <div className="flex items-center justify-between">

                <h2 className="text-xl font-bold text-slate-800">
                  Products
                </h2>

                <p className="text-gray-500 text-sm">
                  {
                    filteredProducts.length
                  }{" "}
                  product(s)
                </p>

              </div>

            </div>


            {loading ? (

              <div className="text-center py-12">

                <p className="text-gray-500">
                  Loading Products...
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-slate-800 text-white">

                    <tr>

                      <th className="text-left px-6 py-3">
                        ID
                      </th>

                      <th className="text-left px-6 py-3">
                        Product
                      </th>

                      <th className="text-left px-6 py-3">
                        Category
                      </th>

                      <th className="text-left px-6 py-3">
                        Price
                      </th>

                      <th className="text-left px-6 py-3">
                        Stock
                      </th>

                      <th className="text-left px-6 py-3">
                        Status
                      </th>

                      <th className="text-left px-6 py-3">
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredProducts.length > 0 ? (

                      filteredProducts.map(
                        (product) => (

                          <tr
                            key={product.id}
                            className="border-b hover:bg-slate-50"
                          >

                            <td className="px-6 py-4">
                              {product.id}
                            </td>


                            <td className="px-6 py-4 font-semibold">
                              {product.name}
                            </td>


                            <td className="px-6 py-4">

                              {
                                product.category?.name ||
                                "No Category"
                              }

                            </td>


                            <td className="px-6 py-4 font-semibold">

                              Rs.{" "}

                              {Number(
                                product.price || 0
                              ).toFixed(2)}

                            </td>


                            <td className="px-6 py-4">
                              {product.quantity}
                            </td>


                            <td className="px-6 py-4">

                              {product.quantity > 0 ? (

                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

                                  In Stock

                                </span>

                              ) : (

                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">

                                  Out of Stock

                                </span>

                              )}

                            </td>


                            <td className="px-6 py-4">

                              <button
                                onClick={() =>
                                  setSelectedProduct(
                                    product
                                  )
                                }
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                              >
                                View
                              </button>

                            </td>

                          </tr>

                        )
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="7"
                          className="text-center py-12 text-gray-500"
                        >
                          No Products Found
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>

  );

}

export default ViewPrice;