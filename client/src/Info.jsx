import React from 'react';
import classNames from 'classnames';
import styles from '../styles/info.css';

const Info = ({ productData }) => {
  // set conditional rendering for certain information on the checkout panel
  const styleIsPrime = { display: 'none' };
  styleIsPrime.display = productData.is_prime ? 'inline-block' : 'none';
  const styleInStock = { display: 'none' };
  const styleOutOfStock = { color: '#B12704', display: 'none' };
  styleInStock.display = productData.in_stock ? 'block' : 'block';
  const styleGiftWrap = { display: 'none' };
  styleGiftWrap.display = productData.giftwrap_available ? 'inline' : 'none';

  return (
    <div>
      <div className={ styles.price }>${productData.price}</div>
      <div className={ styles.miniSpacing }></div>
      <div style={ styleIsPrime }>
        <div><img src={'https://s3-us-west-1.amazonaws.com/mattminwoolee-checkout/images/isPrime.png'} className={ styles.iconPrime } /> | <b>FREE</b> One-Day</div>
        <div className={ styles.miniSpacing }></div>
        <div>Get FREE Delivery <b>TOMORROW</b> if you order within 6 hrs 14 mins and choose this date at checkout.<span className={ styles.details }>Details.</span></div>
      </div>
      <div className={ styles.miniSpacing }></div>
      <div className={ styles.inStock } style={ styleInStock }>In Stock.</div>
      <div className={ styles.inStock } style={ styleOutOfStock }>Out of Stock.</div>
      <div>Ships from and sold by Amazon.com. <span style={ styleGiftWrap }>Gift-wrap available.</span></div>
    </div>
  );
};

export default Info;
