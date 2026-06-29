import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { productMatchesSearch } from "../../utils/productSearch";

import "./DealsSection.css";

const DealsSection = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const filteredProducts = products.filter((product) =>
    productMatchesSearch(product, searchTerm)
  );

  useEffect(() => {
    fetch(
      "https://dummyjson.com/products?limit=8"
    )
      .then((res) => res.json())
      .then((data) =>
        setProducts(data.products)
      );
  }, []);

  return (
    <div className="container mt-4">

      <div className="deals-card">

        <div className="deals-header">

          <h3>
            🔥 Deals Of The Day
          </h3>

          {/* <button className="view-all-btn">
            View All
          </button> */}

        </div>

        <div className="deals-products">

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

export default DealsSection;
