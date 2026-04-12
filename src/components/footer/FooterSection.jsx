import "./FooterSection.css";

const FooterSection = () => {
  return (
    <div className="sc-footer">
      {/* newsletter */}
      <div className="sc-footer__newsletter">
        <div className="sc-footer__inner">
          <div className="sc-nl__text">
            <i className="ri-mail-send-line"></i>
            <div>
              <strong>Get exclusive deals in your inbox</strong>
              <span>Subscribe and save up to 30% on your first order</span>
            </div>
          </div>
          <form className="sc-nl__form" onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
            />
            <button type="submit">
              Subscribe <i className="ri-arrow-right-line"></i>
            </button>
          </form>
        </div>
      </div>

        {/* <!-- Main Footer Body --> */}
      <div className="sc-footer__body">
        <div className="sc-footer__inner">
          <div className="sc-footer__grid">
            
            {/* <!-- Brand Column --> */}
            <div className="sc-col sc-col--brand">
              <div className="sc-brand">
                <i className="ri-shopping-cart-2-line"></i>
                <span>SimpleCart</span>
              </div>
              <p className="sc-brand__desc">
                Your one-stop shop for everyday essentials. Quality products,
                unbeatable prices, and fast delivery right to your door.
              </p>
              <div className="sc-trust">
                <div className="sc-trust__badge">
                  <i className="ri-shield-check-line"></i> Secure Payments
                </div>
                <div className="sc-trust__badge">
                  <i className="ri-truck-line"></i> Free Shipping $49+
                </div>
                <div className="sc-trust__badge">
                  <i className="ri-refresh-line"></i> 30-Day Returns
                </div>
                <div className="sc-trust__badge">
                  <i className="ri-customer-service-2-line"></i> 24/7 Support
                </div>
              </div>
            </div>

            {/* <!-- Shop Column --> */}
            <div className="sc-col">
              <h3 className="sc-col__title">Shop</h3>
              <ul className="sc-col__links">
                <li>
                  <a href="">
                    <i className="ri-flashlight-line"></i> New Arrivals
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-fire-line"></i> Best Sellers
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-percent-line"></i> Sale &amp; Offers
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-shirt-line"></i> Clothing &amp; Apparel
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-basketball-line"></i> Sports &amp; Outdoors
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-home-3-line"></i> Home &amp; Kitchen
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-gift-line"></i> Gift Cards
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Account Column --> */}
            <div className="sc-col">
              <h3 className="sc-col__title">My Account</h3>
              <ul className="sc-col__links">
                <li>
                  <a href="">
                    <i className="ri-user-line"></i> Sign In
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-user-add-line"></i> Create Account
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-file-list-3-line"></i> My Orders
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-map-pin-2-line"></i> Saved Addresses
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-heart-line"></i> Wishlist
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-coupon-3-line"></i> My Coupons
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-settings-3-line"></i> Account Settings
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Help Column --> */}
            <div className="sc-col">
              <h3 className="sc-col__title">Help &amp; Info</h3>
              <ul className="sc-col__links">
                <li>
                  <a href="">
                    <i className="ri-question-line"></i> FAQs
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-truck-line"></i> Shipping Info
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-arrow-go-back-line"></i> Returns &amp;
                    Exchanges
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-search-eye-line"></i> Track My Order
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-ruler-2-line"></i> Size Guide
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-chat-3-line"></i> Live Chat
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="ri-phone-line"></i> Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Contact Column --> */}
            <div className="sc-col">
              <h3 className="sc-col__title">Contact Us</h3>
              <ul className="sc-contact">
                <li>
                  <i className="ri-map-pin-2-line"></i>
                  <span>
                    42 Commerce Avenue,
                    <br />
                    New York, NY 10001, USA
                  </span>
                </li>
                <li>
                  <i className="ri-phone-line"></i>
                  <span>+1 (800) 123-4567</span>
                </li>
                <li>
                  <i className="ri-mail-line"></i>
                  <span>support@simplecart.com</span>
                </li>
                <li>
                  <i className="ri-time-line"></i>
                  <span>Mon – Fri: 9am – 6pm EST</span>
                </li>
              </ul>

              <h3 className="sc-col__title" style={{ marginTop: 28 }}>
                Follow Us
              </h3>
              <div className="sc-socials">
                <a href="" className="sc-social" title="Instagram">
                  <i className="ri-instagram-line"></i>
                </a>
                <a href="" className="sc-social" title="Facebook">
                  <i className="ri-facebook-line"></i>
                </a>
                <a href="" className="sc-social" title="X / Twitter">
                  <i className="ri-twitter-x-line"></i>
                </a>
                <a href="" className="sc-social" title="TikTok">
                  <i className="ri-tiktok-line"></i>
                </a>
                <a href="" className="sc-social" title="YouTube">
                  <i className="ri-youtube-line"></i>
                </a>
                <a href="" className="sc-social" title="Pinterest">
                  <i className="ri-pinterest-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
