import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./Pages/home/HomePage";
import CheckoutPage from "./Pages/checkout/CheckoutPage";
import OrdersPage from "./Pages/orders/OrdersPage";
import TrackingPage from "./Pages/Tracking/TrackingPage";

const App = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchAppData = async () => {
      const response = await axios
        .get("/api/cart-items?expand=product")
        setCart(response.data);
    };

    fetchAppData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage cart={cart} />} />
    </Routes>
  );
};

export default App;
