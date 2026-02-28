import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);

    // Fetch products with keyword (backend handles "no match → all products")
    fetch("http://localhost:8000/api/v1/products?" + searchParams.toString())
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, [searchParams]); // 🔴 runs whenever search params change

  return (
    <Fragment>
      <h1 id="products_heading">Latest Products</h1>

      <section className="container mt-5">
        {loading && <h2>Loading products...</h2>}
        {error && <h2 style={{ color: "red" }}>{error}</h2>}

        {!loading && !error && products.length === 0 && (
          <h2>No products available</h2>
        )}

        <div className="row">
          {!loading &&
            !error &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </section>
    </Fragment>
  );
}
