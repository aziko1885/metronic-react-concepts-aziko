import { InboundStockTable } from '../tables/inbound-stock';

export function InboundStock() {
  return (
    <div className="grid gap-5 lg:gap-7.5 p-5 lg:p-7.5">
      <InboundStockTable /> 
    </div>
  );
}
