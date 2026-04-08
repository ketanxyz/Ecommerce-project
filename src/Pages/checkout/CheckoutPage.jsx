import axios from "axios";
import { useState, useEffect } from "react";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import CheckoutHeader from "../../components/checkoutHeader";
import "./CheckoutPage.css";



const CheckoutPage = ({ cart, loadCart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

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
  }, [cart]);

  return (
    <>
      <title>SimpleCart - Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
