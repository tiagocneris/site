import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/chat/WhatsAppButton';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import OngsPage from './pages/OngsPage';
import SosPage from './pages/SosPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import UserProfilePage from './pages/UserProfilePage';
import SettingsPage from './pages/SettingsPage';
import DetailsPage from './pages/DetailsPage';
import MerchantProfilePage from './pages/MerchantProfilePage';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import PreviewPage from './pages/PreviewPage';
import PlansPage from './pages/PlansPage';
import DeliveryRegistrationPage from './pages/DeliveryRegistrationPage';
import AdoptionFairPage from './pages/AdoptionFairPage';
import OngRegistrationPage from './pages/OngRegistrationPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import InvestorPage from './pages/InvestorPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/ongs" element={<OngsPage />} />
              <Route path="/sos" element={<SosPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/order-tracking" element={<OrderTrackingPage />} />
              <Route path="/order-history" element={
                <ProtectedRoute>
                  <OrderHistoryPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              <Route path="/details/:id" element={<DetailsPage />} />
              <Route path="/merchant/*" element={
                <ProtectedRoute roles={['ADMIN', 'ONG']}>
                  <MerchantProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/merchant/register" element={
                <ProtectedRoute roles={['ADMIN', 'ONG']}>
                  <ProductRegistrationPage />
                </ProtectedRoute>
              } />
              <Route path="/preview" element={<PreviewPage />} />
              <Route path="/plans" element={<PlansPage />} />
              <Route path="/delivery/register" element={<DeliveryRegistrationPage />} />
              <Route path="/adoption-fair" element={<AdoptionFairPage />} />
              <Route path="/ong/register" element={<OngRegistrationPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfUsePage />} />
              <Route path="/investor" element={<InvestorPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </AuthProvider>
  );
}