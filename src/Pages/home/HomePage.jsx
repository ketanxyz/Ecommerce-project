import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Header from "../../components/navbar/Header";
import ProductsGrid from "./ProductsGrid";
import "./HomePage.css";
import FooterSection from "../../components/footer/FooterSection";

const HomePage = ({ cart, loadCart }) => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };

    getHomeData();
  }, [search]);

  return (
    <>
      <title>SimpleCart-Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>

      <FooterSection />
    </>
  );
};

export default HomePage;
