import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { productMatchesSearch } from "../../utils/productSearch";

import "./FashionSection.css";

const FashionSection = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const filteredProducts = products.filter((product) =>
    productMatchesSearch(product, searchTerm)
  );

  useEffect(() => {
    fetch(
      "https://dummyjson.com/products/category/mens-shirts"
    )
      .then((res) => res.json())
      .then((data) =>
        setProducts(data.products)
      );
  }, []);

  return (
    <div className="container mt-4">

      <div className="fashion-card">

        <div className="fashion-header">

          <h3>
            👕 Fashion Top Deals
          </h3>

          {/* <button>
            View All
          </button> */}

        </div>

        <div className="fashion-grid">

          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                detailsPath="/home-product"
              />
            ))
          ) : (
            <p className="home-empty-message">No products found here.</p>
          )}

        </div>

      </div>

    </div>
  );
};

export default FashionSection;
