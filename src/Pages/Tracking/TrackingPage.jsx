import axios from 'axios';
import dayjs from 'dayjs';
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Header from '../../components/navbar/Header';
import './TrackingPage.css';

const TrackingPage = ({ cart = [] }) => {
  const { orderId, productId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    setError(null);
    axios.get(`/api/orders/${orderId}?expand=products`)
      .then(res => {
        setOrder(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch order:', err);
        setError('Could not load tracking information. The order may not exist.');
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <>
        <title>SimpleCart - Tracking</title>
        <Header cart={cart} />
        <div className="tracking-page">
          <div className="tracking-loading">
            <div className="tracking-spinner" />
            <p>Loading tracking information...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <title>SimpleCart - Tracking</title>
        <Header cart={cart} />
        <div className="tracking-page">
          <a className="back-to-orders-link link-primary" onClick={() => navigate('/orders')}>
            ← View all orders
          </a>
          <div className="tracking-error">
            <div className="tracking-error-icon">📦</div>
            <h2>Order Not Found</h2>
            <p>{error || 'The order you are looking for does not exist.'}</p>
            <button className="button-primary tracking-back-btn" onClick={() => navigate('/orders')}>
              Back to Orders
            </button>
          </div>
        </div>
      </>
    );
  }

  const orderProduct = order.products?.find(p => p.productId === productId);

  if (!orderProduct) {
    return (
      <>
        <title>SimpleCart - Tracking</title>
        <Header cart={cart} />
        <div className="tracking-page">
          <a className="back-to-orders-link link-primary" onClick={() => navigate('/orders')}>
            ← View all orders
          </a>
          <div className="tracking-error">
            <div className="tracking-error-icon">🔍</div>
            <h2>Product Not Found</h2>
            <p>This product was not found in the specified order.</p>
            <button className="button-primary tracking-back-btn" onClick={() => navigate('/orders')}>
              Back to Orders
            </button>
          </div>
        </div>
      </>
    );
  }

  const nowMs = dayjs().valueOf();
  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = nowMs - order.orderTimeMs;

  let deliveryPercent = totalDeliveryTimeMs > 0
    ? Math.min((timePassedMs / totalDeliveryTimeMs) * 100, 100)
    : 100;

  if (deliveryPercent < 0) deliveryPercent = 0;

  const isDelivered = deliveryPercent >= 100;
  const isShipped = deliveryPercent >= 33 && !isDelivered;
  const isPreparing = deliveryPercent < 33;

  const statusLabel = isDelivered ? 'Delivered' : isShipped ? 'Shipped' : 'Preparing';
  const statusColor = isDelivered ? '#16a34a' : isShipped ? '#2563eb' : '#d97706';

  return (
    <>
      <title>SimpleCart - Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <a className="back-to-orders-link link-primary" onClick={() => navigate('/orders')} style={{ cursor: 'pointer' }}>
          ← View all orders
        </a>

        <div className="tracking-card">
          {/* Status Badge */}
          <div className="tracking-status-badge" style={{ background: `${statusColor}18`, color: statusColor, borderColor: `${statusColor}30` }}>
            <span className="tracking-status-dot" style={{ background: statusColor }} />
            {statusLabel}
          </div>

          <div className="tracking-delivery-date">
            {isDelivered ? '✓ Delivered on ' : 'Arriving on '}
            <strong>{dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}</strong>
          </div>

          {/* Product Info */}
          <div className="tracking-product-row">
            {orderProduct.product?.image && (
              <div className="tracking-product-img-wrap">
                <img
                  className="tracking-product-img"
                  src={orderProduct.product.image}
                  alt={orderProduct.product.name}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
            <div className="tracking-product-info">
              <div className="tracking-product-name">
                {orderProduct.product?.name || 'Product'}
              </div>
              <div className="tracking-product-qty">Quantity: {orderProduct.quantity}</div>
              <div className="tracking-order-id">Order #{order.id?.slice(0, 8).toUpperCase()}</div>
            </div>
          </div>

          {/* Progress */}
          <div className="tracking-progress-section">
            <div className="tracking-steps">
              {['Preparing', 'Shipped', 'Delivered'].map((step, i) => {
                const stepPercent = [0, 33, 100][i];
                const isActive = (i === 0 && isPreparing) || (i === 1 && isShipped) || (i === 2 && isDelivered);
                const isDone = deliveryPercent > stepPercent;
                return (
                  <div key={step} className={`tracking-step ${isDone ? 'tracking-step--done' : ''} ${isActive ? 'tracking-step--active' : ''}`}>
                    <div className="tracking-step-icon">
                      {isDone && !isActive ? (
                        <svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ) : (
                        <span>{i + 1}</span>
                      )}
                    </div>
                    <span className="tracking-step-label">{step}</span>
                  </div>
                );
              })}
              <div className="tracking-step-line">
                <div className="tracking-step-line-fill" style={{ width: `${deliveryPercent}%` }} />
              </div>
            </div>

            <div className="tracking-progress-bar-wrap">
              <div className="tracking-progress-bar-bg">
                <div
                  className="tracking-progress-bar-fill"
                  style={{ width: `${deliveryPercent}%`, background: isDelivered ? '#16a34a' : '#2563eb' }}
                />
              </div>
              <div className="tracking-progress-percent">{Math.round(deliveryPercent)}%</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="tracking-timeline">
            <div className="tracking-timeline-item tracking-timeline-item--done">
              <div className="tracking-timeline-dot tracking-timeline-dot--green" />
              <div>
                <div className="tracking-timeline-title">Order Placed</div>
                <div className="tracking-timeline-date">{dayjs(order.orderTimeMs).format('MMMM D, YYYY')}</div>
              </div>
            </div>
            <div className={`tracking-timeline-item ${!isPreparing ? 'tracking-timeline-item--done' : ''}`}>
              <div className={`tracking-timeline-dot ${!isPreparing ? 'tracking-timeline-dot--green' : 'tracking-timeline-dot--gray'}`} />
              <div>
                <div className="tracking-timeline-title">Processing</div>
                <div className="tracking-timeline-date">{isPreparing ? 'In progress...' : 'Completed'}</div>
              </div>
            </div>
            <div className={`tracking-timeline-item ${isDelivered ? 'tracking-timeline-item--done' : ''}`}>
              <div className={`tracking-timeline-dot ${isDelivered ? 'tracking-timeline-dot--green' : 'tracking-timeline-dot--gray'}`} />
              <div>
                <div className="tracking-timeline-title">Delivered</div>
                <div className="tracking-timeline-date">
                  {isDelivered ? dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D, YYYY') : `Expected ${dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingPage;
