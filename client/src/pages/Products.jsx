import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  const [searchParams] = useSearchParams();

  const categories = [
    "All",
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
  ];

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products`);
        const data = await res.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Search + Category filter (IMPORTANT)
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All";

    let filtered = products;

    if (category !== "All") {
      filtered = filtered.filter(
        (product) => product.category === category
      );
    }

    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchParams, products]);

  const handleClick = (category, index) => {
    setActive(index);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  // ❗ RETURNS ALWAYS AT END
  if (loading) return <Loader />;
  if (products.length === 0) return <p>Please connect to the internet.</p>;

  return (
    <section className="min-h-screen w-full">
      <div className="container p-5 mx-auto">

        {/* Category Buttons */}
        <div className="flex gap-5 items-center overflow-x-scroll mb-10">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`border px-4 py-1 rounded-lg min-w-fit ${
                index === active ? 'bg-green-500 text-white' : ''
              }`}
              onClick={() => handleClick(cat, index)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="flex flex-wrap -m-4">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Products;
