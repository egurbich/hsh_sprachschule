import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CourseList from "./components/CourseList";
import PriceList from "./components/PriceList";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<h1 className="text-3xl font-bold">Herzlich wilkomen!</h1>} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/prices" element={<PriceList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
