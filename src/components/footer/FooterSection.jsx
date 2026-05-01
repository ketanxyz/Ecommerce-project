import { Link } from "react-router";
import "./FooterSection.css";

const FooterSection = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="sc-footer">

      {/* ── Newsletter strip ── */}
      <div className="sc-footer__newsletter">
        <div className="sc-footer__inner">
          <div className="sc-nl__text">
            <i className="ri-mail-send-line"></i>
            <div>
              <strong>Get exclusive deals in your inbox</strong>
              <span>Subscribe and save up to 30% on your first order</span>
            </div>
          </div>
          <form className="sc-nl__form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" aria-label="Email address" />
            <button type="submit">
              Subscribe <i className="ri-arrow-right-line"></i>
            </button>
          </form>
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="sc-footer__body">
        <div className="sc-footer__inner">
          <div className="sc-footer__grid">

            {/* Brand */}
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
                <div className="sc-trust__badge"><i className="ri-shield-check-line"></i> Secure Payments</div>
                <div className="sc-trust__badge"><i className="ri-truck-line"></i> Free Shipping $49+</div>
                <div className="sc-trust__badge"><i className="ri-refresh-line"></i> 30-Day Returns</div>
                <div className="sc-trust__badge"><i className="ri-customer-service-2-line"></i> 24/7 Support</div>
              </div>
            </div>

            {/* Shop */}
            <div className="sc-col">
              <h3 className="sc-col__title">Shop</h3>
              <ul className="sc-col__links">
                <li><Link to="/"><i className="ri-flashlight-line"></i> New Arrivals</Link></li>
                <li><Link to="/"><i className="ri-fire-line"></i> Best Sellers</Link></li>
                <li><Link to="/"><i className="ri-percent-line"></i> Sale &amp; Offers</Link></li>
                <li><Link to="/"><i className="ri-shirt-line"></i> Clothing &amp; Apparel</Link></li>
                <li><Link to="/"><i className="ri-basketball-line"></i> Sports &amp; Outdoors</Link></li>
                <li><Link to="/"><i className="ri-home-3-line"></i> Home &amp; Kitchen</Link></li>
                <li><Link to="/"><i className="ri-gift-line"></i> Gift Cards</Link></li>
              </ul>
            </div>

            {/* Account */}
            <div className="sc-col">
              <h3 className="sc-col__title">My Account</h3>
              <ul className="sc-col__links">
                <li><Link to="/login"><i className="ri-user-line"></i> Sign In</Link></li>
                <li><Link to="/signup"><i className="ri-user-add-line"></i> Create Account</Link></li>
                <li><Link to="/orders"><i className="ri-file-list-3-line"></i> My Orders</Link></li>
                <li><Link to="/profile"><i className="ri-map-pin-2-line"></i> Saved Addresses</Link></li>
                <li><Link to="/profile"><i className="ri-settings-3-line"></i> Account Settings</Link></li>
              </ul>
            </div>

            {/* Help */}
            <div className="sc-col">
              <h3 className="sc-col__title">Help &amp; Info</h3>
              <ul className="sc-col__links">
                <li><Link to="/"><i className="ri-question-line"></i> FAQs</Link></li>
                <li><Link to="/"><i className="ri-truck-line"></i> Shipping Info</Link></li>
                <li><Link to="/"><i className="ri-arrow-go-back-line"></i> Returns &amp; Exchanges</Link></li>
                <li><Link to="/orders"><i className="ri-search-eye-line"></i> Track My Order</Link></li>
                <li><Link to="/"><i className="ri-chat-3-line"></i> Live Chat</Link></li>
                <li><Link to="/"><i className="ri-phone-line"></i> Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact + Social */}
            <div className="sc-col">
              <h3 className="sc-col__title">Contact Us</h3>
              <ul className="sc-contact">
                <li>
                  <i className="ri-map-pin-2-line"></i>
                  <span>42 Commerce Avenue,<br/>New York, NY 10001, USA</span>
                </li>
                <li><i className="ri-phone-line"></i><span>+1 (800) 123-4567</span></li>
                <li><i className="ri-mail-line"></i><span>support@simplecart.com</span></li>
                <li><i className="ri-time-line"></i><span>Mon – Fri: 9am – 6pm EST</span></li>
              </ul>

              <h3 className="sc-col__title" style={{ marginTop: 26 }}>Follow Us</h3>
              <div className="sc-socials">
                <a href="https://instagram.com" className="sc-social" title="Instagram" target="_blank" rel="noreferrer"><i className="ri-instagram-line"></i></a>
                <a href="https://facebook.com"  className="sc-social" title="Facebook"  target="_blank" rel="noreferrer"><i className="ri-facebook-line"></i></a>
                <a href="https://x.com"         className="sc-social" title="X / Twitter" target="_blank" rel="noreferrer"><i className="ri-twitter-x-line"></i></a>
                <a href="https://tiktok.com"    className="sc-social" title="TikTok"    target="_blank" rel="noreferrer"><i className="ri-tiktok-line"></i></a>
                <a href="https://youtube.com"   className="sc-social" title="YouTube"   target="_blank" rel="noreferrer"><i className="ri-youtube-line"></i></a>
                <a href="https://pinterest.com" className="sc-social" title="Pinterest" target="_blank" rel="noreferrer"><i className="ri-pinterest-line"></i></a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="sc-footer__bottom">
        <div className="sc-bottom__inner">
          <div className="sc-payment">
            <span className="sc-payment__label">
              <i className="ri-bank-card-line"></i> We Accept
            </span>
            <div className="sc-payment__icons">
              {['Visa', 'Mastercard', 'PayPal', 'Amex', 'UPI'].map(p => (
                <span key={p} className="sc-pay-chip">{p}</span>
              ))}
            </div>
          </div>

          <div className="sc-legal">
            <p className="sc-copy">© {new Date().getFullYear()} <strong>SimpleCart</strong>. All rights reserved.</p>
            <div className="sc-legal__links">
              <Link to="/">Privacy Policy</Link>
              <Link to="/">Terms of Service</Link>
              <Link to="/">Cookie Policy</Link>
              <Link to="/">Sitemap</Link>
            </div>
          </div>

          <button className="sc-back-top" onClick={scrollTop}>
            <i className="ri-arrow-up-line"></i> Back to top
          </button>
        </div>
      </div>

    </div>
  );
};

export default FooterSection;
