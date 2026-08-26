import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./product.css";
import Nav2 from "./Nav2";

import PetChatbot from "./Chatbot";

const CATEGORIES = [
  "All Products",
  "Cat & Dog Food",
  "Toys",
  "Grooming Essentials",
  "Bedding & Apparel",
  "Health Supplements",
];

function ProductCard({ product, index, onAddToCart, cartItems }) {
  const [liked, setLiked] = useState(false);
  const isAdded = cartItems.some((item) => item.id === product.id);

  return (
    <article
      className="product-card"
      style={{
        "--card-delay": `${Math.min(index * 60, 500)}ms`,
      }}
    >
      <div className="product-image-wrap">
        <span className="category-badge">{product.category}</span>

        <button
          className={`heart-btn ${liked ? "liked" : ""}`}
          type="button"
          aria-label="Wishlist"
          onClick={() => setLiked((prev) => !prev)}
        >
          {liked ? "♥" : "♡"}
        </button>

        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <p className="product-description">{product.description}</p>

        <div className="product-bottom">
          <div className="price">
            Rs. {Number(product.price).toLocaleString("en-PK")}
            <span> PKR</span>
          </div>

          <button
            className={`buy-btn ${isAdded ? "added" : ""}`}
            type="button"
            onClick={() => onAddToCart(product)}
          >
            {isAdded ? "Added" : "Buy Now"}
            <span>{isAdded ? "✓" : "→"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function CartIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="19" cy="20" r="1" />
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 15H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

export default function Product() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("furcare_selected_items");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    productName: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "furcare_selected_items",
      JSON.stringify(cartItems)
    );

    localStorage.setItem(
      "furcare_order_total",
      String(
        cartItems.reduce(
          (total, item) => total + Number(item.price || 0),
          0
        )
      ),
    );
  }, [cartItems]);

  useEffect(() => {
    if (!cartOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/data/product.json");

        if (!response.ok) {
          throw new Error("Unable to load products.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid product data.");
        }

        setProducts(data);
      } catch (err) {
        console.error("Product loading error:", err);
        setError("Products could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const showToast = (productName, message) => {
    setToast({
      visible: true,
      message,
      productName,
    });

    setTimeout(() => {
      setToast({
        visible: false,
        message: "",
        productName: "",
      });
    }, 2600);
  };

  const handleAddToCart = (product) => {
    setCartItems((previousItems) => {
      const exists = previousItems.some(
        (item) => item.id === product.id
      );

      if (exists) {
        showToast(product.name, "This item is already selected");
        return previousItems;
      }

      showToast(product.name, "Added to selected items");
      return [...previousItems, product];
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== id)
    );
  };

  const handleClearAll = () => {
    setCartItems([]);
    setCartOpen(false);
  };

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + Number(item.price || 0),
        0
      ),
    [cartItems]
  );

  const handleCheckout = () => {
    if (!cartItems.length) return;

    localStorage.setItem(
      "furcare_selected_items",
      JSON.stringify(cartItems)
    );

    localStorage.setItem(
      "furcare_order_total",
      String(cartTotal)
    );

    setCartOpen(false);

    // Checkout page navigation
    navigate("/Pet_owner_Checkout");
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All Products") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "name-az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "name-za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;

      default:
        break;
    }

    return result;
  }, [products, category, search, sort]);

  return (
    <>
      <Nav2 />
    <PetChatbot />
      <div className="pawora-page">
        <main id="top">
          <section className="hero">
            <div className="hero-content">
              <div className="eyebrow">
                <span></span>
                Premium Pet Essentials
              </div>

              <h1>
                Better things
                <br />
                for your <em>best friend.</em>
              </h1>

              <p className="hero-description">
                Thoughtfully selected food, toys, grooming
                essentials, cozy bedding and wellness products —
                designed for pets who deserve nothing but the best.
              </p>

              <div className="hero-actions">
                <a href="#shop" className="primary-btn">
                  Shop Collection
                  <span>→</span>
                </a>

                <a href="#categories" className="secondary-btn">
                  Explore Categories
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-circle"></div>

              <img
                className="pet-image"
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=85"
                alt="Happy dog"
              />

              <div className="floating-card one">
                <div className="floating-icon">✦</div>
                <div className="floating-text">
                  <strong>Premium Quality</strong>
                  <span>Carefully selected</span>
                </div>
              </div>

              <div className="floating-card two">
                <div className="floating-icon">♡</div>
                <div className="floating-text">
                  <strong>Made with Love</strong>
                  <span>For happy companions</span>
                </div>
              </div>
            </div>
          </section>

          <section className="trust-bar">
            <div className="trust-item">
              <span>✦</span>
              Premium Products
            </div>

            <div className="trust-item">
              <span>✓</span>
              Carefully Curated
            </div>

            <div className="trust-item">
              <span>♡</span>
              Made for Happy Pets
            </div>
          </section>

          <section className="shop-section" id="shop">
            <div className="section-header">
              <div>
                <div className="section-kicker">The Collection</div>

                <h2 className="section-title">
                  Shop pet essentials
                </h2>

                <p className="section-subtitle">
                  Everything your companion needs,
                  beautifully curated.
                </p>
              </div>

              <div className="product-count">
                {loading
                  ? "Loading products..."
                  : `${filteredProducts.length} ${
                      filteredProducts.length === 1
                        ? "product"
                        : "products"
                    }`}
              </div>
            </div>

            <div className="controls">
              <div className="search-box">
                <span className="search-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>
                </span>

                <input
                  className="search-input"
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                className="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-az">Name: A → Z</option>
                <option value="name-za">Name: Z → A</option>
              </select>
            </div>

            <div className="category-tabs" id="categories">
              {CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`category-btn ${
                    category === item ? "active" : ""
                  }`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {loading && (
              <div className="loader-container">
                <div className="loader-ring"></div>
                <span>Loading collection...</span>
              </div>
            )}

            {error && !loading && (
              <div className="empty-state">
                <div className="empty-icon">!</div>
                <h3>Something went wrong</h3>
                <p>{error}</p>
              </div>
            )}

            {!loading &&
              !error &&
              filteredProducts.length > 0 && (
                <div className="product-grid">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      onAddToCart={handleAddToCart}
                      cartItems={cartItems}
                    />
                  ))}
                </div>
              )}

            {!loading &&
              !error &&
              filteredProducts.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-4-4" />
                    </svg>
                  </div>

                  <h3>Nothing found</h3>

                  <p>
                    Try another search or choose a different
                    category.
                  </p>
                </div>
              )}
          </section>

          <section className="premium-banner" id="about">
            <div className="banner-content">
              <div className="banner-kicker">
                The Pawora Philosophy
              </div>

              <h2 className="banner-title">
                Small moments.
                <br />
                Better living.
              </h2>

              <p className="banner-text">
                We believe everyday pet essentials should feel
                as special as the companions who make our lives
                better.
              </p>
            </div>

            <a href="#shop" className="banner-button">
              View Collection →
            </a>
          </section>
        </main>
      </div>

     <div
  className={`furcare-cart-toast ${
    toast.visible ? "show" : ""
  }`}
  aria-live="polite"
