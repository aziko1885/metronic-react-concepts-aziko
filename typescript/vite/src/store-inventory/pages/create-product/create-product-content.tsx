import { useState } from 'react';
import { CreateProductSheet } from '../components/create-product-sheet';
import { ProductListTable } from '../tables/product-list';

export function CreateProductContent() {
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  
  return (
    <>
      <ProductListTable 
        onRowClick={() => setIsSheetOpen(true)} 
      />
      <CreateProductSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </>
  );
}
