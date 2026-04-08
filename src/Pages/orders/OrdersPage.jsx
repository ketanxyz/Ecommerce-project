import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import "./OrdersPage.css";
import OrdersGrid from "./OrdersGrid";

const OrdersPage = ({ cart }) => {
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

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
};

export default OrdersPage;
