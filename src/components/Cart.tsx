import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getCartItems, removeCartItem, clearCart, getAllCourses, CartRecord, CourseRecord } from "../utils/db";

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartRecord[]>([]);
  const [courses, setCourses] = useState<CourseRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const [cart, allCourses] = await Promise.all([getCartItems(), getAllCourses()]);
      setItems(cart);
      setCourses(allCourses);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener('cart:updated', handler);
    return () => window.removeEventListener('cart:updated', handler);
  }, []);

  const courseById = useMemo(() => {
    const map = new Map<number, CourseRecord>();
    courses.forEach(c => map.set(c.course_id, c));
    return map;
  }, [courses]);

  const grandTotal = useMemo(() => items.reduce((sum, it) => sum + (it.total || 0), 0), [items]);

  const handleRemove = async (cart_id?: number) => {
    if (typeof cart_id !== 'number') return;
    await removeCartItem(cart_id);
    window.dispatchEvent(new Event('cart:updated'));
  };

  const handleClear = async () => {
    await clearCart();
    window.dispatchEvent(new Event('cart:updated'));
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "20px" }}>
  <h2 style={{ marginBottom: 20, color: '#33373a' }}>Shopping cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <div style={{
          background: "#f8f9fa",
          borderRadius: 8,
          padding: 20,
          textAlign: "center"
        }}>
          <p style={{ color: "#6c757d", marginBottom: 16 }}>The cart is empty at the moment</p>
          <Link to="/prices" style={{ textDecoration: "none", color: "#0d6efd", fontWeight: 600 }}>Go to Pricelist</Link>
        </div>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #eee" }}>
                <th style={{ textAlign: "left", padding: 12 }}>Course</th>
                <th style={{ textAlign: "left", padding: 12 }}>People</th>
                <th style={{ textAlign: "left", padding: 12 }}>Apartment</th>
                <th style={{ textAlign: "right", padding: 12 }}>Price</th>
                <th style={{ textAlign: "right", padding: 12 }}>Total</th>
                <th style={{ textAlign: "center", padding: 12 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => {
                const course = courseById.get(it.course_id);
                return (
                  <tr key={it.cart_id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 12 }}>
                      {course ? (
                        <Link to={`/course/${course.course_id}`} style={{ textDecoration: "none", color: "#0d6efd" }}>
                          {course.title}
                        </Link>
                      ) : (
                        <span>Course #{it.course_id}</span>
                      )}
                    </td>
                    <td style={{ padding: 12 }}>{it.people_qty}</td>
                    <td style={{ padding: 12 }}>{it.needs_appartment ? 'Yes' : 'No'}</td>
                    <td style={{ padding: 12, textAlign: "right" }}>{it.price.toLocaleString()}</td>
                    <td style={{ padding: 12, textAlign: "right" }}>{(it.total || 0).toLocaleString()}</td>
                    <td style={{ padding: 12, textAlign: "center" }}>
                      <button
                        onClick={() => handleRemove(it.cart_id)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: 4,
                          border: "1px solid #dc3545",
                          background: "transparent",
                          color: "#dc3545",
                          cursor: "pointer"
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
            <button
              onClick={handleClear}
              style={{
                padding: "8px 14px",
                borderRadius: 4,
                border: "1px solid #6c757d",
                background: "#6c757d",
                color: "white",
                cursor: "pointer"
              }}
            >
              Clear cart
            </button>

            <div style={{ fontSize: 18 }}>
              <span style={{ marginRight: 8, color: "#6c757d" }}>Grand total:</span>
              <strong>{grandTotal.toLocaleString()}</strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;