import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { formatMoney } from "../../utils/money";
import OrderSummary from "./OrderSummary";
import CheckoutHeader from "../../components/CheckoutHeader";
import "./CheckoutPage.css";

const CheckoutPage = ({ cart, loadCart }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState('');

  const addresses = user?.addresses || [];

  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then(r => setDeliveryOptions(r.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      axios.get('/api/payment-summary')
        .then(r => setPaymentSummary(r.data))
        .catch(console.error);
    } else {
      setPaymentSummary(null);
    }
  }, [cart]);

  // Auto-select default address
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const def = addresses.find(a => a.isDefault) || addresses[0];
      setSelectedAddressId(def.id);
    }
  }, [addresses]);

  const placeOrder = async () => {
    if (!user) { navigate('/login?redirect=/checkout'); return; }
    if (addresses.length === 0) { setShowAddressModal(true); return; }
    if (!selectedAddressId) { setOrderError('Please select a delivery address.'); return; }
    setOrderError('');
    setPlacing(true);
    try {
      await axios.post('/api/orders');
      await loadCart();
      navigate('/orders');
    } catch (err) {
      setOrderError(err.response?.data?.error || 'Failed to place order. Try again.');
    } finally {
      setPlacing(false);
    }
  };

  const selectedAddress = addresses.find(a => a.id === selectedAddressId);

  if (cart.length === 0) {
    return (
      <>
        <title>SimpleCart – Checkout</title>
        <CheckoutHeader cart={cart} />
        <div className="checkout-empty">
          <div className="checkout-empty__icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to checkout</p>
          <Link to="/" className="checkout-empty__btn">Continue Shopping</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <title>SimpleCart – Checkout</title>
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <h1 className="checkout-page__title">Review your order</h1>

        <div className="checkout-grid">
          {/* Left: items */}
          <div className="checkout-main">
            <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
          </div>

          {/* Right: summary */}
          <div className="checkout-sidebar">
            {/* Delivery Address */}
            <div className="checkout-box">
              <div className="checkout-box__header">
                <span className="checkout-box__title">Delivery Address</span>
                <button className="checkout-box__action" onClick={() => setShowAddressModal(true)}>
                  {addresses.length === 0 ? '+ Add Address' : 'Change'}
                </button>
              </div>

              {!user ? (
                <div className="checkout-login-prompt">
                  <p>Sign in to save your address and track orders</p>
                  <Link to={`/login?redirect=/checkout`} className="checkout-login-btn">Sign In / Create Account</Link>
                </div>
              ) : addresses.length === 0 ? (
                <div className="checkout-no-address">
                  <p>No saved addresses yet.</p>
                  <button className="checkout-add-addr-btn" onClick={() => setShowAddressModal(true)}>+ Add a delivery address</button>
                </div>
              ) : (
                <div className="checkout-address-list">
                  {addresses.map(addr => (
                    <label key={addr.id} className={`checkout-address-card${selectedAddressId === addr.id ? ' checkout-address-card--selected' : ''}`}>
                      <input type="radio" name="address" value={addr.id} checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} />
                      <div className="checkout-address-info">
                        <div className="checkout-address-name">{addr.fullName} {addr.isDefault && <span className="checkout-default-badge">Default</span>}</div>
                        <div className="checkout-address-line">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</div>
                        <div className="checkout-address-line">{addr.city}, {addr.state} – {addr.pincode}</div>
                        {addr.phone && <div className="checkout-address-line">📞 {addr.phone}</div>}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Payment summary */}
            {paymentSummary && (
              <div className="checkout-box">
                <div className="checkout-box__title" style={{marginBottom:14}}>Order Summary</div>
                <div className="payment-row"><span>Items ({paymentSummary.totalItems})</span><span>{formatMoney(paymentSummary.productCostCents)}</span></div>
                <div className="payment-row"><span>Shipping & handling</span><span>{formatMoney(paymentSummary.shippingCostCents)}</span></div>
                <div className="payment-row"><span>Total before tax</span><span>{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</span></div>
                <div className="payment-row"><span>Estimated tax (10%)</span><span>{formatMoney(paymentSummary.taxCents)}</span></div>
                <div className="payment-row payment-row--total"><span>Order total</span><span>{formatMoney(paymentSummary.totalCostCents)}</span></div>

                {orderError && <div className="checkout-error">{orderError}</div>}

                <button
                  className="place-order-btn"
                  onClick={placeOrder}
                  disabled={placing || (!user) || (user && addresses.length === 0)}
                >
                  {placing ? 'Placing Order...' : 'Place your order'}
                </button>

                {!user && (
                  <p className="checkout-signin-hint">
                    <Link to="/login?redirect=/checkout">Sign in</Link> to place your order
                  </p>
                )}

                <div className="checkout-secure">🔒 Secure checkout</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <AddressModal
          addresses={addresses}
          selectedId={selectedAddressId}
          onSelect={(id) => { setSelectedAddressId(id); setShowAddressModal(false); }}
          onClose={() => setShowAddressModal(false)}
          onAdded={(updatedUser) => {
            // user context gets updated via profile save
          }}
          user={user}
        />
      )}
    </>
  );
};

const AddressModal = ({ addresses, selectedId, onSelect, onClose, user }) => {
  const { updateUser } = useAuth();
  const [mode, setMode] = useState(addresses.length === 0 ? 'add' : 'list');
  const [form, setForm] = useState({ fullName: user?.name || '', phone: user?.phone || '', line1: '', line2: '', city: '', state: '', pincode: '', isDefault: false });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!form.fullName || !form.line1 || !form.city || !form.state || !form.pincode) {
      setError('Please fill all required fields'); return;
    }
    setSaving(true);
    try {
      const res = await axios.post('/api/auth/addresses', form);
      const freshUser = (await axios.get('/api/auth/me')).data.user;
      updateUser(freshUser);
      const newest = freshUser.addresses[freshUser.addresses.length - 1];
      onSelect(newest.id);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save address');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{mode === 'add' ? 'Add New Address' : 'Select Address'}</h2>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        {mode === 'list' && (
          <>
            <div className="modal__body">
              {addresses.map(addr => (
                <label key={addr.id} className={`checkout-address-card${selectedId === addr.id ? ' checkout-address-card--selected' : ''}`} style={{cursor:'pointer'}}>
                  <input type="radio" name="modal-address" value={addr.id} checked={selectedId === addr.id} onChange={() => onSelect(addr.id)} />
                  <div className="checkout-address-info">
                    <div className="checkout-address-name">{addr.fullName} {addr.isDefault && <span className="checkout-default-badge">Default</span>}</div>
                    <div className="checkout-address-line">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</div>
                    <div className="checkout-address-line">{addr.city}, {addr.state} – {addr.pincode}</div>
                  </div>
                </label>
              ))}
            </div>
            <div className="modal__footer">
              <button className="modal__btn-secondary" onClick={() => setMode('add')}>+ Add New Address</button>
            </div>
          </>
        )}

        {mode === 'add' && (
          <div className="modal__body">
            {error && <div className="checkout-error">{error}</div>}
            <div className="addr-form">
              <div className="addr-form__row">
                <div className="addr-form__field">
                  <label>Full Name *</label>
                  <input value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} placeholder="Your full name" />
                </div>
                <div className="addr-form__field">
                  <label>Phone</label>
                  <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="Phone number" />
                </div>
              </div>
              <div className="addr-form__field">
                <label>Address Line 1 *</label>
                <input value={form.line1} onChange={e => setForm({...form, line1: e.target.value})} placeholder="House no., Street name" />
              </div>
              <div className="addr-form__field">
                <label>Address Line 2</label>
                <input value={form.line2} onChange={e => setForm({...form, line2: e.target.value})} placeholder="Landmark, Area (optional)" />
              </div>
              <div className="addr-form__row">
                <div className="addr-form__field">
                  <label>City *</label>
                  <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="City" />
                </div>
                <div className="addr-form__field">
                  <label>State *</label>
                  <input value={form.state} onChange={e => setForm({...form, state: e.target.value})} placeholder="State" />
                </div>
                <div className="addr-form__field addr-form__field--small">
                  <label>Pincode *</label>
                  <input value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} placeholder="Pincode" />
                </div>
              </div>
              <label className="addr-form__default">
                <input type="checkbox" checked={form.isDefault} onChange={e => setForm({...form, isDefault: e.target.checked})} />
                Set as default address
              </label>
            </div>
            <div className="modal__footer">
              {addresses.length > 0 && <button className="modal__btn-secondary" onClick={() => setMode('list')}>← Back</button>}
              <button className="modal__btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save Address'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
