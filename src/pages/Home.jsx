import { Link } from "react-router-dom";

import HeroSlider from "../components/Home/HeroSlider";
import MainBanner from "../components/Home/MainBanner";
import DealsSection from "../components/Home/DealsSection";
import ElectronicsSection from "../components/Home/ElectronicsSection";
import FashionSection from "../components/Home/FashionSection";
import TrendingSection from "../components/Home/TrendingSection";

import "./Home.css";

const Home = ({ searchTerm }) => {
return (
<>

  {/* Premium Hero Section */}

  <div className="hero-section">

    <div className="container">

      <div className="row align-items-center">

        <div className="col-lg-6">

          <span className="hero-badge">
            🔥 Biggest Sale Of The Year
          </span>

          <h1>
            Shop Smarter,
            Live Better.
          </h1>

          <p>
            Discover the latest fashion,
            electronics, gadgets and
            trending products at
            unbeatable prices.
          </p>

          <Link
            to="/shop"
            className="btn hero-btn"
          >
            Shop Now →
          </Link>

        </div>

        <div className="col-lg-6 text-center">

          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200"
            alt="Shopping"
            className="hero-image"
          />

        </div>

      </div>

    </div>

  </div>

  {/* Why Shop With Us */}

  <div className="container py-5 why-shop">

    <h2 className="text-center">
      Why Shop With Us?
    </h2>

    <div className="row">

      <div className="col-md-4 mb-4">

        <div className="feature-card">

          <div className="feature-icon">
            🚚
          </div>

          <h4>
            Fast Delivery
          </h4>

          <p>
            Get your products delivered
            quickly and safely.
          </p>

        </div>

      </div>

      <div className="col-md-4 mb-4">

        <div className="feature-card">

          <div className="feature-icon">
            💳
          </div>

          <h4>
            Pay On Delivery
          </h4>

          <p>
            Shop confidently and pay
            only when your order arrives.
          </p>

        </div>

      </div>

      <div className="col-md-4 mb-4">

        <div className="feature-card">

          <div className="feature-icon">
            ⭐
          </div>

          <h4>
            Premium Quality
          </h4>

          <p>
            Carefully selected quality
            products at great prices.
          </p>

        </div>

      </div>

    </div>

  </div>

  <HeroSlider />


  <MainBanner />

  <DealsSection searchTerm={searchTerm} />

  <ElectronicsSection searchTerm={searchTerm} />

  <FashionSection searchTerm={searchTerm} />

  <TrendingSection searchTerm={searchTerm} />

</>


);
};

export default Home;
