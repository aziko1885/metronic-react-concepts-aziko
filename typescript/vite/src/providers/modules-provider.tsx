import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ScreenLoader } from '@/components/screen-loader';
const LazyCrmModule = lazy(() => import('@/crm'));
const LazyStoreInventoryModule = lazy(() => import('@/store-inventory'));

export function ModulesProvider() {
  const location = useLocation();
  const path = location.pathname;

  // Detect if current path is for CRM or Store
  const isCrm = path.startsWith('/crm');
  const isStoreInventory = path.startsWith('/store-inventory');

  if (isCrm) {
    return (
      <Routes>
        <Route
          path="/crm/*"
          element={
            <Suspense fallback={<ScreenLoader/>}>
              <LazyCrmModule />
            </Suspense>
          }
        />
      </Routes>
    );
  } else if (isStoreInventory) {
    return (
      <Routes>
        <Route
          path="/store-inventory/*"
          element={
            <Suspense fallback={<ScreenLoader/>}>
              <LazyStoreInventoryModule />
            </Suspense>
          }
        />
      </Routes>
    );
  }
}

