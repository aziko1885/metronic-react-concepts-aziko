import { Inventory } from '../components/total-sheet'; 
import { AllStockTable } from '../tables/all-stock';

export function AllStock() {
  return (
    <div className="grid gap-5 lg:gap-7.5 p-5 lg:p-7.5">
      <Inventory /> 
      <AllStockTable /> 
    </div>
  );
}
