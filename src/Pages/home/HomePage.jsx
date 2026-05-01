import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/navbar/Header";
import ProductsGrid from "./ProductsGrid";
import FooterSection from "../../components/footer/FooterSection";
import "./HomePage.css";

const CATEGORIES = [
  { label: "All",         query: "",            icon: "⊞" },
  { label: "Kitchen",     query: "kitchen",     icon: "🍳" },
  { label: "Clothing",    query: "apparel",     icon: "👕" },
  { label: "Shoes",       query: "shoes",       icon: "👟" },
  { label: "Sports",      query: "sports",      icon: "⚽" },
  { label: "Bathroom",    query: "bathroom",    icon: "🛁" },
  { label: "Bedroom",     query: "bedroom",     icon: "🛏" },
  { label: "Accessories", query: "accessories", icon: "👜" },
];

const HomePage = ({ cart, loadCart }) => {
  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeCategory, setCategory] = useState("");
  const [searchParams]                = useSearchParams();
  const navigate                      = useNavigate();
  const { user }                      = useAuth();
  const search                        = searchParams.get('search');

  useEffect(() => {
    setLoading(true);
    const q = search || activeCategory;
    const url = q ? `/api/products?search=${encodeURIComponent(q)}` : '/api/products';
    axios.get(url)
      .then(r  => setProducts(r.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [search, activeCategory]);

  const featuredProducts = products.slice(0, 4);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/orders');
    } else {
      navigate('/login?redirect=/orders');
    }
  };

  return (
    <>
      <title>SimpleCart – Shop Online</title>
      <Header cart={cart} />

      <div className="home">

        {/* ── Hero ── */}
        {!search && (
          <section className="hero" aria-label="Welcome banner">
            <div className="hero__content">
              <div className="hero__badge">🛍 Free Shipping on Orders $49+</div>
              <h1 className="hero__title">
                Everything you need,<br/>
                <span className="hero__title-accent">delivered fast</span>
              </h1>
              <p className="hero__sub">
                Shop thousands of products across fashion, kitchen, sports &amp; more
              </p>
              <div className="hero__cta-row">
                <a href="#products" className="hero__cta-primary">
                  Shop Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="#" className="hero__cta-secondary" onClick={handleTrackOrder}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                  Track Order
                </a>
              </div>
              <div className="hero__stats">
                <div className="hero__stat"><strong>40+</strong><span>Products</span></div>
                <div className="hero__stat-div"/>
                <div className="hero__stat"><strong>Free</strong><span>Returns</span></div>
                <div className="hero__stat-div"/>
                <div className="hero__stat"><strong>Secure</strong><span>Pay</span></div>
              </div>
            </div>
            <div className="hero__img-side" aria-hidden="true">
              <div className="hero__img-grid">
                {featuredProducts.map((p, i) => (
                  <div key={p.id} className={`hero__img-card hero__img-card--${i}`}>
                    <img src={p.image} alt={p.name} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Trust bar ── */}
        {!search && (
          <div className="trust-bar">
            {[
              { icon: "🚚", title: "Free Delivery",   sub: "Orders above $49" },
              { icon: "🔒", title: "Secure Payment",  sub: "100% protected"    },
              { icon: "↩",  title: "Easy Returns",    sub: "30-day policy"     },
              { icon: "⭐", title: "Top Quality",     sub: "Curated products"  },
            ].map(t => (
              <div key={t.title} className="trust-bar__item">
                <span className="trust-bar__icon">{t.icon}</span>
                <div>
                  <div className="trust-bar__title">{t.title}</div>
                  <div className="trust-bar__sub">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Products section ── */}
        <div className="products-section" id="products">
          <div className="products-section__header">
            <h2 className="products-section__title">
              {search ? `Results for "${search}"` : "All Products"}
            </h2>
            <span className="products-section__count">{products.length} items</span>
          </div>

          {/* Category pills */}
          {!search && (
            <div className="category-bar" role="navigation" aria-label="Categories">
              {CATEGORIES.map(c => (
                <button
                  key={c.label}
                  className={`category-pill${activeCategory === c.query ? ' category-pill--active' : ''}`}
                  onClick={() => setCategory(c.query)}
                >
                  <span className="category-pill__icon">{c.icon}</span>
                  {c.label}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="home__loading">
              {[...Array(8)].map((_, i) => <div key={i} className="home__skeleton" />)}
            </div>
          ) : products.length === 0 ? (
            <div className="home__empty">
              <div className="home__empty-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try a different search or browse a category</p>
            </div>
          ) : (
            <ProductsGrid products={products} loadCart={loadCart} />
          )}
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default HomePage;
