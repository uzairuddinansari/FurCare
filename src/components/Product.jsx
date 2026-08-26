import React, { useEffect, useMemo, useState } from "react";
import "./product.css";
import Nav2 from "./Nav2";

const CATEGORIES = [
  "All Products",
  "Cat & Dog Food",
  "Toys",
  "Grooming Essentials",
  "Bedding & Apparel",
  "Health Supplements",
];

function ProductCard({ product, index }) {
  const [liked, setLiked] = useState(false);
  const [buyText, setBuyText] = useState("Buy Now");

  const handleBuy = () => {
    setBuyText("Coming Soon");

    setTimeout(() => {
      setBuyText("Buy Now");
    }, 1500);
  };

  return (
    <article
      className="product-card"
      style={{
        "--card-delay": `${Math.min(index * 60, 500)}ms`,
      }}
    >
      <div className="product-image-wrap">
        <span className="category-badge">
          {product.category}
        </span>

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
        <h3 className="product-name">
          {product.name}
        </h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-bottom">
          <div className="price">
            Rs. {Number(product.price).toLocaleString("en-PK")}
            <span> PKR</span>
          </div>

          <button
            className="buy-btn"
            type="button"
            onClick={handleBuy}
          >
            {buyText}
            <span>→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // CATEGORY FILTER
    if (category !== "All Products") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    // SEARCH
    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      });
    }

    // SORT
    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "name-az":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "name-za":
        result.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      default:
        break;
    }

    return result;
  }, [products, category, search, sort]);

  return (
    <>
    <Nav2/>
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

              <a
                href="#categories"
                className="secondary-btn"
              >
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
              <div className="section-kicker">
                The Collection
              </div>

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
              <option value="default">
                Sort: Featured
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="name-az">
                Name: A → Z
              </option>

              <option value="name-za">
                Name: Z → A
              </option>
            </select>

          </div>

   

          <div
            className="category-tabs"
            id="categories"
          >
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

              <div className="empty-icon">
                !
              </div>

              <h3>
                Something went wrong
              </h3>

              <p>
                {error}
              </p>

            </div>
          )}



          {!loading &&
            !error &&
            filteredProducts.length > 0 && (
              <div className="product-grid">

                {filteredProducts.map(
                  (product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  )
                )}

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

                <h3>
                  Nothing found
                </h3>

                <p>
                  Try another search or choose
                  a different category.
                </p>

              </div>
            )}

        </section>



        <section
          className="premium-banner"
          id="about"
        >

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
              We believe everyday pet essentials should
              feel as special as the companions who make
              our lives better.
            </p>

          </div>

          <a
            href="#shop"
            className="banner-button"
          >
            View Collection →
          </a>

        </section>

      </main>
    </div>
    </>
  );
}