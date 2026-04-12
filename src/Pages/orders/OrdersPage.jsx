import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../components/navbar/Header";
import "./OrdersPage.css";
import OrdersGrid from "./OrdersGrid";
import FooterSection from "../../components/footer/FooterSection";

const OrdersPage = ({ cart, loadCart }) => {
  const [orders, setOrders] = useState([]);

    useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios
        .get("/api/orders?expand=products")
        setOrders(response.data);
    };

    fetchOrders();
  }, []);


  return (
    <>
      <title>SimpleCart-Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>

      <FooterSection />      
    </>
  );
};

export default OrdersPage;
