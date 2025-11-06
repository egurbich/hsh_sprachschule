import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CourseList from "./pages/CourseList";
import CourseDetail from "./pages/CourseDetail";
import PriceList from "./pages/PriceList";
import Cart from "./pages/Cart";
import AddCourse from "./pages/AddCourse";
import { seedDefaultCoursesIfEmpty } from "./utils/db";
import "./App.css";

/*
  File: App.tsx
  Purpose: Top-level application shell and routing.
  How: Initializes default data (IndexedDB seeding) on mount, renders Navbar/Footer,
       and defines client-side routes for all pages using React Router.
  Props: none
  Hooks: useEffect
  External: react-router-dom (BrowserRouter, Routes, Route)
*/

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
