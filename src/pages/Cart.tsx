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
    <div className="container-narrow">
      <h2 className="heading-primary">Shopping cart</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : items.length === 0 ? (
        <div className="cart-empty">
          <p>The cart is empty at the moment</p>
          <Link to="/prices" className="link-primary">Go to Pricelist</Link>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>People</th>
                <th>Apartment</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => {
                const course = courseById.get(it.course_id);
                return (
                  <tr key={it.cart_id}>
                    <td>
                      {course ? (
                        <Link to={`/course/${course.course_id}`} className="link-primary">
                          {course.title}
                        </Link>
                      ) : (
                        <span>Course #{it.course_id}</span>
                      )}
                    </td>
                    <td>{it.people_qty}</td>
                    <td>{it.needs_appartment ? 'Yes' : 'No'}</td>
                    <td>{it.price.toLocaleString()}€</td>
                    <td>{(it.total || 0).toLocaleString()}€</td>
                    <td>
                      <button
                        onClick={() => handleRemove(it.cart_id)}
                        className="btn-remove"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="cart-actions">
            <button onClick={handleClear} className="btn-clear">
              Clear cart
            </button>

            <div className="grand-total">
              <span className="grand-total-label">Grand total:</span>
              <strong>{grandTotal.toLocaleString()}€</strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;