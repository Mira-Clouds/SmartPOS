import Sidebar from "../components/Sidebar";

function Products() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", width: "100%" }}>
        <h1>Products</h1>

        <button>Add Product</button>
        <div>
          <input placeholder="Product Name" />

          <br /><br />

          <input placeholder="Price" />

          <br /><br />

          <input placeholder="Stock" />

          <br /><br />

          <button>Save Product</button>
        </div>

        <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Burger</td>
              <td>1000</td>
              <td>50</td>
            </tr>

            <tr>
              <td>2</td>
              <td>Pizza</td>
              <td>2000</td>
              <td>20</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Products;