>
  <div className="furcare-toast-icon">✓</div>

  <div className="furcare-toast-content">
    <strong>{toast.message}</strong>

    {toast.productName && (
      <span>{toast.productName}</span>
    )}
  </div>

  <button
    type="button"
    className="furcare-toast-close"
    onClick={() =>
      setToast({
        visible: false,
        message: "",
        productName: "",
      })
    }
    aria-label="Close notification"
  >
    ×
  </button>
</div>

      {cartItems.length > 0 && (
        <button
          type="button"
          className={`furcare-floating-cart ${
            cartOpen ? "cart-active" : ""
          }`}
          onClick={() => setCartOpen(true)}
          aria-label="Open selected items"
        >
          <span className="furcare-floating-cart-icon">
            <CartIcon />
          </span>

          <span className="furcare-floating-cart-info">
            <strong>Selected Items</strong>
            <span>
              {cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"}
            </span>
          </span>

          <span className="furcare-floating-cart-total">
            Rs. {cartTotal.toLocaleString("en-PK")}
          </span>
        </button>
      )}

      {cartOpen && (
        <div
          className="furcare-cart-overlay"
          onClick={() => setCartOpen(false)}
        />
      )}

      <aside
        className={`furcare-cart-drawer ${
          cartOpen ? "open" : ""
        }`}
        aria-hidden={!cartOpen}
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="furcare-cart-header">
          <div className="furcare-cart-heading">
            <span>Your Selection</span>
            <h2>Selected Items</h2>
          </div>

          <div className="furcare-cart-header-actions">
            {cartItems.length > 0 && (
              <button
                type="button"
                className="furcare-clear-btn"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            )}

            <button
              type="button"
              className="furcare-cart-close"
              onClick={() => setCartOpen(false)}
              aria-label="Close selected items"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="furcare-cart-body">
          {cartItems.length === 0 ? (
            <div className="furcare-empty-cart">
              <div className="furcare-empty-cart-icon">
                <CartIcon />
              </div>

              <h3>No selected items</h3>

              <p>
                Add products from the collection and they will
                appear here.
              </p>
            </div>
          ) : (
            <div className="furcare-selected-list">
              {cartItems.map((item) => (
                <div
                  className="furcare-selected-item"
                  key={item.id}
                >
                  <div className="furcare-selected-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="furcare-selected-info">
                    <h3>{item.name}</h3>

                    <span>{item.category}</span>

                    <strong>
                      Rs.{" "}
                      {Number(item.price).toLocaleString(
                        "en-PK"
                      )}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="furcare-remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    title="Remove item"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="furcare-cart-footer">
            <div className="furcare-cart-total-row">
              <span>Total</span>

              <strong>
                Rs. {cartTotal.toLocaleString("en-PK")}
              </strong>
            </div>

            <button
              type="button"
              className="furcare-checkout-btn"
              onClick={handleCheckout}
            >
              Checkout
              <span>→</span>
            </button>

            <p className="furcare-checkout-note">
              Your selected items will be saved for checkout.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}