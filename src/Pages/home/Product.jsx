import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";
import { useAuth } from "../../context/AuthContext";

const Product = ({ product, loadCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [adding, setAdding] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const addToCart = async () => {
    if (adding) return;
    setAdding(true);
    try {
      await axios.post("/api/cart-items", { productId: product.id, quantity });
      await loadCart();
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);
    } catch (err) {
      console.error('Add to cart failed', err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} alt={product.name} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img className="product-rating-stars" src={`/images/ratings/rating-${Math.round(product.rating.stars * 10)}.png`} alt={`${product.rating.stars} stars`} />
        <div className="product-rating-count">({product.rating.count})</div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
          {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <div className="product-spacer" />

      <div className="added-to-cart" style={{ opacity: showAddedMessage ? 1 : 0 }}>
        <img src="/images/icons/checkmark.png" alt="" />
        Added to cart!
      </div>

      <button className="add-to-cart-button" onClick={addToCart} disabled={adding}>
        {adding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default Product;
