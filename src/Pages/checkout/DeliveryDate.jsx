import dayjs from 'dayjs';

const DeliveryDate = ({ cartItem, deliveryOptions }) => {
  const selectedDeliveryOption = deliveryOptions
    .find((deliveryOption) => {
      return deliveryOption.id === cartItem.deliveryOptionId;
    });

  return (
    <div className="delivery-date">
      Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
    </div>    
  )
}

export default DeliveryDate
