import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import axios from 'axios';
import HomePage from "./Pages/home/HomePage";
import CheckoutPage from "./Pages/checkout/CheckoutPage";
import OrdersPage from "./Pages/orders/OrdersPage";
import TrackingPage from "./Pages/TrackingPage";

const App = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product").then((response) => {
      setCart(response.data);
    });
  }, []);


  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
  );
};

export default App;
