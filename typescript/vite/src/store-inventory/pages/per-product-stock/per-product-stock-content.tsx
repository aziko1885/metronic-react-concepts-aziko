import { useState } from 'react';
import { PerProductStockSheet } from '../components/per-product-stock-sheet';
import { ProductListTable } from '../tables/product-list';

export function PerProductStockContent() {
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  
  return (
    <>
      <ProductListTable 
        onRowClick={() => setIsSheetOpen(true)} 
      />
      <PerProductStockSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </>
  );
}
