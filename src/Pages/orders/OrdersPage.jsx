import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import Header from "../../components/navbar/Header";
import FooterSection from "../../components/footer/FooterSection";
import OrdersGrid from "./OrdersGrid";
import "./OrdersPage.css";

const OrdersPage = ({ cart, loadCart }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/orders?expand=products")
      .then(r  => setOrders(r.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <title>My Orders – SimpleCart</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="orders-page__header">
          <h1 className="orders-page__title">My Orders</h1>
          <Link to="/" className="orders-page__continue">← Continue Shopping</Link>
        </div>

        {loading ? (
          <div className="orders-loading">
            {[...Array(2)].map((_, i) => <div key={i} className="orders-skeleton" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty__icon">📦</div>
            <h2>No orders yet</h2>
            <p>Once you place an order, it will appear here.</p>
            <Link to="/" className="orders-empty__btn">Start Shopping</Link>
          </div>
        ) : (
          <OrdersGrid orders={orders} loadCart={loadCart} />
        )}
      </div>

      <FooterSection />
    </>
  );
};

export default OrdersPage;
