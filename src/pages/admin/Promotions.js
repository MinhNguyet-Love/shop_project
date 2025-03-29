import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [newPromo, setNewPromo] = useState({
    code: "",
    discount_type: "percentage",
    discount_value: "",
    start_date: "",
    end_date: "",
    min_order_amount: "",
    max_usage: "",
    is_active: true,
  });
  const [editingPromo, setEditingPromo] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const promoSnapshot = await getDocs(collection(db, "promotions"));
        setPromotions(promoSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };
    fetchPromotions();
  }, []);

  const handleAddPromo = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "promotions"), {
        ...newPromo,
        discount_value: parseFloat(newPromo.discount_value),
        min_order_amount: parseFloat(newPromo.min_order_amount),
        max_usage: parseInt(newPromo.max_usage),
        start_date: new Date(newPromo.start_date).toISOString(),
        end_date: new Date(newPromo.end_date).toISOString(),
      });
      setNewPromo({
        code: "",
        discount_type: "percentage",
        discount_value: "",
        start_date: "",
        end_date: "",
        min_order_amount: "",
        max_usage: "",
        is_active: true,
      });
      alert("Promotion added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding promotion:", error);
    }
  };

  const handleEditPromo = async (promo) => {
    try {
      await updateDoc(doc(db, "promotions", promo.id), promo);
      setEditingPromo(null);
      alert("Promotion updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating promotion:", error);
    }
  };

  const handleDeletePromo = async (id) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      try {
        await deleteDoc(doc(db, "promotions", id));
        alert("Promotion deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting promotion:", error);
      }
    }
  };

  return (
    <div className="container my-5">
      <h2>Manage Promotions</h2>

      {/* Form thêm khuyến mãi */}
      <form onSubmit={handleAddPromo} className="mb-4">
        <div className="row">
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Code"
              value={newPromo.code}
              onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-control"
              value={newPromo.discount_type}
              onChange={(e) => setNewPromo({ ...newPromo, discount_type: e.target.value })}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Discount Value"
              value={newPromo.discount_value}
              onChange={(e) => setNewPromo({ ...newPromo, discount_value: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={newPromo.start_date}
              onChange={(e) => setNewPromo({ ...newPromo, start_date: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={newPromo.end_date}
              onChange={(e) => setNewPromo({ ...newPromo, end_date: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success">Add Promotion</button>
          </div>
        </div>
      </form>

      {/* Danh sách khuyến mãi */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Code</th>
            <th>Type</th>
            <th>Value</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promo) => (
            <tr key={promo.id}>
              <td>{promo.code}</td>
              <td>{promo.discount_type}</td>
              <td>{promo.discount_value}</td>
              <td>{new Date(promo.start_date).toLocaleDateString()}</td>
              <td>{new Date(promo.end_date).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => setEditingPromo(promo)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletePromo(promo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form chỉnh sửa khuyến mãi */}
      {editingPromo && (
        <div className="mt-4">
          <h4>Edit Promotion</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditPromo(editingPromo);
            }}
          >
            <input
              type="text"
              className="form-control mb-2"
              value={editingPromo.code}
              onChange={(e) =>
                setEditingPromo({ ...editingPromo, code: e.target.value })
              }
            />
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Promotions;