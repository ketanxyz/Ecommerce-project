import { formatMoney } from "../../utils/money";

const PaymentSummary = ({ payementSummary }) => {
  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>

      {payementSummary && (
        <>
          <div className="payment-summary-row">
            <div>Items ({payementSummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(payementSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(payementSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(payementSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(payementSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(payementSummary.totalCostCents)}
            </div>
          </div>

          <button className="place-order-button button-primary">
            Place your order
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentSummary;
