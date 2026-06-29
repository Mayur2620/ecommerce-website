import { Link, useParams } from "react-router-dom";

import "./ServicePage.css";

const serviceContent = {
  "help-center": {
    title: "Help Center",
    intro:
      "Find quick answers about orders, payments, delivery, and account support.",
    items: [
      "Track your orders from the Orders page after checkout.",
      "Use Wishlist to save products you want to buy later.",
      "For payment or account issues, contact support@shopeasy.com.",
    ],
  },
  returns: {
    title: "Returns",
    intro:
      "Return eligible products within 7 days of delivery if they are unused and in original packaging.",
    items: [
      "Keep the invoice and product tags with the item.",
      "Refunds are processed after the returned product is inspected.",
      "Damaged or wrong products should be reported within 24 hours.",
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    intro:
      "ShopEasy uses your information only to improve your shopping experience and manage your orders.",
    items: [
      "We store account details locally for this demo website.",
      "We do not sell your personal information.",
      "You can log out anytime from the profile menu.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro:
      "By using ShopEasy, you agree to shop responsibly and provide accurate order information.",
    items: [
      "Product prices and availability may change without notice.",
      "Orders can be cancelled if payment or address details are invalid.",
      "Website content and branding belong to ShopEasy.",
    ],
  },
};

const ServicePage = () => {
  const { serviceId } = useParams();
  const content = serviceContent[serviceId] || serviceContent["help-center"];

  return (
    <main className="service-page">
      <div className="container">
        <div className="service-panel">
          <span className="service-label">Customer Service</span>

          <h1>{content.title}</h1>

          <p>{content.intro}</p>

          <ul>
            {content.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Link to="/shop" className="btn btn-primary fw-bold">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ServicePage;
