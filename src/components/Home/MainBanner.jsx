import "./MainBanner.css";

const MainBanner = () => {
  return (
    <div className="container mt-3">

      <div className="main-banner">

        <div className="banner-content">

          <span className="offer-badge">
            LIMITED TIME OFFER
          </span>

          <h1>
            Mega Electronics Sale
          </h1>

          <p>
            Up To 70% OFF On
            Smartphones, Laptops,
            Headphones & More
          </p>

          <button className="shop-btn">
            Shop Now →
          </button>

        </div>

        <div className="banner-image">

         <img
  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
  alt="iPhone"
/>

        </div>

      </div>

    </div>
  );
};

export default MainBanner;