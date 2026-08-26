import React, { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import "../style/Checkout.css";

const getStoredItems = () => {
  const keys = [
    "furcare_selected_items",
    "selectedItems",
    "cartItems",
    "cart",
    "selectedProducts"
  ];

  for (const key of keys) {
    const localData = localStorage.getItem(key);
    const sessionData = sessionStorage.getItem(key);
    const data = localData || sessionData;

    if (data) {
      try {
        const parsed = JSON.parse(data);

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        continue;
      }
    }
  }

  return [];
};

const getPrice = (item) => {
  const price =
    item.price ??
    item.productPrice ??
    item.pricePerUnit ??
    item.amount ??
    0;

  return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
};

const getQuantity = (item) => {
  return Math.max(1, Number(item.quantity) || 1);
};

const getImage = (item) => {
  return (
    item.image ||
    item.img ||
    item.imageUrl ||
    item.thumbnail ||
    item.productImage ||
    ""
  );
};

const getName = (item) => {
  return item.name || item.title || item.productName || "Product";
};

const Checkout = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedItems = getStoredItems();
    setItems(storedItems);

    const mainContent = document.querySelector(".checkout-main-content");
    const imagePanel = document.querySelector(".checkout-image-panel");

    if (mainContent) {
      gsap.fromTo(
        mainContent,
        {
          opacity: 0,
          x: -35
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out"
        }
      );
    }

    if (imagePanel) {
      gsap.fromTo(
        imagePanel,
        {
          opacity: 0,
          x: 35
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.1,
          ease: "power3.out"
        }
      );
    }
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + getPrice(item) * getQuantity(item);
    }, 0);
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "cardNumber") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      updatedValue = digits
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }

    if (name === "expiry") {
      const digits = value.replace(/\D/g, "").slice(0, 4);

      if (digits.length >= 3) {
        updatedValue = `${digits.slice(0, 2)}/${digits.slice(2)}`;
      } else {
        updatedValue = digits;
      }
    }

    if (name === "cvv") {
      updatedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    if (name === "phone") {
      updatedValue = value.slice(0, 20);
    }

    setForm((prev) => ({
      ...prev,
      [name]: updatedValue
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Enter your complete name";
    }

    const phoneDigits = form.phone.replace(/\D/g, "");

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneDigits.length < 10) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.cardName.trim()) {
      newErrors.cardName = "Card holder name is required";
    }

    const cardDigits = form.cardNumber.replace(/\D/g, "");

    if (!cardDigits) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardDigits.length !== 16) {
      newErrors.cardNumber =
        "Enter the complete 16 digit card number";
    }

    if (!form.expiry) {
      newErrors.expiry = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
      newErrors.expiry = "Use MM/YY format";
    } else {
      const month = Number(form.expiry.split("/")[0]);

      if (month < 1 || month > 12) {
        newErrors.expiry = "Enter a valid month";
      }
    }

    if (!form.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (form.cvv.length < 3) {
      newErrors.cvv = "Enter a valid CVV";
    }

    if (items.length === 0) {
      newErrors.items = "No products selected";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const getCardBrand = () => {
    if (paymentMethod === "mastercard") {
      return "MASTERCARD";
    }

    if (paymentMethod === "amex") {
      return "AMERICAN EXPRESS";
    }

    return "VISA";
  };

  const getCardNumber = () => {
    if (!form.cardNumber) {
      return "•••• •••• •••• ••••";
    }

    const digits = form.cardNumber.replace(/\D/g, "");

    const groups = [];

    for (let i = 0; i < 16; i += 4) {
      groups.push(
        digits.slice(i, i + 4).padEnd(4, "•")
      );
    }

    return groups.join(" ");
  };

  const clearCartStorage = () => {
    const keys = [
      "selectedItems",
      "cartItems",
      "cart",
      "selectedProducts"
    ];

    keys.forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    const newOrderNumber = `FC-${Date.now()
      .toString()
      .slice(-8)}`;

    setOrderNumber(newOrderNumber);

    const productList = items
  .map((item) => {
    const quantity = getQuantity(item);
    const price = getPrice(item);
    const itemTotal = price * quantity;

    return `${getName(item)} — Qty: ${quantity} — Rs. ${itemTotal.toLocaleString()}`;
  })
  .join("\n");

    const templateParams = {
  order_number: newOrderNumber,
  customer_name: form.name,
  customer_email: form.email,
  customer_phone: form.phone,
  payment_method: getCardBrand(),
  selected_items: productList,
  order_total: `Rs. ${total.toLocaleString()}`,
  order_date: new Date().toLocaleString(),
  company_name: "FurCare",
  company_city: "Karachi"
};

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        }
      );

      const finalOrder = {
        orderNumber: newOrderNumber,
        customer: {
          name: form.name,
          phone: form.phone,
          email: form.email
        },
        paymentMethod: getCardBrand(),
        items,
        total,
        date: new Date().toISOString()
      };

      localStorage.setItem(
        "lastOrder",
        JSON.stringify(finalOrder)
      );

      sessionStorage.setItem(
        "lastOrder",
        JSON.stringify(finalOrder)
      );

      clearCartStorage();

      setItems([]);
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/Pet_owner_home");
      }, 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);

      setErrors({
        submit:
          "Order could not be sent. Please check your EmailJS settings and try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    navigate("/Pet_owner_home");
  };

  return (
    <main className="checkout-page">
      <section className="checkout-main-content">
        <div className="checkout-top">
          <button
            className="checkout-back"
            type="button"
            onClick={() => navigate(-1)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Back
          </button>

          <div className="checkout-brand">
            <span>FUR</span>
            <strong>CARE</strong>
          </div>
        </div>

        <div className="checkout-heading">
          <span>SECURE CHECKOUT</span>

          <h1>Complete your order.</h1>

          <p>
            Enter your details below and complete your
            purchase securely.
          </p>
        </div>

        <form
          className="checkout-form"
          onSubmit={handleOrder}
        >
          <div className="form-section">
            <div className="section-heading">
              <span>01</span>

              <div>
                <h2>Personal details</h2>

                <p>
                  Where should we send your order
                  confirmation?
                </p>
              </div>
            </div>

            <div className="form-grid">
              <div className="field full">
                <label>Full name</label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />

                {errors.name && (
                  <small>{errors.name}</small>
                )}
              </div>

              <div className="field">
                <label>Phone number</label>

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+92 300 0000000"
                  autoComplete="tel"
                />

                {errors.phone && (
                  <small>{errors.phone}</small>
                )}
              </div>

              <div className="field">
                <label>Email address</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                />

                {errors.email && (
                  <small>{errors.email}</small>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-heading">
              <span>02</span>

              <div>
                <h2>Payment details</h2>

                <p>
                  Choose your card and enter its details.
                </p>
              </div>
            </div>

            <div className="payment-select-wrap">
              <label>Payment method</label>

              <div className="select-box">
                <svg viewBox="0 0 24 24">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                  />

                  <path d="M3 10h18" />
                </svg>

                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                >
                  <option value="visa">Visa</option>
                  <option value="mastercard">
                    Mastercard
                  </option>
                  <option value="amex">
                    American Express
                  </option>
                </select>

                <svg
                  className="select-arrow"
                  viewBox="0 0 24 24"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            <div
              className={`dummy-card ${paymentMethod}`}
            >
              <div className="dummy-card-top">
                <span>FURCARE</span>

                <strong>{getCardBrand()}</strong>
              </div>

              <div className="chip">
                <span />
                <span />
                <span />
              </div>

              <div className="dummy-card-number">
                {getCardNumber()}
              </div>

              <div className="dummy-card-bottom">
                <div>
                  <small>CARD HOLDER</small>

                  <strong>
                    {form.cardName || "YOUR NAME"}
                  </strong>
                </div>

                <div>
                  <small>VALID THRU</small>

                  <strong>
                    {form.expiry || "MM/YY"}
                  </strong>
                </div>
              </div>
            </div>

            <div className="form-grid card-fields">
              <div className="field full">
                <label>Card holder name</label>

                <input
                  name="cardName"
                  value={form.cardName}
                  onChange={handleChange}
                  placeholder="Name on card"
                  autoComplete="cc-name"
                />

                {errors.cardName && (
                  <small>{errors.cardName}</small>
                )}
              </div>

              <div className="field full">
                <label>Card number</label>

                <input
                  name="cardNumber"
                  inputMode="numeric"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000"
                  autoComplete="cc-number"
                />

                {errors.cardNumber && (
                  <small>{errors.cardNumber}</small>
                )}
              </div>

              <div className="field">
                <label>Expiry date</label>

                <input
                  name="expiry"
                  inputMode="numeric"
                  value={form.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                />

                {errors.expiry && (
                  <small>{errors.expiry}</small>
                )}
              </div>

              <div className="field">
                <label>CVV</label>

                <input
                  name="cvv"
                  type="password"
                  inputMode="numeric"
                  value={form.cvv}
                  onChange={handleChange}
                  placeholder="•••"
                  autoComplete="cc-csc"
                />

                {errors.cvv && (
                  <small>{errors.cvv}</small>
                )}
              </div>
            </div>
          </div>

          {errors.items && (
            <div className="submit-error">
              {errors.items}
            </div>
          )}

          {errors.submit && (
            <div className="submit-error">
              {errors.submit}
            </div>
          )}

          <button
            className="order-button"
            type="submit"
            disabled={loading}
          >
            <span>
              {loading ? "Processing..." : "Order Now"}
            </span>

            {!loading && (
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </button>
        </form>
      </section>

      <aside className="checkout-image-panel">
        <img
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=90"
          alt="Happy dog"
        />

        <div className="image-overlay" />

        <div className="image-content">
          <span>FURCARE / 2026</span>

          <h2>
            Everything
            <br />
            they need.
          </h2>

          <div className="image-bottom">
            <p>Selected products</p>

            <strong>
              {items.length.toString().padStart(2, "0")}
            </strong>
          </div>
        </div>
      </aside>

      <aside className="order-summary">
        <div className="summary-header">
          <div>
            <span>YOUR ORDER</span>

            <h2>Selected items</h2>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Close summary"
          >
            <svg viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="summary-items">
          {items.length === 0 ? (
            <div className="empty-summary">
              <span>No products selected.</span>
            </div>
          ) : (
            items.map((item, index) => {
              const quantity = getQuantity(item);
              const price = getPrice(item);

              return (
                <div
                  className="summary-item"
                  key={item.id || index}
                >
                  <div className="summary-image">
                    {getImage(item) ? (
                      <img
                        src={getImage(item)}
                        alt={getName(item)}
                      />
                    ) : (
                      <div className="no-image">
                        FC
                      </div>
                    )}
                  </div>

                  <div className="summary-info">
                    <h3>{getName(item)}</h3>

                    <span>Qty {quantity}</span>
                  </div>

                  <strong>
                    Rs.{" "}
                    {(
                      price * quantity
                    ).toLocaleString()}
                  </strong>
                </div>
              );
            })
          )}
        </div>

        <div className="summary-total">
          <span>Total</span>

          <strong>
            Rs. {total.toLocaleString()}
          </strong>
        </div>
      </aside>

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-popup">
            <button
              className="success-close"
              onClick={closeSuccess}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <div className="success-icon">
              <svg viewBox="0 0 24 24">
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

            <span className="success-label">
              ORDER CONFIRMED
            </span>

            <h2>
              Thank you,{" "}
              {form.name.split(" ")[0]}.
            </h2>

            <p>
              Your order confirmation has been sent
              to <strong>{form.email}</strong>.
            </p>

            <p>
              You can show this confirmation at
              FurCare in Karachi to collect your
              selected products.
            </p>

            <div className="success-order">
              <span>Order number</span>

              <strong>#{orderNumber}</strong>
            </div>

            <button
              className="success-button"
              onClick={closeSuccess}
            >
              Continue

              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Checkout;