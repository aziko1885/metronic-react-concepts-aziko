import { useState } from 'react';
import { ManageVariantsSheet } from '../components/manage-variants';
import { ProductListTable } from '../tables/product-list';

export function ManageVariantsContent() {
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  
  return (
    <>
      <ProductListTable 
        onRowClick={() => setIsSheetOpen(true)} 
      />
      <ManageVariantsSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />  
    </>
  );
}
