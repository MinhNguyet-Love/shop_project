import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="container my-5">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.product?.name || "Unknown Product"}</td>
                <td>{item.quantity}</td>
                <td>${item.product?.price * item.quantity || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;