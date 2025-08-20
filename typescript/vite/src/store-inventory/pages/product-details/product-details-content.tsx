import { useState } from 'react';
import { ProductDetailsAnalyticsSheet } from '../components/product-details-analytics-sheet';
import { ProductListTable } from '../tables/product-list';

export function ProductDetailsContent() {
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  
  return (
    <>
      <ProductListTable 
        onRowClick={() => setIsSheetOpen(true)} 
      />
      <ProductDetailsAnalyticsSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </>
  );
}
