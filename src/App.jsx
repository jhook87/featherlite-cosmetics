import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductDetailPage from './pages/ProductDetailPage';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const HomePage = React.lazy(() => import('./pages/HomePage'));
const ShopPage = React.lazy(() => import('./pages/ShopPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

// Optional: Error Boundary for lazy-loaded components
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h2>Something went wrong while loading the page.</h2>;
        }
        return this.props.children;
    }
}

const App = () => {
    return (
        <Router>
            <Header />
            <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </Router>
    );
};

export default App;