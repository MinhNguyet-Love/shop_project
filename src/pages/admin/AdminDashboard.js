import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [shippings, setShippings] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "", price: "", stock: "", category_id: "", seller_id: "", image_url: ""
  });
  const [page, setPage] = useState(1); // Thêm phân trang
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productSnapshot = await getDocs(collection(db, "products"));
        setProducts(productSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        const orderSnapshot = await getDocs(collection(db, "orders"));
        setOrders(orderSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        const userSnapshot = await getDocs(collection(db, "users"));
        setUsers(userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        const shippingSnapshot = await getDocs(collection(db, "shipping"));
        setShippings(shippingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productRef = await addDoc(collection(db, "products"), {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        created_at: new Date().toISOString(),
      });
      await addDoc(collection(db, "inventory_logs"), {
        product_id: productRef.id,
        change_amount: parseInt(newProduct.stock),
        reason: "Initial stock",
        change_date: new Date().toISOString(),
        user_id: auth.currentUser.uid,
      });
      setNewProduct({ name: "", price: "", stock: "", category_id: "", seller_id: "", image_url: "" });
      alert("Product added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      const oldProduct = products.find((p) => p.id === id);
      await updateDoc(doc(db, "products", id), updatedData);
      if (updatedData.stock !== oldProduct.stock) {
        await addDoc(collection(db, "inventory_logs"), {
          product_id: id,
          change_amount: updatedData.stock - oldProduct.stock,
          reason: "Stock update",
          change_date: new Date().toISOString(),
          user_id: auth.currentUser.uid,
        });
      }
      alert("Product updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        alert("Product deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleUpdateShipping = async (shippingId, updatedData) => {
    try {
      await updateDoc(doc(db, "shipping", shippingId), updatedData);
      alert("Shipping updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating shipping:", error);
    }
  };

  const paginatedItems = (items) =>
    items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="container my-5">
      <h2>Admin Dashboard</h2>

      {/* Quản lý sản phẩm */}
      <h3>Manage Products</h3>
      <form onSubmit={handleAddProduct} className="mb-4">
        <div className="row">
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success">Add Product</button>
          </div>
        </div>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems(products).map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() =>
                    handleUpdateProduct(product.id, { stock: product.stock + 10 })
                  }
                >
                  Increase Stock
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          disabled={page * itemsPerPage >= products.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Quản lý vận chuyển */}
      <h3>Manage Shipping</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Method</th>
            <th>Status</th>
            <th>Tracking Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems(shippings).map((shipping) => (
            <tr key={shipping.id}>
              <td>{shipping.order_id}</td>
              <td>{shipping.shipping_method}</td>
              <td>{shipping.status}</td>
              <td>{shipping.tracking_number || "N/A"}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() =>
                    handleUpdateShipping(shipping.id, {
                      status: "Shipped",
                      tracking_number: "TRK" + Math.random().toString(36).substr(2, 9),
                      shipped_date: new Date().toISOString(),
                    })
                  }
                >
                  Mark as Shipped
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;