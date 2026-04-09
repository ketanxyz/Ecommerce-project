import axios from 'axios';
import { formatMoney } from '../../utils/money';
import { useState } from 'react';

const CartItemDetails = ({ cartItem, loadCart }) => {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantity = () => {
    if (isUpdatingQuantity){
      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
    }
  };

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: { isUpdatingQuantity ?
            <input type='text' className='quantity-textbox' />
            : <span className='quantity-label' >{cartItem.quantity}</span>
            }
          </span>
          <span className="update-quantity-link link-primary" 
          onClick={updateQuantity}>
            Update
          </span>
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>    
  )
}

export default CartItemDetails