import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { productMatchesSearch } from "../../utils/productSearch";

import "./ElectronicsSection.css";

const ElectronicsSection = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const filteredProducts = products.filter((product) =>
    productMatchesSearch(product, searchTerm)
  );

  useEffect(() => {
    fetch(
      "https://dummyjson.com/products/category/smartphones"
    )
      .then((res) => res.json())
      .then((data) =>
        setProducts(data.products)
      );
  }, []);

  return (
    <div className="container mt-4">

      <div className="electronics-card">

        <div className="electronics-header">

          <h3>
            ⚡ Best Of Electronics
          </h3>

          {/* <button>
            View All
          </button> */}

        </div>

        <div className="electronics-grid">

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

export default ElectronicsSection;
