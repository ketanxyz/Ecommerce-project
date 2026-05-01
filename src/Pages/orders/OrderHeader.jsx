import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';

const OrderHeader = ({ order }) => {
  return (
    <div className="order-header">
      <div className="order-header-left-section">
        <div>
          <div className="order-header-label">Order Placed</div>
          <div className="order-header-value">{dayjs(order.orderTimeMs).format('MMM D, YYYY')}</div>
        </div>
        <div>
          <div className="order-header-label">Total</div>
          <div className="order-header-value">{formatMoney(order.totalCostCents)}</div>
        </div>
        <div>
          <div className="order-header-label">Items</div>
          <div className="order-header-value">{order.products?.length || 0}</div>
        </div>
      </div>
      <div className="order-header-right-section">
        <div className="order-header-label">Order ID</div>
        <div className="order-id-value">{order.id?.slice(0, 8).toUpperCase()}...</div>
      </div>
    </div>
  );
};

export default OrderHeader;
