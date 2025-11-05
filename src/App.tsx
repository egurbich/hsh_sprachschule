import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CourseList from "./components/CourseList";
import PriceList from "./components/PriceList";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import CourseDetail from "./pages/CourseDetail";
import AddCourse from "./pages/AddCourse";
import { seedDefaultCoursesIfEmpty } from "./utils/db";
import "./App.css";

function App() {
  useEffect(() => {
    // Ensure defaults exist (no-op if already seeded)
    seedDefaultCoursesIfEmpty().catch((err: Error) => {
      // Surface to console; do not block app
      // eslint-disable-next-line no-console
      console.error("Failed to seed default courses:", err);
    });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/prices" element={<PriceList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-course" element={<AddCourse />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
