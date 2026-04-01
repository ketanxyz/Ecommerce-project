import axios from "axios";
import { useState, useEffect } from "react";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import "./CheckoutPage.css";
import "./checkout-header.css";


const CheckoutPage = ({ cart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [payementSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
    let response = await axios.get(
      '/api/delivery-options?expand=estimatedDeliveryTime'
    );
    setDeliveryOptions(response.data);

    response = await axios.get("/api/payment-summary");
    setPaymentSummary(response.data);
    }

    fetchCheckoutData();
  }, []);

  return (
    <>
      <title>SimpleCart - Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              3 items
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

          <PaymentSummary payementSummary={payementSummary} />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
