import { Routes, Route, Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import HomePage from "./Pages/home/HomePage";
import CheckoutPage from "./Pages/checkout/CheckoutPage";
import OrdersPage from "./Pages/orders/OrdersPage";
import TrackingPage from "./Pages/Tracking/TrackingPage";
import { NotFoundPage } from "./Pages/notfound/NotFoundPage";
import LoginPage from "./Pages/auth/LoginPage";
import SignupPage from "./Pages/auth/SignupPage";
import ProfilePage from "./Pages/profile/ProfilePage";
import './App.css';

window.axios = axios;

const AppLoader = () => (
  <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f9fafb', flexDirection:'column', gap:'16px' }}>
    <div style={{ width:'44px', height:'44px', border:'4px solid #e5e7eb', borderTopColor:'#0a6b3d', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    <p style={{ color:'#6b7280', fontSize:'14px', margin:0 }}>Loading SimpleCart...</p>
  </div>
);

// Redirect logged-in users away from login/signup
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
};

// Guard: requires login, saves current path for redirect after login
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <AppLoader />;
  if (!user) return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  return children;
};

const App = () => {
  const [cart, setCart] = useState([]);
  const { user, loading } = useAuth();

  const loadCart = async () => {
    try {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    } catch {
      setCart([]);
    }
  };

  useEffect(() => { loadCart(); }, [user]);

  if (loading) return <AppLoader />;

  return (
    <Routes>
      {/* Public auth routes */}
      <Route path="/login"  element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

      {/* Open routes */}
      <Route path="/"        element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />

      {/* Protected routes — require login */}
      <Route path="/orders"  element={<ProtectedRoute><OrdersPage cart={cart} loadCart={loadCart} /></ProtectedRoute>} />
      <Route path="/tracking/:orderId/:productId" element={<ProtectedRoute><TrackingPage cart={cart} /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage cart={cart} /></ProtectedRoute>} />

      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  );
};

export default App;
