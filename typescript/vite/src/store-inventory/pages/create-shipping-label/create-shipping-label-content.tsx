import { useState } from 'react';
import { CreateShippingLabelSheet } from '../components/create-shipping-label-sheet';
import { ProductListTable } from '../tables/product-list';

export function CreateShippingLabelContent() {
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  
  return (
    <>
      <ProductListTable 
        onRowClick={() => setIsSheetOpen(true)} 
      />
      <CreateShippingLabelSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </>
  );
}
