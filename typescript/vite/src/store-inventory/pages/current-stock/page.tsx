import { CurrentStockTable } from '../tables/current-stock';

export function CurrentStock() {
  return (
    <div className="grid lg:gap-7.5 p-5 lg:p-7.5">
      <CurrentStockTable /> 
    </div>
  );
}
