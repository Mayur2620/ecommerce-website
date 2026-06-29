import { Carousel } from "react-bootstrap";
import "./HeroSlider.css";

const HeroSlider = () => {
  const banners = [
    {
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600",
      title: "Mega Electronics Sale",
      subtitle: "Up To 70% OFF",
    },
    {
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
      title: "Fashion Festival",
      subtitle: "Trending Styles For Everyone",
    },
    {
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600",
      title: "Flash Sale",
      subtitle: "Limited Time Deals",
    },
  ];

  return (
    <Carousel fade interval={3000}>
      {banners.map((banner, index) => (
        <Carousel.Item key={index}>
          <div
            className="hero-slide"
            style={{
              backgroundImage: `url(${banner.image})`,
            }}
          >
            <div className="hero-overlay">
              <h1>{banner.title}</h1>
              <p>{banner.subtitle}</p>

             <button className="btn btn-warning hero-btn">
  Shop Now →
</button>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroSlider;