import { Navigate, Routes, Route } from 'react-router-dom';

import { DefaultLayout } from './layout';
import { Dashboard } from './pages/dashboard/page';
import { AllStock } from './pages/all-stock/page';
import { CurrentStock } from './pages/current-stock/page';
import { InboundStock } from './pages/inbound-stock/page';
import { OutboundStock } from './pages/outbound-stock/page';
import { StockPlanner } from './pages/stock-planner/page';
import ProductList from './pages/product-list/page';
import { ProductDetailsPage } from './pages/product-details';
import { CreateProductPage } from './pages/create-product'; 
import { PerProductStockPage } from './pages/per-product-stock';
import { TrackShippingPage } from './pages/track-shipping';
import { CreateShippingLabelPage } from './pages/create-shipping-label';

export default function StoreInventoryModule() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dark-sidebar" element={<Dashboard />} />
        <Route path="all-stock" element={<AllStock />} />
        <Route path="current-stock" element={<CurrentStock />} />
        <Route path="inbound-stock" element={<InboundStock />} />
        <Route path="outbound-stock" element={<OutboundStock />} />
        <Route path="stock-planner" element={<StockPlanner />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="product-details" element={<ProductDetailsPage />} />
        <Route path="create-product" element={<CreateProductPage />} /> 
        <Route path="per-product-stock" element={<PerProductStockPage />} /> 
        <Route path="track-shipping" element={<TrackShippingPage />} /> 
        <Route path="create-shipping-label" element={<CreateShippingLabelPage />} /> 
      </Route>
    </Routes>
  );
}
