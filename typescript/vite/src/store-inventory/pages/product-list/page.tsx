import { ProductListTable } from '../tables/product-list';

export default function ProductList() {
  return (
    <div className="grid gap-5 lg:gap-7.5 p-5 lg:p-7.5">
      <ProductListTable />
    </div>
  );
}
