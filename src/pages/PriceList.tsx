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
  // Notify other parts of the app that the cart changed (Navbar badge, etc.)
  window.dispatchEvent(new Event('cart:updated'));
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const isInCart = (courseId: number) => 
    cartItems.some(item => item.course_id === courseId);

  return (
    <div className="price-list-container">
      <table className="price-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Image</th>
            <th>Course</th>
            <th>Duration</th>
            <th>People</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.course_id}>
              <td>
                <input
                  type="radio"
                  name="courseSelection"
                  checked={selection.courseId === course.course_id}
                  onChange={() => setSelection(prev => ({
                    ...prev,
                    courseId: course.course_id,
                    peopleCount: 1
                  }))}
                  className="radio-large"
                />
              </td>
              <td>
                <img
                  src={course.image.startsWith("/") ? course.image : `/img/${course.image}`}
                  alt={course.title}
                  className="course-image-thumb"
                />
              </td>
              <td>{course.title}</td>
              <td>{course.duration} month{course.duration > 1 ? "s" : ""}</td>
              <td>
                <div className="people-counter">
                  <button
                    onClick={() => handlePeopleCountChange(course.course_id, -1)}
                    disabled={selection.courseId !== course.course_id}
                    className="btn-counter"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={selection.courseId === course.course_id ? selection.peopleCount : 1}
                    readOnly
                    className="people-input"
                  />
                  <button
                    onClick={() => handlePeopleCountChange(course.course_id, 1)}
                    disabled={selection.courseId !== course.course_id}
                    className="btn-counter"
                  >
                    +
                  </button>
                </div>
              </td>
              <td>
                {selection.courseId === course.course_id 
                    ? `${(course.price * selection.peopleCount).toLocaleString()}€`
                    : `${course.price.toLocaleString()}€`}
              </td>
              <td>
                <button
                  onClick={handleAddToCart}
                  disabled={selection.courseId !== course.course_id}
                  className={`btn-secondary ${isInCart(course.course_id) ? 'btn-warning' : ''}`}
                >
                  {isInCart(course.course_id) ? "Update" : "Add to cart"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="apartment-option">
        <label className="apartment-label">
          <input
            type="checkbox"
            checked={selection.needsApartment}
            onChange={(e) => setSelection(prev => ({ ...prev, needsApartment: e.target.checked }))}
            className="checkbox-large"
          />
          <span>In case if you need an apartment for the period of the course - please select this option (+500€)</span>
        </label>
      </div>

      <div className="total-section">
        <div className="total-row">
          <h2 className="total-title">Total</h2>
          <span className="total-amount">
            {calculateTotal().toLocaleString()}€
          </span>
        </div>

        {addedToCart && (
          <div className="added-to-cart-row">
            <span className="success-message">The course added to cart</span>
            <Link to="/cart" className="btn-primary">
              Go to Shopping Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceList;
