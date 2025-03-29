import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [shippingInfo, setShippingInfo] = useState({ address: "", method: "Standard" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");

        const cartSnapshot = await getDocs(collection(db, "carts"));
        const userCart = cartSnapshot.docs.find(
          (doc) => doc.data().customer_id === user.uid
        );

        if (userCart) {
          const cartItemsSnapshot = await getDocs(
            collection(db, `carts/${userCart.id}/cart_items`)
          );
          const items = await Promise.all(
            cartItemsSnapshot.docs.map(async (itemDoc) => {
              const productDoc = await getDoc(
                doc(db, "products", itemDoc.data().product_id)
              );
              return {
                id: itemDoc.id,
                ...itemDoc.data(),
                product: productDoc.exists() ? productDoc.data() : null,
              };
            })
          );
          setCartItems(items);
          const total = items.reduce(
            (sum, item) => sum + (item.product?.price || 0) * item.quantity,
            0
          );
          setTotalAmount(total);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const applyPromoCode = async () => {
    try {
      const promoSnapshot = await getDocs(collection(db, "promotions"));
      const promo = promoSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .find((p) => p.code === promoCode && p.is_active);

      if (promo && totalAmount >= promo.min_order_amount) {
        const discountValue =
          promo.discount_type === "percentage"
            ? totalAmount * (promo.discount_value / 100)
            : promo.discount_value;
        setDiscount(discountValue);
        alert("Promo code applied!");
      } else {
        alert("Invalid or inactive promo code.");
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      const finalAmount = totalAmount - discount;
      const orderData = {
        customer_id: user.uid,
        promotion_id: promoCode || null,
        order_date: new Date().toISOString(),
        total_amount: finalAmount,
        status: "Pending",
        order_details: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product.price,
        })),
      };
      const orderRef = await addDoc(collection(db, "orders"), orderData);

      await addDoc(collection(db, "shipping"), {
        order_id: orderRef.id,
        shipping_method: shippingInfo.method,
        shipping_cost: shippingInfo.method === "Standard" ? 5 : 15,
        address: shippingInfo.address,
        status: "Processing",
        tracking_number: "",
        shipped_date: null,
        delivered_date: null,
      });

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container my-5">
      <h2>Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Shipping Information</h4>
          <form onSubmit={handleCheckout}>
            <div className="mb-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                value={shippingInfo.address}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, address: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label>Shipping Method</label>
              <select
                className="form-control"
                value={shippingInfo.method}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, method: e.target.value })
                }
              >
                <option value="Standard">Standard ($5)</option>
                <option value="Express">Express ($15)</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Promo Code</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={applyPromoCode}
                >
                  Apply
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Place Order
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          {cartItems.map((item) => (
            <div key={item.id} className="d-flex justify-content-between">
              <span>{item.product?.name}</span>
              <span>${(item.product?.price || 0) * item.quantity}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>${totalAmount}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Discount:</span>
            <span>-${discount}</span>
          </div>
          <div className="d-flex justify-content-between">
            <strong>Total:</strong>
            <strong>${totalAmount - discount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;