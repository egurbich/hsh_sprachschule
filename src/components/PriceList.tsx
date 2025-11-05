import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCoursesEnsured, addCartItem, getCartItems, CourseRecord, CartRecord } from '../utils/db';

interface CourseSelection {
  courseId: number;
  peopleCount: number;
  needsApartment: boolean;
}

const PriceList: React.FC = () => {
  const [courses, setCourses] = useState<CourseRecord[]>([]);
  const [selection, setSelection] = useState<CourseSelection>({
    courseId: 0,
    peopleCount: 1,
    needsApartment: false,
  });
  const [cartItems, setCartItems] = useState<CartRecord[]>([]);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedCourses, loadedCartItems] = await Promise.all([
          getAllCoursesEnsured(),
          getCartItems()
        ]);
        setCourses(loadedCourses);
        setCartItems(loadedCartItems);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    loadData();
  }, []);

  const handlePeopleCountChange = (courseId: number, change: number) => {
    if (selection.courseId === courseId) {
      const newCount = Math.max(1, selection.peopleCount + change);
      setSelection(prev => ({ ...prev, peopleCount: newCount }));
    }
  };

  const calculateTotal = () => {
    if (!selection.courseId) return 0;
    const course = courses.find(c => c.course_id === selection.courseId);
    if (!course) return 0;

    const courseTotal = course.price * selection.peopleCount;
    const apartmentCost = selection.needsApartment ? 500 : 0;
    return courseTotal + apartmentCost;
  };

  const handleAddToCart = async () => {
    if (!selection.courseId) return;

    const cartItem: CartRecord = {
      course_id: selection.courseId,
      price: courses.find(c => c.course_id === selection.courseId)?.price || 0,
      people_qty: selection.peopleCount,
      needs_appartment: selection.needsApartment,
      total: calculateTotal(),
    };

    try {
      console.log('Adding to cart:', cartItem);
      const newId = await addCartItem(cartItem);
      console.log('Added item with ID:', newId);
      
      setAddedToCart(true);
      const updatedCartItems = await getCartItems();
      console.log('Updated cart items:', updatedCartItems);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const isInCart = (courseId: number) => 
    cartItems.some(item => item.course_id === courseId);

  return (
    <div style={{ padding: "2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #eee" }}>
            <th style={{ padding: "1rem", textAlign: "left" }}>Select</th>
            <th style={{ padding: "1rem", textAlign: "left" }}>Image</th>
            <th style={{ padding: "1rem", textAlign: "left" }}>Course</th>
            <th style={{ padding: "1rem", textAlign: "left" }}>Duration</th>
            <th style={{ padding: "1rem", textAlign: "left" }}>People</th>
            <th style={{ padding: "1rem", textAlign: "right" }}>Price</th>
            <th style={{ padding: "1rem", textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.course_id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "1rem" }}>
                <input
                  type="radio"
                  name="courseSelection"
                  checked={selection.courseId === course.course_id}
                  onChange={() => setSelection(prev => ({
                    ...prev,
                    courseId: course.course_id,
                    peopleCount: 1
                  }))}
                  style={{ 
                    width: "20px", 
                    height: "20px",
                    cursor: "pointer"
                  }}
                />
              </td>
              <td style={{ padding: "1rem" }}>
                <img
                  src={course.image.startsWith("/") ? course.image : `img/${course.image}`}
                  alt={course.title}
                  style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                />
              </td>
              <td style={{ padding: "1rem" }}>{course.title}</td>
              <td style={{ padding: "1rem" }}>{course.duration} month{course.duration > 1 ? "s" : ""}</td>
              <td style={{ padding: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <button
                    onClick={() => handlePeopleCountChange(course.course_id, -1)}
                    disabled={selection.courseId !== course.course_id}
                    style={{
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      cursor: selection.courseId === course.course_id ? "pointer" : "not-allowed",
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={selection.courseId === course.course_id ? selection.peopleCount : 1}
                    readOnly
                    style={{
                      width: "40px",
                      padding: "0.25rem",
                      textAlign: "center",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <button
                    onClick={() => handlePeopleCountChange(course.course_id, 1)}
                    disabled={selection.courseId !== course.course_id}
                    style={{
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      cursor: selection.courseId === course.course_id ? "pointer" : "not-allowed",
                    }}
                  >
                    +
                  </button>
                </div>
              </td>
              <td style={{ padding: "1rem", textAlign: "right" }}>
                {selection.courseId === course.course_id 
                    ? (course.price * selection.peopleCount).toLocaleString()
                    : course.price.toLocaleString()}
              </td>
              <td style={{ padding: "1rem", textAlign: "center" }}>
                <button
                  onClick={handleAddToCart}
                  disabled={selection.courseId !== course.course_id}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: isInCart(course.course_id) ? "#ff9800" : "#6c96a4",
                    color: "white",
                    cursor: selection.courseId === course.course_id ? "pointer" : "not-allowed",
                    opacity: selection.courseId === course.course_id ? 1 : 0.5,
                  }}
                >
                  {isInCart(course.course_id) ? "Update" : "Add to cart"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ 
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px"
      }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={selection.needsApartment}
            onChange={(e) => setSelection(prev => ({ ...prev, needsApartment: e.target.checked }))}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
          <span>In case if you need an apartment for the period of the course - please select this option</span>
        </label>
      </div>

      <div style={{
        marginTop: "2rem",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Total</h2>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {calculateTotal().toLocaleString()}
          </span>
        </div>

        {addedToCart && (
          <div style={{ 
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ color: "#4caf50" }}>The course added to cart</span>
            <Link
              to="/cart"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#6c96a4",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
                fontWeight: "bold",
              }}
            >
              Go to Shopping Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceList;
