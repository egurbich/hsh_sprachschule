import React, { useState } from "react";

type Course = {
  id: string;
  name: string;
};

interface CartProps {
  initialItems?: Course[];
}

/**
 * Simple shopping cart component.
 * - Shows "The cart is empty at the moment" when no items.
 * - Shows a list of course names when items exist.
 * - Includes small helpers to add a demo course, remove items, and clear the cart.
 */
const Cart: React.FC<CartProps> = ({ initialItems = [] }) => {
  const [items, setItems] = useState<Course[]>(initialItems);

  const addDemoCourse = () => {
    const nextIndex = items.length + 1;
    const newCourse: Course = {
      id: String(Date.now()) + "-" + nextIndex,
      name: `Demo Course ${nextIndex}`,
    };
    setItems((prev) => [...prev, newCourse]);
  };

  const removeCourse = (id: string) => {
    setItems((prev) => prev.filter((c) => c.id !== id));
  };

  const clearCart = () => setItems([]);

  return (
    <div style={{ 
      maxWidth: 480, 
      margin: "40px auto",
      padding: "20px",
      fontFamily: "sans-serif",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <h2 style={{ marginBottom: "20px" }}>Shopping cart</h2>

      {items.length === 0 ? (
        <p style={{ color: "#6c757d" }}>The cart is empty at the moment</p>
      ) : (
        <ul style={{ 
          paddingLeft: 0,
          listStyle: "none",
          margin: "0 auto",
          maxWidth: "400px"
        }}>
          {items.map((course) => (
            <li key={course.id} style={{ 
              marginBottom: 10,
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: "4px"
            }}>
              <span>{course.name}</span>
              <button 
                onClick={() => removeCourse(course.id)} 
                aria-label={`Remove ${course.name}`}
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid #dc3545",
                  backgroundColor: "transparent",
                  color: "#dc3545",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ 
        marginTop: 20,
        display: "flex",
        gap: 12,
        justifyContent: "center"
      }}>
        <button 
          onClick={addDemoCourse}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #0d6efd",
            backgroundColor: "#0d6efd",
            color: "white",
            cursor: "pointer"
          }}
        >
          Add demo course
        </button>
        <button 
          onClick={clearCart} 
          disabled={items.length === 0}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #6c757d",
            backgroundColor: items.length === 0 ? "#e9ecef" : "#6c757d",
            color: "white",
            cursor: items.length === 0 ? "not-allowed" : "pointer"
          }}
        >
          Clear cart
        </button>
      </div>
    </div>
  );
};

export default Cart;