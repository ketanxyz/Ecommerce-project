import axios from 'axios';
import dayjs from 'dayjs';
import { Fragment } from 'react';
import { useNavigate } from 'react-router';

const OrderDetailsGrid = ({ order, loadCart }) => {
  const navigate = useNavigate();

  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct, idx) => {
        const addToCart = async () => {
          await axios.post('/api/cart-items', { productId: orderProduct.product.id, quantity: 1 });
          await loadCart();
        };

        return (
          <Fragment key={orderProduct.product.id}>
            {/* Separator between items */}
            {idx > 0 && <div className="order-product-sep" />}

            <div className="product-image-container">
              <img src={orderProduct.product.image} alt={orderProduct.product.name} />
            </div>

            <div className="product-details">
              <div className="product-name">{orderProduct.product.name}</div>
              <div className="product-delivery-date">
                {dayjs(orderProduct.estimatedDeliveryTimeMs).isAfter(dayjs())
                  ? `Arriving ${dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMM D')}`
                  : `Delivered ${dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMM D')}`}
              </div>
              <div className="product-quantity">Qty: {orderProduct.quantity}</div>
              <button className="buy-again-button" onClick={addToCart}>
                <img className="buy-again-icon" src="/images/icons/buy-again.png" alt="" />
                Add to Cart
              </button>
            </div>

            <div className="product-actions">
              <button
                className="track-package-button"
                onClick={() => navigate(`/tracking/${order.id}/${orderProduct.product.id}`)}
              >
                Track Package
              </button>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default OrderDetailsGrid;
