import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import Layout from '@/components/Layout';
    import AdminLayout from '@/components/admin/AdminLayout'; 
    
    import HomePage from '@/pages/user/HomePage';
    import ProductListPage from '@/pages/user/ProductListPage';
    import ProductDetailPage from '@/pages/user/ProductDetailPage';
    import CartPage from '@/pages/user/CartPage';
    import LoginPage from '@/pages/user/LoginPage';
    import ForgotPasswordPage from '@/pages/user/ForgotPasswordPage';
    import ResetPasswordPage from '@/pages/user/ResetPasswordPage';
    import OrderHistoryPage from '@/pages/user/OrderHistoryPage';
    import PlaceholderPage from '@/pages/PlaceholderPage';
    
    import AdminLoginPage from '@/pages/admin/AdminLoginPage';
    import DashboardPage from '@/pages/admin/DashboardPage';
    import AdminProductsPage from '@/pages/admin/AdminProductsPage';
    import AdminOrdersPage from '@/pages/admin/AdminOrdersPage';
    import AdminOffersPage from '@/pages/admin/AdminOffersPage';
    import AdminMediaPage from '@/pages/admin/AdminMediaPage';
    import AdminHomepageEditor from '@/pages/admin/AdminHomepageEditor';


    import { useAppContext } from '@/contexts/AppContext';
    import { useToast } from '@/components/ui/use-toast';

    const ProtectedRoute = ({ children }) => {
      const { currentUser, loading } = useAppContext();
      const { toast } = useToast();

      if (loading) {
        return <div className="flex justify-center items-center h-screen"><p className="text-xl gradient-text">Loading User...</p></div>;
      }

      if (!currentUser) {
        toast({ title: "Access Denied", description: "Please login to access this page.", variant: "destructive" });
        return <Navigate to="/login" replace />;
      }
      return children;
    };

    const AdminRoute = ({ children }) => {
      const { currentUser, currentUserProfile, loading } = useAppContext();
      const { toast } = useToast();

      if (loading) {
       return <div className="flex justify-center items-center h-screen"><p className="text-xl gradient-text">Loading Admin Access...</p></div>;
      }

      if (!currentUser) {
        toast({ title: "Admin Access Denied", description: "Please login as an admin.", variant: "destructive" });
        return <Navigate to="/admin/login" replace />;
      }
      if (currentUserProfile && currentUserProfile.role !== 'admin') {
        toast({ title: "Admin Access Denied", description: "You do not have admin privileges.", variant: "destructive" });
        return <Navigate to="/" replace />;
      }
       if (!currentUserProfile) {
        toast({ title: "Verifying Admin Status", description: "Please wait...", variant: "default" });
        return <Navigate to="/admin/login" replace />; 
      }
      return children;
    };


    function App() {
      const { loading, appInitializationError } = useAppContext();

      if (appInitializationError) {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <h1 className="text-3xl font-bold text-destructive mb-4">Application Error</h1>
            <p className="text-lg text-center text-muted-foreground mb-2">We encountered an issue initializing the application.</p>
            <p className="text-sm text-center text-destructive-foreground bg-destructive p-2 rounded-md">{appInitializationError}</p>
            <p className="mt-4 text-sm text-muted-foreground">Please try refreshing the page. If the problem persists, contact support.</p>
          </div>
        );
      }
      
      if (loading) {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <svg className="animate-spin h-16 w-16 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-2xl font-semibold gradient-text">Loading Glassyfy...</p>
          </div>
        );
      }

      return (
        <Router>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductListPage />} />
              <Route path="products/:productId" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
              <Route path="blog" element={<PlaceholderPage title="Glassyfy Blog" />} />
              <Route path="about" element={<PlaceholderPage title="About Glassyfy" />} />
              <Route path="contact" element={<PlaceholderPage title="Contact Us" />} />
              <Route path="faq" element={<PlaceholderPage title="Frequently Asked Questions" />} />
              <Route path="profile" element={<ProtectedRoute><PlaceholderPage title="User Profile" /></ProtectedRoute>} />
              <Route path="orders" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
              <Route path="offers" element={<PlaceholderPage title="Special Offers" />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="offers" element={<AdminOffersPage />} />
              <Route path="media" element={<AdminMediaPage />} />
              <Route path="homepage-editor" element={<AdminHomepageEditor />} />
              <Route path="users" element={<PlaceholderPage title="Manage Users (Admin)" />} />
              <Route path="settings" element={<PlaceholderPage title="Site Settings (Admin)" />} />
            </Route>
            
            <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
          </Routes>
        </Router>
      );
    }

    export default App;